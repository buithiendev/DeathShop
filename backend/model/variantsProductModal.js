const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const variantsProduct = new Schema({
    idProduct: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true,
        unique: true,
    },
    variants: {
        type: Array,
    },
    createUpdate: {
        type: Array,
    },
    createdAt: {
        type: Date,
    },
});

module.exports = mongoose.model('VariantsProduct', variantsProduct);
