const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    link: {
        type: String,
        default: '',
    },
    linkImage: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Banner', bannerSchema);
