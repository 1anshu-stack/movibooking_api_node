import { createTheatre, deleteTheatre } from "../controllers/theatre.controllers.js"
import { validateTheatreCreateRequest } from "../middleware/theatre.middleware.js"


const routes = (app) => {
  app.post(
    '/mba/api/v1/theatre',
    validateTheatreCreateRequest,
    createTheatre
  )

  app.delete(
    '/mba/api/v1/theatre/:id',
    deleteTheatre
  )
}

export default routes;