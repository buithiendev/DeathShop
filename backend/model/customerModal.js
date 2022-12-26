const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    fullName: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        default: 'Male',
    },
    dateOfBirth: {
        type: Object,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    deliveryInformation: [
        {
            type: Schema.Types.ObjectId,
            ref: 'DeliveryInformation',
        },
    ],
    cart: [
        {
            colorSelect: String,
            productSelected: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        },
    ],
    invoice: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        },
    ]
});

module.exports = mongoose.model('Customer', customerSchema);
