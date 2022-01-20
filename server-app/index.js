require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./lib/db");
const config = require("./config/index");
const path = require("path");

//Set up Server
const app = express();
const PORT = process.env.SERVER_PORT || 5000;

//Middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

// Setup Database Connection

db.connect(config.database.dbPath)
  .then(() => {
    console.log(
      `Successful connect on ${config.database.serverName} \nPath = ${config.database.dbPath} `
    );
    app.listen(PORT, (err) =>
      err
        ? console.error(err)
        : console.log(`Server is running on port : ${PORT}`)
    );
  })
  .catch(() => {
    throw new Error(
      'Unable to connect on MongoDB \n run "npm run serve:start" to solve this.'
    );
  });
