import { create, update, getBookings, getAllBookings, getBookingById } from "../controllers/booking.controllers.js"

import { isAdmin, isAuthenticated } from "../middleware/user.middleware.js";

import { validateBookingCreateRequest, canChangeStatus } from "../middleware/booking.middleware.js";

const routes = (app) => {

  // create booking
  app.post(
    '/mba/api/v1/bookings',
    isAuthenticated,
    validateBookingCreateRequest,
    create
  )

  // update
  app.patch(
    '/mba/api/v1/bookings/:id',
    isAuthenticated,
    canChangeStatus,
    update
  )

  app.get(
    '/mba/api/v1/bookings',
    isAuthenticated,
    isAdmin,
    getBookings
  )

  app.get(
    '/mba/api/v1/bookings/all',
    getAllBookings
  )

  app.get(
    '/mba/api/v1/bookings/:id',
    isAuthenticated,
    getBookingById
  )
}

export default routes;