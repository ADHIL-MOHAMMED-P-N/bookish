const express = require("express");
const router = express.Router();
const { verifyAuth, verifyGuest } = require("../middleware/auth_middleware");
const Book = require("../mongoDB/models/Book");
const User = require("../mongoDB/models/User");

//single user page
router.get("/:id", verifyAuth, async(req, res) => {
    try {
        const books = await Book.find({
                user: req.params.id,
            })
            .populate("user")
            .lean();

        const singleUser = await User.findOne({
            _id: req.params.id,
        }).lean();

        res.render("user", {
            books,
            name: req.user.displayName, //for navbar partials
            singleUser,
        });
        console.log(singleUser)
    } catch (error) {
        console.log(error);
        res.render("error");

    }
});

module.exports = router;