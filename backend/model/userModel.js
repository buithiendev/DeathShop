const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    max: 32,
  },
  role: {
    type: Number,
    required: true,
    default: 3,
  },
  phone: {
    type: String,
    default: "",
    max: 12,
  },
  status: {
    type: Boolean,
    default: true,
  },
  isAvatarImage: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
})

module.exports = mongoose.model("Users", userSchema)
