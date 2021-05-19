const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/auth_middleware");
const Book = require("../mongoDB/models/Book");

//to get form
router.get("/add", verifyAuth, (req, res) => {
    res.render("form");
});
//post to books
router.post("/", verifyAuth, async(req, res) => {
    try {
        req.body.user = req.user.id;
        await Book.create(req.body);
        res.redirect("/home");
    } catch (err) {
        console.error(err);
        res.render("error");
    }
});

module.exports = router;