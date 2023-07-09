export const handleErrors = (error) => {
  if (error.response) {
    return { statusCode: error.response.status, message: error.response.data };
  }
  return { statusCode: error.code, message: error.message };
}
