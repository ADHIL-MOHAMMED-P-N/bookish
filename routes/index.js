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
        const books = await Book.find({})
            .populate("user")
            .sort({ createdAt: "desc" })
            .lean();
        res.render("home", {
            name: req.user.displayName,
            books: books,
        });
    } catch (error) {
        res.render("error");
    }
});
//dashboard
router.get("/dashboard", verifyAuth, async(req, res) => {
    try {
        const userBooks = await Book.find({ user: req.user.id }).lean();
        res.render("dashboard", {
            name: req.user.displayName,
            books: userBooks,
        });
    } catch (error) {
        console.error(error);
        res.render("error/500");
    }
});

module.exports = router;