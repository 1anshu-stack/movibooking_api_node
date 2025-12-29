import { signup } from "../controllers/user.controllers.js";
import validateSignupRequest from "../middleware/user.middleware.js";

const routes = (app) => {
  app.post(
    '/mba/api/v1/auth/signup',
    validateSignupRequest,
    signup
  )
}

export default routes; 