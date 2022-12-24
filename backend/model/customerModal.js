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
            name: {
                type: String,
                default: '',
            },
            phone: {
                type: String,
                default: '',
            },
            email: {
                type: String,
                default: '',
            },
            address: {
                type: String,
                default: '',
            },
        },
    ],
});

module.exports = mongoose.model('Customer', customerSchema);
