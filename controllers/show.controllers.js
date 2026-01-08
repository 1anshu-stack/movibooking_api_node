import { createShowfn } from "../services/show.service.js";
import { STATUS_CODE } from "../utils/constans.js";
import { errorResponseBody, successResponseBody } from "../utils/responseBody.js";


const createShow = async (req, res) => {
  try {
    const response = await createShowfn(req.body)
    successResponseBody.data = response;
    successResponseBody.message = "Successfully created the show";
    return res.status(STATUS_CODE.CREATED).json(successResponseBody)
  } catch (error) {
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}


export {
  createShow
}