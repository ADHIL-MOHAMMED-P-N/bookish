const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/auth_middleware");
const Book = require("../mongoDB/models/Book");

router.get("/:id", verifyAuth, async(req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("user").lean();
        const ratingArray = book.rating;
        //filtering loggedin users rating only
        const userRatingArray = ratingArray.filter(rating => rating.user == req.user.id);

        //actual rating of book that is avg rating
        let ratingSum = 0;
        for (let i = 0; i < ratingArray.length; i++) {
            ratingSum = ratingSum + ratingArray[i].ratingValue
        }
        const avgRating = (ratingSum / ratingArray.length).toFixed(3)

        res.render("showbook", {
            book: book,
            review: book.review,
            name: req.user.displayName,
            rating: userRatingArray[userRatingArray.length - 1],
            avgRating,

        });
    } catch (error) {
        res.render("error");
        console.log(error);
    }
});
//review comments

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

//rate
router.post("/rating/:id", verifyAuth, function(req, res) {
    var newRating = { user: req.user.id, ratingValue: req.body.rating }
    Book.findOneAndUpdate({ _id: req.params.id }, { $push: { rating: newRating } },
            function(error, success) {
                if (error) {
                    res.render('error')
                    console.log(error)
                } else {
                    res.redirect('back')
                    console.log(newRating)

                }
            }
        )
        /*     var newReview = { comment: req.body.review, like: 0 };
            Book.findOneAndUpdate({ _id: req.params.id }, { $push: { review: newReview } },
                function(error, success) {
                    if (error) {
                        res.render("error");
                        console.log(error);
                    } else {
                        res.redirect("back");
                    }
                }
            ); */
});


module.exports = router;