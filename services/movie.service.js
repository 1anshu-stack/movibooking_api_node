import Movie from '../models/movie.mode.js';


const createMovieFn = async (data) => {
  const movie = await Movie.create(data);
  return movie;
}


const deleteMovieFn = async (id) => {
  const movie = await Movie.findByIdAndDelete(id)
  return movie; 
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


export { getMovieById, createMovieFn, deleteMovieFn };
