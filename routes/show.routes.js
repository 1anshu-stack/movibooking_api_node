import { createShow, getShow } from "../controllers/show.controllers.js";
import { validateCreateShowRequest } from "../middleware/show.middleware.js";
import { isAuthenticated, isAdminOrClient } from "../middleware/user.middleware.js";


const routes = (app) => {
  app.post(
    '/mba/api/v1/shows',
    isAuthenticated,
    isAdminOrClient,
    validateCreateShowRequest,
    createShow
  )

  app.get(
    '/mba/api/v1/shows',
    getShow
  )
}

export default routes;