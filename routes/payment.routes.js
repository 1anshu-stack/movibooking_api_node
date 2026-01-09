import { create } from "../controllers/payment.controllers.js"
import { isAuthenticated } from "../middleware/user.middleware.js"
import { verifyPaymentCreateRequest } from "../middleware/payment.middleware.js"

const routes = (app) => {
  app.post(
    '/mba/api/v1/payments',
    isAuthenticated, 
    verifyPaymentCreateRequest,
    create
  )
}

export default routes;