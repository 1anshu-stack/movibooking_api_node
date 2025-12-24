import Movie from '../models/movie.mode.js';

import {
  createMovieFn,
  deleteMovieFn,
  getMovieById,
  updateMoviefn,
  fetchMovies,
} from '../services/movie.service.js';
import {
  successResponseBody,
  errorResponseBody,
} from '../utils/responseBody.js';

const createMovie = async (req, res) => {
  try {
    const response = await createMovieFn(req.body);
    // console.log("response", response);
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
    console.log(error);
    return res.status(500).json(errorResponseBody);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const response = await deleteMovieFn({
      _id: req.params.id,
    });
    if (response.error) {
      errorResponseBody.error = response.error;
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = 'Successfully deleted the movie';
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    return res.status(201).json(errorResponseBody);
  }
};

const getMovie = async (req, res) => {
  try {
    const response = await getMovieById(req.params.id);
    if (response.error) {
      errorResponseBody.error = response.error;
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    return res.status(500).json(errorResponseBody);
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
    const response = await fetchMovies(req.query);
    if (response.err) {
      errorResponseBody.error = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

export { createMovie, deleteMovie, getMovie, updateMovie, getMovies };
