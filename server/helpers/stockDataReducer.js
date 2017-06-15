module.exports = function (data, callback) {
	data.reduce((prev, curr, ind) => {
		const ticker = curr[0];
		const dateStamp = curr[1].split('-');
		const timeStamp = `${dateStamp[0]}-${dateStamp[1]}`;
		const price = parseFloat(curr[2]);
		if (!prev[timeStamp]) {
			prev[timeStamp] = {};
		}
		if (!prev[timeStamp][ticker]) {
			prev[timeStamp][ticker] = {
				price,
				count: 1
			};
		} else {
			prev[timeStamp][ticker].price = (parseFloat(prev[timeStamp][ticker].price) + price).toFixed(2);
			prev[timeStamp][ticker].count = prev[timeStamp][ticker].count + 1;
		}
		if (ind === data.length - 1) {
			callback(prev);
		}
		return prev;
	}, {});
};