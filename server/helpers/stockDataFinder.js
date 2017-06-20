const key = require("../config/quandlConfig.json").key;
const stockDataReducer = require("./stockDataReducer");
const request = require("request");
const Stocks = require("../models/stocks");
const errorHandler = require("./errorHandler");
const types = require("../controllers/types");

module.exports = (symbols, res, type, storedData, wss) => {
  const uriSymbols = symbols.length === 1 ? symbols[0] : symbols.join(",");
  const date = new Date();
  const stockDay = "" + date.getUTCFullYear() + date.getUTCDate();
  const lastYear = date.getUTCFullYear() - 1;
  const uri = `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=${lastYear}0601&ticker=${uriSymbols}&qopts.columns=ticker,date,open&api_key=${key}`;
  request.get(uri, (err, response, body) => {
    if (err) {
      return errorHandler(err, res, response.statusCode);
    }
    const { data } = JSON.parse(body).datatable;
    if (data.length === 0) {
      return errorHandler(err, res, 404);
    }
    const callback = prev => {
      switch (type) {
        case types.DEFAULT: {
          const newStockDay = new Stocks({
            stockDay,
            symbols,
            data: prev
          });
          return newStockDay.save((err, newEntry) => {
            if (err) {
              return errorHandler(err, res, 500);
            }
            return res.json(newEntry);
          });
        }
        case types.ADD: {
          const newData = Object.assign({}, storedData.data, prev);
          storedData.data = newData;
          storedData.symbols.push(symbols[0]);
          return storedData.save((err, newEntry) => {
            if (err) {
              return errorHandler(err, res, 500);
            }
            res.json(newEntry);
            return wss.broadcast(newEntry);
          });
        }
        default:
          return;
      }
    };
    return stockDataReducer(data, callback, res);
  });
};
