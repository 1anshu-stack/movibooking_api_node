import { createShow, getShow, deleteShow, updateShow } from "../controllers/show.controllers.js";
import { validateCreateShowRequest, validateShowUpdateRequest } from "../middleware/show.middleware.js";
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

  app.delete(
    '/mba/api/v1/shows',
    isAuthenticated,
    isAdminOrClient,
    deleteShow
  )

  app.patch(
    '/mba/api/v1/shows/:id',
    isAuthenticated,
    isAdminOrClient,
    validateShowUpdateRequest,
    updateShow
  )
}

export default routes;