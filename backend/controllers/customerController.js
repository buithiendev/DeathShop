const Customer = require('../model/customerModal');
const brcypt = require('bcrypt');
const Token = require('../model/tokenModal');
const { sign, verify } = require('jsonwebtoken');
const { MoreThanOrEqual } = require('typeorm');

module.exports.authenticated = async (req, res, next) => {
    try {
        const accessToken = req.header('Authorization')?.split(' ')[1] || '';

        const payload = verify(accessToken, 'access_secret');

        if (!payload) {
            return res.status(401).send({
                status: 'unauthenticated',
            });
        }
        const customer = await Customer.findOne({ _id: payload.id }).lean();

        if (!customer) {
            return res.status(401).send({
                status: 'unauthenticated',
            });
        }
        const { password, ...data } = customer;
        res.send(data);
    } catch (ex) {
        return res.status(401).send({
            status: 'unauthenticated',
        });
    }
};

module.exports.refresh = async (req, res) => {
    try {
        const refreshTokenCustomer = req.cookies['refreshTokenCustomer'];

        const payload = verify(refreshTokenCustomer, 'refresh_secret');
        if (!payload) {
            return res.status(401).send({
                status: 'unauthenticated',
            });
        }

        const dbToken = await Token.findOne({
            userId: payload.id,
            expiredAt: { $gte: new Date() },
        });

        if (!dbToken) {
            return res.status(401).send({
                status: 'unauthenticated',
            });
        }

        const token = sign(
            {
                id: payload.id,
            },
            'access_secret',
            { expiresIn: '30s' },
        );
        res.send({ token });
    } catch (ex) {
        return res.status(401).send({
            status: 'unauthenticated',
        });
    }
};

module.exports.logout = async (req, res) => {
    const refreshTokenCustomer = req.cookies['refreshTokenCustomer'];

    await Token.findOneAndDelete({ token: refreshTokenCustomer });

    res.cookie('refreshTokenCustomer', '', { maxAge: 0 });

    res.send({
        status: true,
    });
};

module.exports.create = async (req, res, next) => {
    try {
        const { fullName, gender, date, month, year, email, password } =
            req.body;

        const checkEmail = await Customer.findOne({ email });
        if (checkEmail)
            return res.json({ msg: 'email already used', status: false });

        const dateOfBirth = { date, month, year };
        const hashedPassword = await brcypt.hash(password, 10);

        const customer = await Customer.create({
            fullName,
            gender,
            email,
            dateOfBirth,
            password: hashedPassword,
        });

        delete customer.password;
        return res.json({ status: true, customer });
    } catch (ex) {
        next(ex);
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const customer = await Customer.findOne({ email });
        if (!customer)
            return res.json({
                msg: 'Incorrect email',
                status: false,
            });
        const isPasswordValid = await brcypt.compare(
            password,
            customer.password,
        );
        if (!isPasswordValid)
            return res.json({
                msg: 'Incorrect password',
                status: false,
            });

        const refreshTokenCustomer = sign(
            {
                id: customer._id,
            },
            'refresh_secret',
            { expiresIn: '1w' },
        );

        res.cookie('refreshTokenCustomer', refreshTokenCustomer, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const createAt = new Date();
        const expiredAt = new Date();
        expiredAt.setDate(expiredAt.getDate() + 7);

        await Token.create({
            userId: customer._id,
            token: refreshTokenCustomer,
            createdAt: createAt,
            expiredAt: expiredAt,
        });

        const token = sign(
            {
                id: customer._id,
            },
            'access_secret',
            { expiresIn: '30s' },
        );

        res.send({
            token,
        });
    } catch (ex) {
        next(ex);
    }
};

module.exports.changePassword = async (req, res, next) => {
    try {
        const email = req.params.email;
        const { oldPassword, newPassword } = req.body;

        const customer = await Customer.findOne({ email });
        if (!customer)
            return res.json({
                msg: 'Incorrect email',
                status: false,
            });
        const isPasswordValid = await brcypt.compare(
            oldPassword,
            customer.password,
        );
        if (!isPasswordValid) {
            return res.status(404).send({
                status: 'Old password incorrect',
            });
        }
        const hashedPassword = await brcypt.hash(newPassword, 10);
        const response = await Customer.findByIdAndUpdate(
            customer._id,
            {
                password: hashedPassword,
            },
            { new: true },
        );

        return res.json({ status: true, response });
    } catch (ex) {
        next(ex);
    }
};

module.exports.changeInfo = async (req, res, next) => {
    try {
        const email = req.params.email;
        const { fullName, date, month, year, gender } = req.body;

        const customer = await Customer.findOneAndUpdate(
            { email: email },
            {
                fullName,
                dateOfBirth: { date, month, year },
                gender,
            },
            { new: true },
        );
        return res.json({ status: true, customer });
    } catch (ex) {
        next(ex);
    }
};

module.exports.addAddress = async (req, res, next) => {
    try {
        const em = req.params.email;
        const { name, email, phone, address } = req.body;
        const customer = await Customer.findOneAndUpdate(
            { email: em },
            {
                $push: {
                    deliveryInformation: {
                        name: name,
                        email: email,
                        phone: phone,
                        address: address,
                    },
                },
            },
            { new: true },
        );
        return res.json({ status: true, customer });
    } catch (ex) {
        next(ex);
    }
};

module.exports.addToCart = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { productSelected, colorSelected } = req.body;

        const customer = await Customer.findByIdAndUpdate(
            id,
            {
                $push: {
                    cart: {
                        productSelected: productSelected._id,
                        colorSelect: colorSelected,
                    },
                },
            },
            { new: true },
        );

        
        return res.json({ status: true, customer });
    } catch (ex) {
        next(ex);
    }
};
