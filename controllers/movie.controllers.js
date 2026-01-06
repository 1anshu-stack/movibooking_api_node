import Movie from '../models/movie.mode.js';

import {
  createMovieFn,
  deleteMovieFn,
  getMovieById,
  updateMoviefn,
  fetchMovies,
} from '../services/movie.service.js';

import { STATUS_CODE } from '../utils/constans.js';

import {
  successResponseBody,
  errorResponseBody,
} from '../utils/responseBody.js';

const createMovie = async (req, res) => {
  try {
    const response = await createMovieFn(req.body);
    // console.log("response", response);

    successResponseBody.data = response;
    successResponseBody.message = 'Successfully created the movie';
    return res.status(STATUS_CODE.OK).json(successResponseBody);
  } catch (error) {
    console.log(error);
    if (error.err) {
      errorResponseBody.error = error.err;
      errorResponseBody.message =
        'validation failed on few parameters of the request body';
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const response = await deleteMovieFn({
      _id: req.params.id,
    });

    successResponseBody.data = response;
    successResponseBody.message = 'Successfully deleted the movie';
    return res.status(STATUS_CODE.OK).json(successResponseBody);
  } catch (error) {
    console.log(error);
    if(error.err){
      errorResponseBody.error = error.err
      return res.status(error.code).json(errorResponseBody)
    }
    errorResponseBody.error = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const getMovie = async (req, res) => {
  try {
    const response = await getMovieById(req.params.id);

    successResponseBody.data = response;
    return res.status(STATUS_CODE.OK).json(successResponseBody);
  } catch (error) {
    console.log(error);
    if (error.err) {
      errorResponseBody.error = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const updateMovie = async (req, res) => {
  try {
    const response = await updateMoviefn(req.params.id, req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message =
        'validation failed on few parameters of the request body';
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = 'Successfully created the movie';
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.error = error;
    return res.status(500).json(errorResponseBody);
  }
};

const getMovies = async (req, res) => {
  try {
    // console.log(req.query)
    const response = await fetchMovies(req.query);
    
    successResponseBody.data = response;
    return res.status(STATUS_CODE.OK).json(successResponseBody);
  } catch (error) {
    console.log(error);
    if (error.err) {
      errorResponseBody.error = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

export { createMovie, deleteMovie, getMovie, updateMovie, getMovies };
