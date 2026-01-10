import { create, getPaymentById, getAllUserPayment } from "../controllers/payment.controllers.js"
import { isAdmin, isAdminOrClient, isAuthenticated } from "../middleware/user.middleware.js"
import { verifyPaymentCreateRequest } from "../middleware/payment.middleware.js"

const routes = (app) => {
  app.post(
    '/mba/api/v1/payments',
    isAuthenticated, 
    verifyPaymentCreateRequest,
    create
  )

  app.get(
    '/mba/api/v1/payments/:id',
    isAuthenticated, 
    getPaymentById
  )

  app.get(
    '/mba/api/v1/payments',
    isAuthenticated, 
    getAllUserPayment
  )
}

export default routes;