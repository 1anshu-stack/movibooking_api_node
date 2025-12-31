const badRequestResponse = {
  success: false,
  err: [],
  data: {},
  message: "Malformed Request | Bad Request"
}


/**
 * validator for signup request
 * @param req -> http request object
 * @param res -> http response object
 * @param next -> next middleware
 * @returns 
 */
const validateSignupRequest = async (req, res, next) => {
  // validate name of the user
  if(!req.body.name){
    badRequestResponse.err.push("Name of the user not present in the request")
  }

  // validate email of the user
  if(!req.body.email){
    badRequestResponse.err.push("Email of the user not present in the request")
  }

  // validate password of the user
  if(!req.body.password){
    badRequestResponse.err.push("Password of the user not present in the request")
  }

  if(badRequestResponse.err.length > 0){
    return res.status(422).json(badRequestResponse);
  }
  next();
}


/**
 * validator for signin request
 * @param req -> http request object
 * @param res -> http response object
 * @param next -> next middleware
 * @returns 
 */
const validateSigninRequest = async (req, res, next) => {
  // validate email of the user
  if(!req.body.email){
    badRequestResponse.err.push("No email provide for signin")
  }

  // validate password of the user
  if(!req.body.password){
    badRequestResponse.err.push("No password provide for singin")
  }

  if(badRequestResponse.err.length > 0){
    return res.status(422).json(badRequestResponse);
  }
  next();
}

export {validateSignupRequest, validateSigninRequest}