const request = require('request');
const key = require('../config/quandlConfig.json').key;
const errorHandler = require('../helpers/errorHandler');
const Stocks = require('../models/stocks');
const stockDayReducer = require('../helpers/stockDataReducer');

//name: month, stocksym: avgmoprice, stocksym: avgmoprice2

module.exports = function (app) {
	//API route handlers

	//get stock data
	app.get('/api/default', function (req, res) {
		const date = new Date();
		const stockDay = '' + date.getUTCFullYear() + date.getUTCDate();
		const callback = () => {
			const defaultSymbols = ["GOOG", "AAPL", "FB", "MMM", "YHOO"];
			const lastYear = date.getUTCFullYear() - 1;
			const symbols = defaultSymbols.join(',');
			const uri = `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=${lastYear}0601&ticker=${symbols}&qopts.columns=ticker,date,open&api_key=${key}`;
			request.get(uri, (err, response, body) => {
				if (err) {
					return errorHandler(err, res, response.statusCode);
				}
				const { data } = JSON.parse(body).datatable;
				if (data.length === 0) {
					return errorHandler(err, res, 404);
				}
				const callback = (prev) => {
					const newStockDay = new Stocks({
						stockDay,
						symbols: defaultSymbols,
						data: prev
					});
					newStockDay.save((err, newEntry) => {
						if (err) {
							return errorHandler(err, res, 500);
						}
						return res.json(newEntry);
					});
				}
				stockDayReducer(data, callback)
			});
		};
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