import { createMovie } from "../controllers/movie.controllers.js";


const routes = (app) => {
  app.post('/mba/api/v1/movies', createMovie)
}

export default routes;