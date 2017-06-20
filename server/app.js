const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const apiControlller = require("./controllers/apiController");
const setupControlller = require("./controllers/setupController");

const mongoConfig = require("./config/mongoConfig.json");
const mongoose = require("mongoose");

//connect to MongoDB
mongoose.connect(
  `mongodb://${mongoConfig.user}:${mongoConfig.pass}@ds123752.mlab.com:23752/stockdb`
);

//use bodyparser, cors, passport
setupControlller(app);

//general API handler
apiControlller(app, wss);

server.listen(8000, console.log("Listening on port 8000"));
