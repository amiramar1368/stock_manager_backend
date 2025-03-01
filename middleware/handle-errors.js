export default (req, res, next) => {
  const errorHandler = (error) => {
    // console.log(error);
    let message = "failure";
    let statusCode = 500;
    if (error.errors?.length) {
      if (error.errors[0].type === "unique violation") {
        statusCode = 409;
        message = error.errors[0].message;
      } else if (error.errors[0].type == "Validation error") {
        statusCode = 400;
        message = error.errors[0].message;
      } else {
        statusCode = 400;
        message = error.errors[0];
      }
    } else if (error?.cause?.errno === 1452) {
      statusCode = 400;
      if(error.table==="categories"){
        message="the proveded categoryId is not valid"
      }else{
        message = "foreign key constraint";
      }
    }  else if (error instanceof Error) {
      message = error.message;
      statusCode = 400;
    }
    return res.status(statusCode).json({ success: false, body: null, message });
  };
  res.sendError = errorHandler;
  next();
};
