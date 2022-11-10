const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name: {
        type: String,
        require: true,
        max: 50,
    },
    id: {
        type: String,
        require: true,
    }
    ,
    description: {
        type: String,
        default: '',
    },
    status: {
        type: Boolean,
        default: true,
    }
    ,
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
