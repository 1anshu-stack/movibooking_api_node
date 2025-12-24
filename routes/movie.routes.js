import { createMovie, deleteMovie, getMovie, updateMovie, getMovies } from "../controllers/movie.controllers.js";
import { validateMovieCreateRequest } from "../middleware/movie.middleware.js"


const routes = (app) => {
  app.post(
    '/mba/api/v1/movies', 
    validateMovieCreateRequest,
    createMovie
  )

  app.delete(
    '/mba/api/v1/movies/:id',
    deleteMovie
  )

  app.get(
    '/mba/api/v1/movies/:id',
    getMovie
  )

  app.put(
    '/mba/api/v1/movies/:id',
    updateMovie
  )

  app.patch(
    '/mba/api/v1/movies/:id',
    updateMovie
  )

  // all the movies
  app.get(
    '/mba/api/v1/movies',
    getMovies
  )
}

export default routes;