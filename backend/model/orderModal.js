const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderDate: {
        type: Date,
        default: new Date(),
    },
    status: {
        type: String,
        enum: [
            'Pending',
            'Payment Confirmed',
            'Order has been cancelled',
            'Order sent',
            'Customer has received',
        ],
        default: 'Pending',
    },
    idInfoReceived: {
        type: Schema.Types.ObjectId,
        ref: 'DeliveryInformation',
    },
    anothorInfo: {
        type: Schema.Types.ObjectId,
        ref: 'DeliveryInformation',
    },
    products: [{ type: Object }],
    TotalAmountOrdered: {
        type: Number,
        default: 0,
    },
    statusPayment: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending',
    },
    paymentMethod: {
        type: String,
        enum: ['momo', 'onepay', 'transfer', 'cashondelivery'],
        default: 'transfer',
    },
    sentDate: {
        type: Date,
        default: null,
    },
    receivedDate: {
        type: Date,
        default: null,
    },
    orderAccount: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
    storeAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Store',
    },
    dateModify: {
        type: Date,
        default: new Date(),
    }
});

module.exports = mongoose.model('Order', orderSchema);
