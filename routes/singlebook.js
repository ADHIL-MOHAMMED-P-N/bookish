const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/auth_middleware");
const Book = require("../mongoDB/models/Book");

router.get("/:id", verifyAuth, async(req, res) => {
    try {
        const book = await Book.findById(req.params.id).lean();
        res.render("showbook", {
            book: book,
        });
    } catch (error) {
        res.render("error");
    }
});

module.exports = router;