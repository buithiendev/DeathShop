const User = require("../model/userModel");
const brcypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ msg: "Incorrect email or password", status: false });
    const isPasswordValid = await brcypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect email or password", status: false });
    delete user.password;

    return res.json({status: true,user})
  } catch (ex) {
    next(ex)
  }
};
