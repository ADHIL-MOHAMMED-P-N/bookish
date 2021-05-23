const express = require("express");
const router = express.Router();
const { verifyAuth, verifyGuest } = require("../middleware/auth_middleware");
const fetch = require("node-fetch");
const Book = require("../mongoDB/models/Book");

router.get("/", verifyAuth, async(req, res) => {
    try {
        const category = req.query.category;
        /* console.log(category); */
        const books = await Book.find({
            [category]: req.query.search, //"search" is the name of the input field
        }).lean();
        res.render("home", {
            books: books,
            name: req.user.displayName,
        });
    } catch (error) {
        res.render("error");
    }
});

module.exports = router;