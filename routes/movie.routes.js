import { createMovie, deleteMovie, getMovie, updateMovie} from "../controllers/movie.controllers.js";


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

  app.put(
    '/mba/api/v1/movies/:id',
    updateMovie
  )

  app.patch(
    '/mba/api/v1/movies/:id',
    updateMovie
  )
}

export default routes;