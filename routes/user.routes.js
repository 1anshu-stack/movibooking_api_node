import { signup, signin } from "../controllers/user.controllers.js";
import {validateSignupRequest, validateSigninRequest} from "../middleware/user.middleware.js";

const routes = (app) => {
  app.post(
    '/mba/api/v1/auth/signup',
    validateSignupRequest,
    signup
  )

  app.post(
    '/mba/api/v1/auth/singin',
    validateSigninRequest,
    signin
  )
}

export default routes; 