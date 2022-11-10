const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const seriesSchema = new Schema({
    name: {
        type: String,
        require: true,
        max: 50,
    },
    id: {
        type: String,
        require: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    categoryId: {
        type: String,
        require: true,
    },
    categoryIdName: {
        type: String,
        require: true,
    }
    ,
    createdAt: {
        type: Date,
    },
});

module.exports = mongoose.model('Series', seriesSchema);
