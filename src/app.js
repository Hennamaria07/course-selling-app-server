const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const app = new express();
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static('public'))
app.use(cookieParser());

module.exports = app;