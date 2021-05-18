const express = require("express");
const dotEnv = require("dotenv");
const connnectDB = require("./configuration/database");
const handlebars = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const session = require("express-session");

//configuration
dotEnv.config({ path: "./configuration/config.env" });
//passport config for authentication
require("./configuration/auth")(passport);

//connnecting to mongoDB
connnectDB();

//---------------------------------   app     ----------------------------------------
//init app
const app = express();

//Static Folder
app.use(express.static(path.join(__dirname, "static")));

//Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "index" }));
app.set("view engine", "handlebars");

//session middle ware ----!!always put above passport middleware
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false, //which means dont create a sessions until something is stores
    })
);

//passport-middleware
app.use(passport.initialize());
app.use(passport.session());

//Using the routes(routes at bottom)
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth_route"));

const port = process.env.PORT || 4000;
app.listen(
    port,
    console.log(`server running at PORT:${port}, mode : ${process.env.NODE_ENV}`)
);