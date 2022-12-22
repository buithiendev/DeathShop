const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type: String,
        require: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Categories'
    },
    sticker: {
        type: String,
    },
    categoryIdName: {
        type: String,
        require: true,
    },
    seriesId: {
        type: Schema.Types.ObjectId,
        ref: 'Series'
    },
    seriesIdName: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
        max: 50,
    },
    oldPrice: {
        type: Number,
        default: 0,
    },
    newPrice: {
        type: Number,
        default: 0,
    },
    rams: String,
    memorys: String,
    colors: [Object],
    linksImage: [String],
    description: {
        type: String,
        default: '',
    },
    promotionInfo: {
        type: String,
        default: '',
    },
    specifications: {
        type: String,
        default: '',
    },
    detailsProduct: {
        type: String,
        default: '',
    },
    status: {
        type: Boolean,
        default: true,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
    },
    updateDates: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model('Product', productSchema);
