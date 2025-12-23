import { createMovie, deleteMovie} from "../controllers/movie.controllers.js";


const routes = (app) => {
  app.post(
    '/mba/api/v1/movies', 
    createMovie
  )

  app.delete(
    '/mba/api/v1/movies/:id',
    deleteMovie
  )
}

export default routes;