import { signup, signin, resetpassword, update } from "../controllers/user.controllers.js";
import {validateSignupRequest, validateSigninRequest, isAuthenticated} from "../middleware/user.middleware.js";

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

  app.patch(
    '/mba/api/v1/auth/resetpassword',
    isAuthenticated,
    resetpassword
  )

  app.patch(
    '/mba/api/v1/auth/user/:id',
    update
  )
}

export default routes; 