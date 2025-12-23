const errorResponseBody = {
  error: {},
  data: {},
  message: 'Something went wrong, cannot process the request',
  success: false,
};

const successResponseBody = {
  error: {},
  data: {},
  message: 'Successfully processed the request',
  success: true,
};


export {
  errorResponseBody,
  successResponseBody
}