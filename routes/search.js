const express = require("express");
const router = express.Router();
const { verifyAuth, verifyGuest } = require("../middleware/auth_middleware");
const fetch = require("node-fetch");
/* const Book = require("../mongoDB/models/Book"); */

//Login route
router.get("/", verifyAuth, async(req, res) => {
    console.log("fetching api");
    res.redirect("/home");
    //fetching the google books api
    /*    const url = "https://www.googleapis.com/books/v1/volumes?q=ovvijayan";
      const options = {
          method: "GET",
      };
      const response = await fetch(url, options)
          .then((res) => res.json())
          .then((data) => console.log(data.items))
          .catch((e) => {
              console.error({
                  message: "Erroe occured",
                  error: e,
              });
          }); */
});

module.exports = router;