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
    res.render("form", {
        name: req.user.displayName,
    });
});

//post to books
router.post("/", upload.single("img"), verifyAuth, async(req, res) => {
    try {
        req.body.user = req.user.id; //req.body give the form data ,and we add on user to it ie req.body.user
        req.body.img = req.file.filename;
        await Book.create(req.body);
        res.redirect("/home");
    } catch (err) {
        console.error(err);
        res.render("error");
    }
});
//edit book
/* router.get("/edit/:id", verifyAuth, async(req, res) => {
    const book = await Book.findOne({
        _id: req.params.id,
    }).lean();

    if (!book) {
        return res.render("error");
    }
    if (book.user != req.user.id) {
        res.redirect("/home");
    } else {
        res.render("editbook", {
            name: req.user.displayName,
            book: book,
        });
    }
}); */
//edit function PUT request Update book
/* router.put("/:id", verifyAuth, async(req, res) => {
    let book = await Book.findById(req.params.id).lean();
    if (!book) {
        return res.render("error");
    }

    if (book.user != req.user.id) {
        res.redirect("/home");
    } else {
        book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        });

        res.redirect("/dashboard");
    }
});
 */
//edit function PUT request Update book
/* router.post("/:id", upload.single("img"), verifyAuth, function(req, res) {
    Book.findOneAndUpdate({ _id: req.params.id }, {
            ibnNumber: req.body.ibnNumber,
            title: req.body.title,
            author: req.body.author,
            language: req.body.language,
            desc: req.body.desc,
            img: req.body.img,
            linkToPurchase: req.body.linkToPurchase,
            genre: req.body.genre,
        },
        function(error, success) {
            if (error) {
                res.render("error");
                console.log(error);
            } else {
                res.redirect("/dashboard");
            }
        }
    );
}); */
module.exports = router;