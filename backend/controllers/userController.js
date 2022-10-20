const Users = require('../model/userModel');
const Token = require('../model/tokenModal')
const brcypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');
const {MoreThanOrEqual} = require('typeorm')

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) return res.json({ msg: 'Incorrect email or password', status: false });
        const isPasswordValid = await brcypt.compare(password, user.password);
        if (!isPasswordValid) return res.json({ msg: 'Incorrect email or password', status: false });

        delete user.password;
        if (!user.status) {
            return res.json({
                msg: 'Account is currently restricted. Please contact admin',
                status: false,
            });
        }
        
        const refreshToken = sign(
            {
                id: user._id,
            },
            'refresh_secret',
            { expiresIn: '1w' },
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const createAt = new Date();
        const expiredAt= new Date();
        expiredAt.setDate(expiredAt.getDate() + 7)

        await Token.create({
            userId: user._id,
            token: refreshToken,
            createdAt: createAt,
            expiredAt: expiredAt,
        })

        const token = sign(
            {
                id: user._id,
            },
            'access_secret',
            { expiresIn: '30s' },
        );

        return res.json({ token });
    } catch (ex) {
        next(ex);
    }
};

module.exports.authenticatedUser = async (req, res, next) => {
    try {
        const accessToken = req.header('Authorization')?.split(' ')[1] || "";

        const payload = verify(accessToken, 'access_secret');
        if (!payload) {
            return res.status(401).send({
                status: 'unauthenticated',
            });
        }

        const user = await Users.findOne(payload._id).lean();

        if (!user) {
            return res.status(401).send({
                status: 'unauthenticated',
            });
        }
        const { password, ...data } = user;
        return res.json(data);
    } catch (ex) {
        return res.status(401).send({
            status: 'unauthenticated',
        });
    }
};

module.exports.refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies['refreshToken'];

        const payload = verify(refreshToken, 'refresh_secret');
        if (!payload) {
            return res.status(401).send({
                status: 'unauthenticated1',
            });
        }

        const dbToken = await Token.findOne({
            userId: payload._id,
            expiredAt: MoreThanOrEqual(new Date())
        })

        if(!dbToken) {
            return res.status(401).send({
                status: 'unauthenticated2',
            });
        }

        const token = sign(
            {
                id: payload._id,
            },
            'access_secret',
            { expiresIn: '30s' },
        );

        return res.json({ token });
    } catch (ex) {
        return res.status(401).send({
            status: 'unauthenticated3',
        });
    }
};

module.exports.logout = async (req, res) => {
    const refreshToken = req.cookies['refreshToken'];

    await Token.delete({token: refreshToken})

    res.cookie('refreshToken', '', { maxAge: 0 });

    return res.json({
        status: true,
    });
};

module.exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, role, password, phone, status } = req.body;
        const emailCheck = await Users.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: 'email already used', status: false });
        }
        const hashedPassword = await brcypt.hash(password, 10);
        const user = await Users.create({
            firstName,
            lastName,
            email,
            role,
            password: hashedPassword,
            phone,
            status,
        });
        delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};

module.exports.checkEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const emailCheck = await Users.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: 'email already used', status: false });
        }
    } catch (ex) {
        next(ex);
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await Users.find({});
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
};

module.exports.updateStatus = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const newStatus = req.body.status;
        const userData = await Users.findByIdAndUpdate(
            userId,
            {
                status: newStatus,
            },
            { new: true },
        );
        return res.json(userData);
    } catch (ex) {
        next(ex);
    }
};

module.exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const password = req.body.password;
        if (password === '') {
            delete req.body.password;
        } else {
            const hashedPassword = await brcypt.hash(password, 10);
            req.body.password = hashedPassword;
        }
        const userData = await Users.findByIdAndUpdate(
            userId,
            {
                ...req.body,
            },
            { new: true },
        );
        return res.json(userData);
    } catch (ex) {
        next(ex);
    }
};

module.exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await Users.findById(userId).select([
            '_id',
            'firstName',
            'lastName',
            'email',
            'role',
            'phone',
            'status',
            'avatarImage',
        ]);
        return res.json(user);
    } catch (ex) {
        next(ex);
    }
};
