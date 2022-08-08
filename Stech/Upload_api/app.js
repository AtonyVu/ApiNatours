const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const uploadRouter = require("./Routers/uploadRouter");
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/`));
// app.use(express.static(`${__dirname}/public`));
app.use(express.json());

app.use("/api/v1/", uploadRouter);

module.exports = app;
