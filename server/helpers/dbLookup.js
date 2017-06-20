const Stocks = require("../models/stocks");
const errorHandler = require("../helpers/errorHandler");

module.exports = (res, callback) => {
  const date = new Date();
  const stockDay = "" + date.getUTCFullYear() + date.getUTCDate();
  Stocks.findOne({ stockDay }, (err, storedData) => {
    if (err) {
      return errorHandler(err, res, 500);
    }
    return callback(storedData);
  });
};
