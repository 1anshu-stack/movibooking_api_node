import Movie from '../models/movie.mode.js';


/**
 * 
 * @param data -> object containing details of the new movie to be created 
 * @returns -> return the new movie object created
 */
const createMovieFn = async (data) => {
  try {
    const movie = await Movie.create(data);
    return movie;
  } catch (error) {
    if(error.name == 'ValidationError'){
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key]=error.errors[key].message;
      });
      console.log(err);
      return {err: err, code: 422}
    }
    else {
      throw error;
    }
  }
}


/**
 * 
 * @param data -> id which will be used to indentify the movie to be deleted 
 * @returns -> object containing details of the movie deleted
 */
const deleteMovieFn = async (id) => {
  try {
    const movie = await Movie.findByIdAndDelete(id)
    if(!response){
      return {
        err: "No record of a theatre found for the given id",
        code: 404
      }
    }

    return movie;
  } catch (error) {
    console.log(error)
    throw error;
  } 
}


/**
 * 
 * @param id -> id which will be used to indentify the movie to be fetched
 * @returns -> object containing details of the movie fetched
 */
const getMovieById = async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    return {
      error: 'No movie found for the corresponding id provided',
      code: 404,
    };
  }
  return movie;
};


/**
 * 
 * @param id -> id which will be used to indentify the movie to be updated
 * @param data -> object that contains actual data which is to be updated in the db 
 * @returns -> return the new updated movie details
 */
const updateMoviefn = async (id, data) => {
  try {
    const movie = await Movie.findByIdAndUpdate(id, data, {new: true, runValidators: true}) ;
    return movie;
  } catch (error) {
    // console.log(error.name);
    if(error.name == 'ValidationError'){
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key]=error.errors[key].message;
      });
      return {err: err, code: 422}
    }
    else {
      throw error;
    }
  }
}


/**
 * 
 * @param filter -> filter will help us in filtering out data based on the conditionals it contains
 * @returns -> returns an object containing all the movies fetched based on the filter
 */
const fetchMovies = async (filter) => {
  let query = {};
  if(filter.name){
    query.name = filter.name;
  }

  let movies = await Movie.find(query);
  if(!movies) {
    return {
      err: "Not able to find the queries movies",
      code: 404
    }
  }

  return movies;
}


export { 
  getMovieById, 
  createMovieFn, 
  deleteMovieFn,
  updateMoviefn,
  fetchMovies
};
