const express = require("express");
const dotEnv = require("dotenv");

//configuration
dotEnv.config({ path: "./configuration/config.env" });

const app = express();
//sample get

app.get("/", (req, res) => {
    res.send("Testing server");
});

const port = process.env.PORT || 4000;

app.listen(
    port,
    console.log(`server running at PORT:${port}, mode : ${process.env.NODE_ENV}`)
);