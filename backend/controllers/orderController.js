const Order = require('../model/orderModal');
const DeliveryInformation = require('../model/deliveryInformationModal');
const Customer = require('../model/customerModal');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const nodemailer = require('nodemailer');

module.exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findById(id)
            .populate('storeAddress')
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
            .populate('storeAddress')
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
                .populate('storeAddress')
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
            .populate('storeAddress')
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
                statusPayment: req.body.statusPayment,
            },
            { new: true },
        )
            .populate('storeAddress')
            .populate('idInfoReceived')
            .populate('anothorInfo');

        return res.send(response);
    } catch (ex) {
        next(ex);
    }
};

module.exports.updateAllStatus = async (req, res, next) => {
    try {
        const id = req.params.id;

        const response = await Order.findByIdAndUpdate(
            id,
            {
                statusPayment: req.body.statusPayment,
                status: req.body.status,
            },
            { new: true },
        )
            .populate('idInfoReceived')
            .populate('storeAddress')
            .populate('anothorInfo');

        return res.send(response);
    } catch (ex) {
        next(ex);
    }
};

module.exports.getOrderByOrderAccout = async (req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);

        const response = await Order.find({
            orderAccount: id,
        });

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
            deliveryMethod: deliveryForm,
            storeAddress: storeAddress,
        });

        const order = await Order.findById(response._id)
            .populate('idInfoReceived')
            .populate('anothorInfo')
            .populate('storeAddress')
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

module.exports.sendMail = async (req, res) => {
    const { order, code } = req.body;
    var transporter = nodemailer.createTransport({
        // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: '20520772@gm.uit.edu.vn', //Tài khoản gmail vừa tạo
            pass: 'YenAnh!2#DEV', //Mật khẩu tài khoản gmail vừa tạo
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        },
    });

    const convertToVND = (price) => {
        return price.toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
        });
    };

    var content = '';
    content += `
        <div style="padding: 0px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">DeathShop gửi bạn mã vận chuyển</h4>
                <div style="color: black">Tên người mua hàng: ${
                    order.idInfoReceived === null
                        ? order.anothorInfo.name
                        : order.idInfoReceived.name
                }</div>
                <div style="color: black">Mã đơn hàng của bạn: #${
                    order._id
                }</div>
                <div style="color: black">Số tiền đã thanh toán: ${convertToVND(
                    order.TotalAmountOrdered * 1,
                )}</div>
                <div style="color: black">Mã vận chuyển: <span style="font-weight: 600;color: #3977CE">${
                    req.body.code
                }</span> </div>
            </div>
        </div>
    `;
    var mainOptions = {
        // thiết lập đối tượng, nội dung gửi mail
        from: 'NQH-Test nodemailer',
        to: 'waitingforlovebmt@gmail.com',
        subject: 'Code vận chuyển',
        text: 'Your text is here', //Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content, //Nội dung html mình đã tạo trên kia :))
    };
    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log(err);
            req.flash('mess', 'Lỗi gửi mail: ' + err); //Gửi thông báo đến người dùng
            res.redirect('/');
        } else {
            console.log('Message sent: ' + info.response);
            req.flash('mess', 'Một email đã được gửi đến tài khoản của bạn'); //Gửi thông báo đến người dùng
            res.redirect('/');
        }
    });

    return res.json({ status: true });
};
