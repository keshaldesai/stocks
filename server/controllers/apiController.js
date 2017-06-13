const request = require('request');
const key = require('../config/quandlConfig.json').key;
const errorHandler = require('../helpers/errorHandler');

module.exports = function (app) {
	//API route handlers
	//get stock data
	app.get('/api/stock/:symbol', function (req, res) {
		const { symbol } = req.params;
		const uri = `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=20100101&ticker=${symbol}&qopts.columns=date,open&api_key=${key}`;
		request.get(uri, (err, response, body) => {
			if (err) {
				return errorHandler(err, res, response.statusCode);
			}
			const { data } = JSON.parse(body).datatable;
			if (data.length === 0) {
				return errorHandler(err, res, 404);
			}
			return res.json({ data });
		});
	});
}