import Movie from '../models/movie.mode.js';


import { createMovieFn, deleteMovieFn, getMovieById } from '../services/movie.service.js';
import {successResponseBody, errorResponseBody} from '../utils/responseBody.js'


const createMovie = async (req, res) => {
  try {
    const movie = await createMovieFn(req.body);

    successResponseBody.data = movie
    successResponseBody.message = "Successfully created the movie";
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

    successResponseBody.data = response
    successResponseBody.message = "Successfully deleted the movie";
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

export { createMovie, deleteMovie, getMovie };
