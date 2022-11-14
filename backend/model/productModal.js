const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type: String,
        require: true,
    },
    categoryId: {
        type: String,
        require: true,
    },
    categoryIdName: {
        type: String,
        require: true,
    },
    seriesId: {
        type: String,
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
    variants: { type: Schema.Types.ObjectId, ref: 'VariantsProduct' },
    createdAt: {
        type: Date,
    },
    updateDates: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model('Product', productSchema);
