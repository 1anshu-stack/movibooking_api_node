import { successResponseBody, errorResponseBody } from "../utils/responseBody.js";
import { STATUS_CODE } from "../utils/constans.js";

import { 
  createTheatrefn, 
  deleteTheatrefn,
  getTheatrefn,
  getAllTheatrefn,
  updateTheatrefn,
  updateMoviesInTheatresfn,
  getMoviesInATheatresfn,
  checkMovieInTheatrefn
} from "../services/theatre.service.js"


const createTheatre = async (req, res) => {
  try{
    const response = await createTheatrefn({...req.body, owner: req.user})
    console.log("response", response);

    successResponseBody.data = response
    successResponseBody.message = "Successfully created the theatre"
    return res.status(STATUS_CODE.CREATED).json(successResponseBody)
  } catch(error){
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(response.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}


const deleteTheatre = async (req, res) => {
  try {
    console.log(req.params.id)
    console.log(req.params)
    const response = await deleteTheatrefn(req.params.id);

    successResponseBody.data = response;
    successResponseBody.message = "Theatre information delete successfully"
    return res.status(STATUS_CODE.OK).json(successResponseBody)    
  } catch (error) {
    console.log(error)
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(response.code).json(errorResponseBody)
    }
    errorResponseBody.error = error
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}


const getTheatre = async (req, res) => {
  try {
    const response = await getTheatrefn(req.params.id);

    successResponseBody.data = response;
    successResponseBody.message = "successfully fetched the data of the theatre"
    return res.status(STATUS_CODE.OK).json(successResponseBody)
  } catch (error) {
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(response.code).json(errorResponseBody)
    }
    console.log(error)
    errorResponseBody.error = error
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}


const getAllTheatre = async (req, res) => {
  try {
    // console.log(req.body.params);
    const response = await getAllTheatrefn(req.query);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched all the theatres"
    return res.status(STATUS_CODE.OK).json(successResponseBody);
  } catch (error) {
    errorResponseBody.error = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}


const updateTheatre = async (req, res) => {
  try {
    const response = await updateTheatrefn(req.params.id, req.body);

    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated movies in the theatre"
    successResponseBody.message = "Data updated successfully"
    return res.status(STATUS_CODE.OK).json(successResponseBody);
  } catch (error) {
    console.log(error);
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(response.code).json(errorResponseBody)
    }
    errorResponseBody.error = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}



// MOVIE AND THEATRE COMBINE CONTROLLERS

/**
 * 
 * @param  req 
 * @param  res 
 * @returns 
 */
const updateMoviesInTheatres = async (req, res) => {
  try {
    const response = await updateMoviesInTheatresfn(
      req.params.id,
      req.body.movieIds,
      req.body.insert
    )
    
    successResponseBody.data = response;
    successResponseBody.message = "Successfully added movies in a particular theatre"
    return res.status(STATUS_CODE.OK).json(successResponseBody)
  }catch(error){
    console.log(error)
    if(error.err){
      errorResponseBody.error = error.err
      return res.status(response.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}


const getMoviesInATheatres = async (req, res) => {
  try{
    const response = await getMoviesInATheatresfn(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Get the movies list in theatre Successfully"
    return res.status(200).json(successResponseBody)
  }catch(error){
    errorResponseBody.error = error
    return res.status(500).json(errorResponseBody)
  }
}


const checkMovie = async (req, res) => {
  try {
    const response = await checkMovieInTheatrefn(req.params.theatreId, req.params.movieId);

    successResponseBody.data = response;
    successResponseBody.message = "Movie is present in this theatre";
    return res.status(STATUS_CODE.OK).json(successResponseBody)
  } catch (error) {
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(response.code).json(errorResponseBody)
    }
    errorResponseBody.error = error
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}

export {
  createTheatre,
  deleteTheatre,
  getTheatre,
  getAllTheatre,
  updateTheatre,
  updateMoviesInTheatres,
  getMoviesInATheatres,
  checkMovie
}
