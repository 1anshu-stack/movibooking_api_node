import { createUserfn } from "../services/user.service.js";
import {successResponseBody, errorResponseBody} from "../utils/responseBody.js"


const signup = async (req, res) => {
  try {
    const response = await createUserfn(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully register a user";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    if(error.err){
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    return res.status(500).json(errorResponseBody)
  }
}


export {
  signup
}