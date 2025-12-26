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



const validateUpdateMovies = async (req, res, next) => {
  if(req.body.insert === undefined){
    errorResponseBody.message = "The insert parameter is missing in the request";
    return res.status(400).json(errorResponseBody);
  }

  if(!req.body.movieIds){
    errorResponseBody.message = "No movies present in the request to be updated in theatre";
    return res.status(400).json(errorResponseBody);
  }

  if(!(req.body.movieIds instanceof Array)){
    errorResponseBody.message = "Expected array of movies but found something else";
    return res.status(400).json(errorResponseBody);
  }

  if(req.body.movieIds.length <= 0){
    errorResponseBody.message = "No movies present in the array provided";
    return res.status(400).json(errorResponseBody);
  }

  next()
}

export {validateTheatreCreateRequest, validateUpdateMovies};