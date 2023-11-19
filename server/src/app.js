require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");
const app = express();
const cors= require("cors");  
// init middlewares
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true }));


// app.use(helmet({
//   crossOriginResourcePolicy: false,
// }));
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

app.use('/images',express.static(path.join('images')))

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
