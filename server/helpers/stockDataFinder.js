const key = require('../config/quandlConfig.json').key;
const stockDataReducer = require('./stockDataReducer');
const request = require('request');
const Stocks = require('../models/stocks');
const errorHandler = require('./errorHandler');

module.exports = function (date, stockDay, symbols, res) {
	const lastYear = date.getUTCFullYear() - 1;
	const uriSymbols = symbols.join(',');
	const uri = `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=${lastYear}0601&ticker=${uriSymbols}&qopts.columns=ticker,date,open&api_key=${key}`;
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
				symbols,
				data: prev
			});
			newStockDay.save((err, newEntry) => {
				if (err) {
					return errorHandler(err, res, 500);
				}
				return res.json(newEntry);
			});
		};
		return stockDataReducer(data, callback, res);
	});
};