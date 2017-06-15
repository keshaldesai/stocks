const mongoose = require('mongoose');

var Stocks = mongoose.model('Stocks', {
	stockDay: String,
	symbols: Array,
	data: {}
});

module.exports = Stocks;