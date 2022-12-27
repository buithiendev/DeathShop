const Order = require('../model/orderModal');
const DeliveryInformation = require('../model/deliveryInformationModal');
const Customer = require('../model/customerModal');

module.exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id)
            .populate('idInfoReceived')
            .populate('anothorInfo');

        return res.send(order);
    } catch {
        return res.status(404).send({
            status: 'failed',
        });
    }
};

module.exports.getAll = async (req, res, next) => {
    try {
        const response = await Order.find()
            .populate('idInfoReceived')
            .populate('anothorInfo');

        return res.send(response);
    } catch (ex) {
        next(ex);
    }
};

module.exports.updateImei = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { imei, productId } = req.body;

        const response = await Order.updateOne(
            { _id: id, 'products._id': productId },
            {
                $set: {
                    'products.$.imei': imei,
                },
            },
            { new: true },
        );

        let order = null;
        if (response.modifiedCount) {
            order = await Order.findById(id)
                .populate('idInfoReceived')
                .populate('anothorInfo');
        }

        return res.send(order);
    } catch (ex) {
        next(ex);
    }
};

module.exports.updateStatus = async (req, res, next) => {
    try {
        const id = req.params.id;

        const response = await Order.findByIdAndUpdate(
            id,
            {
                status: req.body.status,
            },
            { new: true },
        )
            .populate('idInfoReceived')
            .populate('anothorInfo');

        return res.send(response);
    } catch (ex) {
        next(ex);
    }
};

module.exports.updateStatusPayment = async (req, res, next) => {
    try {
        const id = req.params.id;

        const response = await Order.findByIdAndUpdate(
            id,
            {
                status: req.body.statusPayment,
            },
            { new: true },
        )
            .populate('idInfoReceived')
            .populate('anothorInfo');

        return res.send(response);
    } catch (ex) {
        next(ex);
    }
};

module.exports.add = async (req, res, next) => {
    try {
        const {
            fullInfo,
            name,
            phone,
            email,
            deliveryForm,
            storeAddress,
            province,
            district,
            specificAddress,
            paymentMethod,
            listProduct,
            orderAccount,
        } = req.body;

        let deliveryInformation = null;
        if (name) {
            deliveryInformation = await DeliveryInformation.create({
                name,
                email,
                phone,
                address: specificAddress,
            });
        }

        if (deliveryInformation && orderAccount) {
            await Customer.findOneAndUpdate(
                { _id: orderAccount },
                {
                    $push: {
                        deliveryInformation: deliveryInformation._id,
                    },
                },
                { new: true },
            );
        }

        const TotalAmountOrdered = listProduct?.reduce((total, curr) => {
            return total + curr?.colorSelect?.priceColor * 1;
        }, 0);

        const response = await Order.create({
            paymentMethod,
            orderAccount,
            products: listProduct,
            idInfoReceived: fullInfo !== 'NewInfo' ? fullInfo : null,
            anothorInfo: deliveryInformation?._id,
            TotalAmountOrdered,
        });

        const order = await Order.findById(response._id)
            .populate('idInfoReceived')
            .populate('anothorInfo')
            .lean();

        return res.send(order);
    } catch (ex) {
        next(ex);
    }
};

module.exports.remove = async (req, res) => {
    try {
        const id = req.params.id;
        isDelete = await Banner.findByIdAndDelete(id);

        return res.send(isDelete);
    } catch {
        return res.status(404).send({
            status: 'failed',
        });
    }
};
