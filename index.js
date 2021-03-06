// create the express server here
const express = require('express');
const cors = require('cors')
const server = express();
const apiRouter = require("./api");
const morgan = require('morgan');
require('dotenv').config()
const {PORT = 3000} = process.env;
const { client } = require('./db/index');
client.connect();
//------------------------------------------------------------
server.use(cors())
server.use(morgan("dev"));
server.use(express.json());
server.use("/api", apiRouter);
//------------------------------------------------------------------
server.use((req, res, next) => {
  console.log("Start up");
  console.log(req.body);
  console.log("End");

  next();
});

// server.get('/', (req, res, next) => {
//   res.send(`
//     <body style="background: ${ req.params.color };">
//       <h1> All is Well </h1>
//     </body>
//   `);
// });


//------------------------------------------------------------

//------------------------------------------------------------
server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
