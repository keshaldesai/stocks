const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = function(app) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
};
