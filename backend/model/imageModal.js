const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    idRef: {
        type: String,
        require: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
});

module.exports = mongoose.model('Image', imageSchema);
