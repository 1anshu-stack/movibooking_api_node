const badRequestResponse = {
  success: false,
  err: [],
  data: {},
  message: "Malformed Request | Bad Request"
}

/**
 * 
 * @param  req -> Http request object 
 * @param  res -> Http response object
 * @param  next -> next middleware function
 * @returns -> weather the request is valid or not
 */

const validateMovieCreateRequest = async (req, res, next) => {
  if(!req.body.name){
    badRequestResponse.err.push('The name of the movie is not present in the request')
  }

  if(!req.body.description){
    badRequestResponse.err.push('The description of the movie is not present in the request')
  }

  if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length <= 0){
    badRequestResponse.err.push('The casts of the movie is not present in the request')
  }

  if(!req.body.trailerUrl){
    badRequestResponse.err.push('The trailerUrl of the movie is not present in the request')
  }

  if(!req.body.releaseDate){
    badRequestResponse.err.push('The releaseDate of the movie is not present in the request')
  }

  if(!req.body.director){
    badRequestResponse.err.push('The director of the movie is not present in the request')
  }

  if(badRequestResponse.err.length > 0){
    return res.status(400).json(badRequestResponse);
  }

  next();
}


export {validateMovieCreateRequest};