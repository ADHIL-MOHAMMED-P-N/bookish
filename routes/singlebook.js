const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/auth_middleware");
const Book = require("../mongoDB/models/Book");

router.get("/:id", verifyAuth, async(req, res) => {
    try {
        const book = await Book.findById(req.params.id).lean();
        res.render("showbook", {
            book: book,
            review: book.review,
            name: req.user.displayName,
        });
    } catch (error) {
        res.render("error");
    }
});

router.post("/:id", verifyAuth, function(req, res) {
    var newReview = { comment: req.body.review, like: 0 };
    Book.findOneAndUpdate({ _id: req.params.id }, { $push: { review: newReview } },
        function(error, success) {
            if (error) {
                res.render("error");
                console.log(error);
            } else {
                res.redirect("back");
            }
        }
    );
});

module.exports = router;