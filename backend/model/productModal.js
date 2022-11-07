const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    categoryId: {
        type: String,
        require: true,
    },
    seriesId: {
        type: String,
    },
    name: {
        type: String,
        require: true,
        max: 50,
    },
    basicPrice: {
        type: Number,
        default: 0,
    },
    rams: [String],
    memorys: [String],
    colors: [String],
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
    variants: [],
    createdAt: {
        type: Date,
    },
    updateDates: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model('Product', productSchema);
