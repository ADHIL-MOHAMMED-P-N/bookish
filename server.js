const express = require("express");
const dotEnv = require("dotenv");
const connnectDB = require("./configuration/database");
const handlebars = require("express-handlebars");
const path = require("path");

//configuration
dotEnv.config({ path: "./configuration/config.env" });

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

//Using the routes
app.use("/", require("./routes/index"));

//Static folder

const port = process.env.PORT || 4000;
app.listen(
    port,
    console.log(`server running at PORT:${port}, mode : ${process.env.NODE_ENV}`)
);