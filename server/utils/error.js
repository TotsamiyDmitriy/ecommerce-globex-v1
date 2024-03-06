export const errorHandler = (statusCode, message = 'Internal Server Error') => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
