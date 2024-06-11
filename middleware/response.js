export default (req, res, next) => {
  const successResponse = (status, body = null, message = "success") => {
    return res.status(status).json({
      success: true,
      body,
      message,
    });
  };

  const failureResponse = (status, message = "failure") => {
    return res.status(status).json({
      success: false,
      body: null,
      message,
    });
  };

  res.sendSuccessResponse = successResponse;
  res.sendFailureResponse = failureResponse;
  next();
};
