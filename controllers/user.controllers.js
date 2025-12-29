import User from "../models/user.model.js";
import { createUserfn, getUserByEmail } from "../services/user.service.js";
import {successResponseBody, errorResponseBody} from "../utils/responseBody.js"


const signup = async (req, res) => {
  try {
    const response = await createUserfn(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully register a user";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    return res.status(500).json(errorResponseBody)
  }
}


const signin = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await getUserByEmail(email);
    console.log("user", user);

    const isValidPassword = await user.isValidPassword(password);
    console.log("isValidPassword", isValidPassword);

    if(!isValidPassword){
      throw {err: "Invalid password for the given email", code: 401}
    }

    successResponseBody.message = "Successfully logged in";
    successResponseBody.data = {
      email: user.email,
      role: user.role,
      status: user.userStatus,
      token: ''
    }
    return res.status(201).json(successResponseBody);
  } catch (error) {
    console.log("error", error)
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error.err;
    return res.status(500).json(errorResponseBody);
  }
}

export {
  signup,
  signin
}