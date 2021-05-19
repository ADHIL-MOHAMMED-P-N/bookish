const express = require("express");
const router = express.Router();
const { verifyAuth, verifyGuest } = require("../middleware/auth_middleware");
const Book = require("../mongoDB/models/Book");

//Login route
router.get("/", verifyGuest, (req, res) => {
    res.render("login", {
        layout: "loginlayout", //for getting different titles(bookish Login)
    });
});

//Home route
router.get("/home", verifyAuth, async(req, res) => {
    try {
        const books = await Book.find({}).lean();
        res.render("home", {
            name: req.user.firstName,
            books: books,
        });
    } catch (error) {
        res.render("error");
    }
});

module.exports = router;