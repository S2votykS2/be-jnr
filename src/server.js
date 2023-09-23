import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./routes/api";
import connectDB from "./config/database.js";
import cors from "cors";
import cookieParser from "cookie-parser";

require("dotenv").config();

let app = express();
// app.use(cors({ origin: '*' }));
//config app
// middle ware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

apiRouter(app);
connectDB();

let port = process.env.PORT || 6969;
let hostname = process.env.HOST_NAME;

app.listen(port, hostname, () => {
  //callback
  console.log(
    `Backend Nodejs is running on the port : http://${hostname}:${port}`
  );
});
