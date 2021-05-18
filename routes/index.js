const express = require("express");
const router = express.Router();

//Login route

router.get("/", (req, res) => {
    res.render("login", {
        layout: "loginlayout", //for getting different titles(bookish Login)
    });
});

//Home route
router.get("/home", (req, res) => {
    res.render("home");
});

module.exports = router;