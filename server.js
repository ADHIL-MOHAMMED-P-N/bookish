const express = require("express");

const app = express();
//sample get
app.get("/", (req, res) => {
    res.send("Testing server");
});

app.listen(5000, console.log("sever running at port 5000"));