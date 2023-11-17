require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();
const cors= require("cors");  
// init middlewares
app.use(cors())
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init db
require("./dbs/init.mongodb");
const { checkOVerload } = require("./helpers/check.connect");
// checkOVerload();
// init routes

app.use("", require("./routes"));

// handling error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.satus = 404;
  next(error);
});
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: error.stack ,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
