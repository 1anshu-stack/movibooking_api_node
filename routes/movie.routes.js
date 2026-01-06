import { 
  createMovie, 
  deleteMovie, 
  getMovie, 
  updateMovie, 
  getMovies 
} from "../controllers/movie.controllers.js";

import { 
  validateMovieCreateRequest 
} from "../middleware/movie.middleware.js"

import {
  isAuthenticated,
  isAdminOrClient
} from "../middleware/user.middleware.js"

const routes = (app) => {
  // routes->function->takes->express->app->object->as->parameter
  app.post(
    '/mba/api/v1/movies', 
    isAuthenticated,
    isAdminOrClient,
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