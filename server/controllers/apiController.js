const request = require('request');
const key = require('../config/quandlConfig.json').key;
const errorHandler = require('../helpers/errorHandler');

module.exports = function (app) {
	//API route handlers
	//get stock data
	app.get('/api/stock/:symbol', function (req, res) {
		const { symbol } = req.params;
		const date = new Date();
		const year = date.getUTCFullYear() - 1;
		const uri = `https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=${year}0601&ticker=${symbol}&qopts.columns=date,open&api_key=${key}`;
		request.get(uri, (err, response, body) => {
			if (err) {
				return errorHandler(err, res, response.statusCode);
			}
			const { data } = JSON.parse(body).datatable;
			if (data.length === 0) {
				return errorHandler(err, res, 404);
			}
			const callback = (prev) => {
				res.json(prev);
			}
			const obj = { symbol, data: {} };
			data.reduce((prev, curr, ind) => {
				const dateStamp = curr[0].split('-');
				const year = dateStamp[0];
				const month = dateStamp[1];
				const price = curr[1];
				if (!prev[year + month]) {
					prev[year + month] = {
						month: monthConvert(month),
						year,
						price,
						count: 1
					};
				} else {
					prev[year + month].price = parseFloat(prev[year + month].price + price).toFixed(2);
					prev[year + month].count = prev[year + month].count + 1;
				}
				if (ind === data.length - 1) {
					callback(obj);
				}
				return prev;
			}, obj.data)
		});
	});
}

function monthConvert(monthNum) {
	var month = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	return month[parseInt(monthNum) - 1];
}