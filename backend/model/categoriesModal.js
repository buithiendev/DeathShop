const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name: {
        type: String,
        require: true,
        max: 50,
    },
    createdAt: {
        type: Date,
    },
    updateDates: {
        type: Array,
        default: [],
    },
    description: {
        type: String,
        default: '',
    },
});

module.exports = mongoose.model('Categories', categoriesSchema);
