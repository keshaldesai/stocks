const errorHandler = require("../helpers/errorHandler");
const stockDataFinder = require("../helpers/stockDataFinder");
const Stocks = require("../models/stocks");
const types = require("./types");

module.exports = function(app) {
  //get stock data
  app.get("/api/default", function(req, res) {
    const date = new Date();
    const stockDay = "" + date.getUTCFullYear() + date.getUTCDate();
    const callback = () => {
      const defaultSymbols = "AAPL,FB,MMM,YHOO";
      return stockDataFinder(defaultSymbols, res, types.DEFAULT);
    };
    Stocks.findOne({ stockDay }, (err, storedData) => {
      if (err) {
        return errorHandler(err, res, 500);
      }
      if (!storedData) {
        return callback();
      }
      return res.json(storedData);
    });
  });

  app.post("/api/add", function(req, res) {
    const date = new Date();
    const stockDay = "" + date.getUTCFullYear() + date.getUTCDate();
    const callback = storedData => {
      const { symbol } = req.body;
      return stockDataFinder(symbol, res, types.ADD, storedData);
    };
    Stocks.findOne({ stockDay }, (err, storedData) => {
      if (err) {
        return errorHandler(err, res, 500);
      }
      callback(storedData);
    });
  });
};
