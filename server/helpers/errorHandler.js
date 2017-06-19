module.exports = function(err, res, statusCode) {
  //simple error handlers that outputs a console error and responds with a provided status code
  console.error(err);
  res.status(statusCode).end();
};
