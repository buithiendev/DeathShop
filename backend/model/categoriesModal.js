const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name: {
        type: String,
        require: true,
        max: 50,
    },
    description: {
        type: String,
        default: '',
    },
    linksImage: [String]
    ,
    createdAt: {
        type: Date,
    },
    updateDates: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model('Categories', categoriesSchema);
