const Categories = require('../model/categoriesModal');
const image = require('../model/imageModal');
const multer = require('multer');
const fs = require("fs");

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: Storage,
}).array('testImage', 10);

module.exports.add = async (req, res, next) => {
    upload(req,res, async (err) => {
        if(err) {
            console.log(err);
        } else {
            const {name, description} = req.body;
            const nameCheck = await Categories.findOne({name})

            if(nameCheck) return res.json({ message: 'Has a product type', status: false });

            const createdAt = new Date();

            const category = await Categories.create({
                name,
                createdAt: createdAt,
                description
            })

            req.files.map(async (file,index) => {
                try {
                    const res = await image.create({
                        idRef: category._id,
                        image: {
                            data: fs.readFileSync("uploads/" + file.filename),
                            // data: file.filename,
                            contentType: 'image/png',
                        }
                    })
                } catch (ex) {
                    return res.status(401).send({
                        status: 'failed',
                    });
                }
            })
            res.send(category);
        }
    })
};


module.exports.getAll = async (req, res) => {
    try {
        const categories = await Categories.find({});
        res.send(categories);
    } catch (ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.update = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name, description } = req.body;

        const updateDate = new Date();

        const category = await Categories.findByIdAndUpdate(categoryId, {
            name,
            description,
            $push: { updateDates: updateDate },
        },{new: true});

        res.send({
            status: true,
            category,
        });
    } catch (ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
};

module.exports.getById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Categories.findById(categoryId).select(['_id', 'name', 'description', 'createdAt']);
        res.send(category);
    } catch (ex) {
        return res.status(401).send({
            status: 'failed',
        });
    }
};
