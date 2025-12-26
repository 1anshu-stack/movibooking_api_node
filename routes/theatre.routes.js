import { createTheatre, deleteTheatre, getTheatre, getAllTheatre, updateMoviesInTheatres } from "../controllers/theatre.controllers.js"
import { validateTheatreCreateRequest, validateUpdateMovies } from "../middleware/theatre.middleware.js"


const routes = (app) => {
  // routes->function->takes->express->app->object->as->parameter
  app.post(
    '/mba/api/v1/theatre',
    validateTheatreCreateRequest,
    createTheatre
  )

  app.delete(
    '/mba/api/v1/theatre/:id',
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

  app.patch(
    '/mba/api/v1/theatre/:id/movies',
    validateUpdateMovies, 
    updateMoviesInTheatres
  )
}

export default routes;