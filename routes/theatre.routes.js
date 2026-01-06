import { 
  createTheatre, 
  deleteTheatre, 
  getTheatre, 
  getAllTheatre, 
  updateTheatre, 
  updateMoviesInTheatres, 
  getMoviesInATheatres ,
  checkMovie
} from "../controllers/theatre.controllers.js"




import { 
  validateTheatreCreateRequest, 
  validateUpdateMovies,
} from "../middleware/theatre.middleware.js"
import {
  isAuthenticated, 
  isAdminOrClient 
} from "../middleware/user.middleware.js"


const routes = (app) => {
  // routes->function->takes->express->app->object->as->parameter
  app.post(
    '/mba/api/v1/theatre',
    isAuthenticated,
    isAdminOrClient,
    validateTheatreCreateRequest,
    createTheatre
  )

  app.delete(
    '/mba/api/v1/theatre/:id',
    isAuthenticated,
    deleteTheatre
  )

  app.get(
    '/mba/api/v1/theatre/:id',
    getTheatre
  )

  app.get(
    '/mba/api/v1/theatre',
    getAllTheatre
  )

  app.put(
    '/mba/api/v1/theatre/:id',
    updateTheatre
  )

  app.patch(
    '/mba/api/v1/theatre/:id',
    updateTheatre
  )


  // movie and theatre combine routes
  app.patch(
    '/mba/api/v1/theatre/:id/movies',
    validateUpdateMovies, 
    updateMoviesInTheatres
  )

  app.get(
    '/mba/api/v1/theatre/:id/movies',
    getMoviesInATheatres
  )

  app.get(
    '/mba/api/v1/theatre/:theatreId/movies/:movieId',
    checkMovie
  )
}

export default routes;