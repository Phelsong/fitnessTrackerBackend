// create the express server here
const express = require('express');
const server = express();
const { client } = require("./db");
const apiRouter = require("./api");
const morgan = require('morgan');
require('dotenv').config()
const {PORT = 3000}=process.env;

server.use(morgan("dev"));

server.use(express.json());


server.use("/api", apiRouter);



server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
