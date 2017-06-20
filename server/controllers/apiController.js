const errorHandler = require("../helpers/errorHandler");
const stockDataFinder = require("../helpers/stockDataFinder");
const Stocks = require("../models/stocks");
const types = require("./types");
const dbLookup = require("../helpers/dbLookup");

module.exports = app => {
  //get stock data
  app.get("/api/default", (req, res) => {
    const callback = storedData => {
      if (!storedData) {
        const defaultSymbols = ["AAPL", "FB", "MMM", "YHOO"];
        return stockDataFinder(defaultSymbols, res, types.DEFAULT);
      }
      return res.json(storedData);
    };
    return dbLookup(res, callback);
  });

  app.post("/api/add", (req, res) => {
    const callback = storedData => {
      const { symbol } = req.body;
      return stockDataFinder([symbol], res, types.ADD, storedData);
    };
    return dbLookup(res, callback);
  });

  app.post("/api/remove", (req, res) => {
    const date = new Date();
    const stockDay = "" + date.getUTCFullYear() + date.getUTCDate();
    const callback = storedData => {
      const { symbol } = req.body;
      const { data, symbols } = storedData;
      delete data[symbol];
      const newSymbols = symbols.filter(arrSymbol => {
        return arrSymbol !== symbol;
      });
      return Stocks.findOneAndUpdate(
        { stockDay },
        { symbols: newSymbols, data },
        { new: true, upsert: true },
        (err, newEntry) => {
          if (err) {
            return errorHandler(err, res, 500);
          }
          return res.json(newEntry);
        }
      );
    };
    return dbLookup(res, callback);
  });
};
