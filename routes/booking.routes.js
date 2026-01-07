import {create} from "../controllers/booking.controllers.js"

import { isAuthenticated } from "../middleware/user.middleware.js";

import { validateBookingCreateRequest } from "../middleware/booking.middleware.js";

const routes = (app) => {
  app.post(
    '/mba/api/v1/booking',
    isAuthenticated,
    validateBookingCreateRequest,
    create
  )
}

export default routes;