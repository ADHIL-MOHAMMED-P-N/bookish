const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    ibnNumber: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    linkToPurchase: {
        type: Date,
        required: true,
    },
    year: {
        type: Date,
        required: true,
    },
    genre: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
module.exports = mongoose.model("Book", BookSchema);