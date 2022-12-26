const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deliveryInformationSchema = new Schema({
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
});

module.exports = mongoose.model('DeliveryInformation', deliveryInformationSchema);
