
const mongoose = require("mongoose");
const nestedSchema = new mongoose.Schema({
    title: String,
    isChecked: Boolean,
    id: String,
});
const Note = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userinfo',
        require: true,
    },
    color: {
        type: String,
        default: "#c8d6e5",
    },
    background: {
        type: String,
    },
    pin: {
        type: Boolean,
        default: false,
    },
    archive: {
        type: Boolean,
        default: false,
    },
    trash: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
    },
    labelIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userinfo",
        },
    ],
    todo: {
        type: [nestedSchema],
        default: []
    },
    public_id: {
        type: String,
    },
    drawing: { type: String }
},
    { timestamps: { createdAt: true, updatedAt: true } }
)


module.exports = mongoose.model("note", Note);