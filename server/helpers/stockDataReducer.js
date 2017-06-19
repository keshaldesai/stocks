module.exports = function(data, callback) {
  data.reduce((prev, curr, ind) => {
    const ticker = curr[0];
    const dateStamp = curr[1].split("-");
    const timeStamp = `${dateStamp[0]}-${dateStamp[1]}`;
    const price = parseFloat(curr[2]);
    if (!prev[ticker]) {
      prev[ticker] = {};
    }
    if (!prev[ticker][timeStamp]) {
      prev[ticker][timeStamp] = {
        price,
        count: 1
      };
    } else {
      prev[ticker][timeStamp].price = (parseFloat(
        prev[ticker][timeStamp].price
      ) + price).toFixed(2);
      prev[ticker][timeStamp].count = prev[ticker][timeStamp].count + 1;
    }
    if (ind === data.length - 1) {
      callback(prev);
    }
    return prev;
  }, {});
};
