const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    like: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

});

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    ratingValue: {
        type: Number,

    }
})

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
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    linkToPurchase: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        /*   required: true, */
    },
    genre: {
        type: String,
        enum: [
            "Fiction",
            "Non-Fiction",
            "Sci-Fi",
            "Biography",
            "Science",
            "Politics",
            "Travelog",
            "Poem",
            "Romantic",
        ],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    review: [reviewSchema],

    rating: [ratingSchema],

    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
module.exports = mongoose.model("Book", BookSchema);