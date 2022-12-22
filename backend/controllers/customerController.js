const Customer = require('../model/customerModal');
const brcypt = require('bcrypt');

module.exports.create = async (req, res, next) => {
    try {
        const { fullName, gender, date, month, year, email, password } =
            req.body;

        const checkEmail = await Customer.findOne({ email });
        if (checkEmail)
            return res.json({ msg: 'email already used', status: false });

        const dateOfBirth = date + '/' + month + '/' + year;
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
                msg: 'Incorrect email or password',
                status: false,
            });
        const isPasswordValid = await brcypt.compare(
            password,
            customer.password,
        );
        if (!isPasswordValid)
            return res.json({
                msg: 'Incorrect email or password',
                status: false,
            });

        delete user.password;

        return res.json({ status: true, customer });
    } catch (ex) {}
};
