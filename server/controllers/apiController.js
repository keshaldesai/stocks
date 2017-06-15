const errorHandler = require('../helpers/errorHandler');
const stockDataFinder = require('../helpers/stockDataFinder');
const Stocks = require('../models/stocks');

module.exports = function (app) {
	//API route handlers

	//get stock data
	app.get('/api/default', function (req, res) {
		const date = new Date();
		const stockDay = '' + date.getUTCFullYear() + date.getUTCDate();
		const callback = () => {
			const defaultSymbols = ["GOOG", "AAPL", "FB", "MMM", "YHOO"];
			return stockDataFinder(date, stockDay, defaultSymbols, res);
		}
		Stocks.findOne({ stockDay }, (err, storedData) => {
			if (err) {
				return errorHandler(err, res, 500);
			}
			if (!storedData) {
				return callback();
			}
			return res.json(storedData);
		})
	});

}

function convertMonth(monthNum) {
	var month = [
		"JAN", "FEB", "MAR", "APR", "MAY", "JUN",
		"JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
	];
	return month[parseInt(monthNum) - 1];
}