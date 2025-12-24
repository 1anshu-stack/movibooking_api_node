import { errorResponseBody } from "../utils/responseBody.js"


const validateMovieCreateRequest = async (req, res, next) => {
  if(!req.body.name){
    errorResponseBody.error = 'The name of the movie is not present in the request'
    return res.status(400).json(errorResponseBody);
  }

  if(!req.body.description){
    errorResponseBody.error = 'The description of the movie is not present in the request'
    return res.status(400).json(errorResponseBody);
  }

  if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length <= 0){
    errorResponseBody.error = 'The casts of the movie is not present in the request'
    return res.status(400).json(errorResponseBody);
  }

  if(!req.body.trailerUrl){
    errorResponseBody.error = 'The trailerUrl of the movie is not present in the request'
    return res.status(400).json(errorResponseBody);
  }

  if(!req.body.releaseDate){
    errorResponseBody.error = 'The releaseDate of the movie is not present in the request'
    return res.status(400).json(errorResponseBody);
  }

  if(!req.body.director){
    errorResponseBody.error = 'The director of the movie is not present in the request'
    return res.status(400).json(errorResponseBody);
  }

  next();
}


export {validateMovieCreateRequest};