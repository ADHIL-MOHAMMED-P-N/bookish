const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    like: {
        type: Number,
    },
});

const BookSchema = new mongoose.Schema({
    ibnNumber: {
        type: String,
        /* required: true, */
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        /*  required: true, */
    },
    language: {
        type: String,
        /*  required: true, */
    },
    desc: {
        type: String,
        /*  required: true, */
    },
    img: {
        type: String,
        /*  required: true, */
    },
    linkToPurchase: {
        type: String,
        /* required: true, */
    },
    year: {
        type: String,
        /*   required: true, */
    },
    genre: {
        type: String,
        /* required: true, */
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    review: [reviewSchema],

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
module.exports = mongoose.model("Book", BookSchema);