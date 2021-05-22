const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/auth_middleware");
const multer = require("multer");
const Book = require("../mongoDB/models/Book");
const path = require("path");

//multer img upload
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./static/uploads/");
    },
    filename: function(req, file, callback) {
        callback(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
//upload parameter
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3, //3mb
    },
});

//to get form
router.get("/add", verifyAuth, (req, res) => {
    res.render("form");
});

//post to books
router.post("/", upload.single("img"), verifyAuth, async(req, res) => {
    console.log(req.file);
    try {
        req.body.user = req.user.id;
        req.body.img = req.file.filename;
        await Book.create(req.body);
        res.redirect("/home");
    } catch (err) {
        console.error(err);
        res.render("error");
    }
});

/* router.get("/:id", verifyAuth, async(req, res) => {
    try {
        const book = await Book.findById(req.params.id).lean();
        res.render("showbook", {
            book: book,
        });
    } catch (error) {
        res.render("error");
    }
}); */

module.exports = router;