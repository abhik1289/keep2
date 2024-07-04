const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: {
        require: true,
        type: String
    },
    last_name: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    profile_photo: {
        type: String
    },
    block: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false
    },
    labels: [
        {
            labelID: { type: String },
            title: { type: String }
        }
    ],
    public_id: {
        type: String,
    }
}, {
    timestapms: true
});
const User = mongoose.model('userinfo', userSchema);

module.exports = User;