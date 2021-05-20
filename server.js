const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const connnectDB = require("./configuration/database");
const handlebars = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

//configuration
dotEnv.config({ path: "./configuration/config.env" });
//passport config for authentication
require("./configuration/auth")(passport);

//connnecting to mongoDB
connnectDB();

//---------------------------------   app     ----------------------------------------
//init app
const app = express();

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Static Folder
app.use(express.static(path.join(__dirname, "static")));
/* app.use(express.static(path.join(__dirname, "static", "uploads"))); */

//Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "index" }));
app.set("view engine", "handlebars");
/* app.use(express.static("views/images")); */ //img not loading

//session middle ware ----!!always put above passport middleware
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false, //which means dont create a sessions until something is stores
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
        }),
    })
);

//passport-middleware
app.use(passport.initialize());
app.use(passport.session());

//Using the routes(routes at bottom)
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth_route"));
app.use("/books", require("./routes/books_route"));
app.use("/search", require("./routes/search"));

const port = process.env.PORT || 4000;
app.listen(
    port,
    console.log(`server running at PORT:${port}, mode : ${process.env.NODE_ENV}`)
);