import { signup } from "../controllers/user.controllers.js";


const routes = (app) => {
  app.post(
    '/mba/api/v1/auth/signup',
    signup
  )
}

export default routes; 