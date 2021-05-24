const express = require("express");
const router = express.Router();
const { verifyAuth, verifyGuest } = require("../middleware/auth_middleware");
const Book = require("../mongoDB/models/Book");

//single user page
router.get("/:id", verifyAuth, async(req, res) => {
    try {
        const books = await Book.find({
                user: req.params.id,
            })
            .populate("user")
            .lean();
        const singlebook = await Book.findOne({
                //to grab the user from singlebook
                user: req.params.id,
            })
            .populate("user")
            .lean();
        res.render("user", {
            books,
            name: req.user.displayName,
            singlebook,
        });
    } catch (error) {
        console.log(error);
        res.render("error");
    }
});

module.exports = router;