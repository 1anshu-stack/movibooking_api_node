import { signup, signin, resetpassword } from "../controllers/user.controllers.js";
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
}

export default routes; 