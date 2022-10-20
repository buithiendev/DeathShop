const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: String,
        required: true,
      },
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    expiredAt: {
        type: Date,
    }
})

module.exports = mongoose.model("Token", tokenSchema)