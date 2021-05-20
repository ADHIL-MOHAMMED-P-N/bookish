const express = require("express");
const router = express.Router();
const { verifyAuth, verifyGuest } = require("../middleware/auth_middleware");
const fetch = require("node-fetch");
/* const Book = require("../mongoDB/models/Book"); */

//Login route
router.get("/", verifyAuth, async(req, res) => {
    console.log("fetching api");
    res.redirect("/home");

    const url = "https://www.googleapis.com/books/v1/volumes?q=arachar";
    const options = {
        method: "GET",
    };
    const response = await fetch(url, options)
        .then((res) => res.json())
        .catch((e) => {
            console.error({
                message: "Erroe occured",
                error: e,
            });
        });
    console.log("responce :", response);
    res.json();
});

module.exports = router;