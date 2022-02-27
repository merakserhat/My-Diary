module.exports = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  let type = error.type;
  const data = error.data;

  if (!type) {
    type = "unknown";
  }

  const responseData = {
    error: {
      message,
      type,
      data,
    },
  };
  console.log(status);
  console.log(message);
  console.log(type);
  console.log(data);
  res.status(status).json(responseData);
};
