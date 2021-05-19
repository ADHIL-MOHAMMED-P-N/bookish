const express = require("express");
const router = express.Router();
const { verifyAuth, verifyGuest } = require("../middleware/auth_middleware");
//Login route

router.get("/", verifyGuest, (req, res) => {
    res.render("login", {
        layout: "loginlayout", //for getting different titles(bookish Login)
    });
});

//Home route
router.get("/home", verifyAuth, (req, res) => {
    res.render("home");
});

module.exports = router;