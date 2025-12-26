import { errorResponseBody } from "../utils/responseBody.js"


/**
 * 
 * @param  req -> Http request object 
 * @param  res -> Http response object
 * @param  next -> next middleware function
 * @returns -> weather the request is valid or not
 */
const validateTheatreCreateRequest = async (req, res, next) => {
  if(!req.body.name){
    errorResponseBody.error = 'The name of the Theatre is not present in the request'
    return res.status(400).json(errorResponseBody);
  }

  if(!req.body.pincode){
    errorResponseBody.error = 'The pincode of the Theatre is not present in the request'
    return res.status(400).json(errorResponseBody);
  }

  if(!req.body.city){
    errorResponseBody.error = 'The city of the Theatre is not present in the request'
    return res.status(400).json(errorResponseBody);
  }

  next();
}


export {validateTheatreCreateRequest};