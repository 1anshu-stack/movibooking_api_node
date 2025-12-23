import { createMovie, deleteMovie, getMovie} from "../controllers/movie.controllers.js";


const routes = (app) => {
  app.post(
    '/mba/api/v1/movies', 
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
}

export default routes;