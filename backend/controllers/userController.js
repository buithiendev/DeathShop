const Users = require("../model/userModel");
const brcypt = require("bcrypt");

// module.exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.json({ msg: "Incorrect email or password", status: false });
//     const isPasswordValid = await brcypt.compare(password, user.password);
//     if (!isPasswordValid)
//       return res.json({ msg: "Incorrect email or password", status: false });
//     delete user.password;

//     return res.json({ status: true, user });
//   } catch (ex) {
//     next(ex);
//   }
// };

module.exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role, password, phone, status } =
      req.body;
    const emailCheck = await Users.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "email already used", status: false });
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
      return res.json({ msg: "email already used", status: false });
    }
  } catch (ex) {
    next(ex);
  }
};

// .select([
//   "firstName",
//   "lastName",
//   "email",
//   "phone",
//   "role",
//   "status",
// ]);

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find({})
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};