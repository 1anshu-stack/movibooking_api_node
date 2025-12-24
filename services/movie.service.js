import Movie from '../models/movie.mode.js';


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
