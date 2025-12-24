import { createTheatre } from "../controllers/theatre.controllers.js"


const routes = (app) => {
  app.post(
    '/mba/api/v1/theatre',
    createTheatre
  )
}

export default routes