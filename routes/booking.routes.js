import { create, update } from "../controllers/booking.controllers.js"

import { isAuthenticated } from "../middleware/user.middleware.js";

import { validateBookingCreateRequest, canChangeStatus } from "../middleware/booking.middleware.js";

const routes = (app) => {

  // create booking
  app.post(
    '/mba/api/v1/booking',
    isAuthenticated,
    validateBookingCreateRequest,
    create
  )

  // update
  app.patch(
    '/mba/api/v1/booking/:id',
    isAuthenticated,
    canChangeStatus,
    update
  )
}

export default routes;