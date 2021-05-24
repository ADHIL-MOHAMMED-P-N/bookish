const express = require("express");
const dotEnv = require("dotenv");
const methodOverride = require("method-override");
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

app.use(
    methodOverride(function(req, res) {
        if (req.body && typeof req.body === "object" && "_method" in req.body) {
            // look in urlencoded POST bodies and delete it
            let method = req.body._method;
            delete req.body._method;
            return method;
        }
    })
);

//Static Folder
app.use(express.static(path.join(__dirname, "static")));
/* app.use(express.static(path.join(__dirname, "static", "uploads"))); */

//handlebars helpers
const {
    formatDate,
    truncate,
    editButton,
    select,
} = require("./helpers/handlebars");

//Handlebars
app.engine(
    "handlebars",
    handlebars({
        defaultLayout: "index",
        helpers: {
            formatDate,
            truncate,
            editButton,
            select,
        },
    })
);
app.set("view engine", "handlebars");

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

//global variables

app.use(function(req, res, next) {
    res.locals.user = req.user || null; //access user within handlebar template(not bookUser but logged in user)
    next();
});

//Using the routes(routes at bottom)
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth_route"));
app.use("/books", require("./routes/books_route"));
app.use("/search", require("./routes/search"));
app.use("/singlebook", require("./routes/singlebook"));
app.use("/user", require("./routes/user"));

const port = process.env.PORT || 4000;
app.listen(
    port,
    console.log(`server running at PORT:${port}, mode : ${process.env.NODE_ENV}`)
);