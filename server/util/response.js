const responseJson = (res, status, data, message) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

module.exports = {
  responseJson,
};
