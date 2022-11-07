var admin = require('firebase-admin');

var serviceAccount = require('../config/firebase-key.json');

const BUCKET = 'deathshop-15e27.appspot.com';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {
    if (req.files) {
        if (req.files.length === 0) {
            next();
        }
        req.files.map(async (value, index) => {
            if (!value) return next();
            const image = value;
            const name = Date.now() + '.' + image.originalname.split('.').pop();
            req.files[index].filebaseUrl = `https://storage.googleapis.com/${BUCKET}/${name}`;
            const file = bucket.file(name);

            const stream = file.createWriteStream({
                metadata: {
                    contentType: image.minetype,
                },
            });

            stream.on('error', (e) => {
                console.error(e);
            });

            stream.on('finish', async () => {
                await file.makePublic();
                req.files[index].filebaseUrl = `https://storage.googleapis.com/${BUCKET}/${name}`;
                next();
            });

            stream.end(image.buffer);
        });
    } else {
        console.log('xx');
        next();
    }
};

module.exports = uploadImage;
