const mongoose = require("mongoose");

var Stocks = mongoose.model("Stocks", {
  stockDay: String,
  symbols: String,
  data: {}
});

module.exports = Stocks;
