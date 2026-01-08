import { 
  createShowfn, 
  deleteShowfn, 
  getShowsfn, 
  updateShowfn
} from "../services/show.service.js";
import { 
  STATUS_CODE 
} from "../utils/constans.js";
import { 
  errorResponseBody, 
  successResponseBody 
} from "../utils/responseBody.js";


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


const getShow = async (req, res) => {
  try {
    // console.log(req.query);
    const response = await getShowsfn(req.query)

    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetch the moves shows"
    return res.status(STATUS_CODE.OK).json(successResponseBody);
  } catch (error) {
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}


const deleteShow = async (req, res) => {
  try {
    const response = await deleteShowfn(req.body.id);

    successResponseBody.data = response;
    successResponseBody.message = "Successfully delete the show"
    return res.status(STATUS_CODE.OK).json(successResponseBody)
  } catch (error) {
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.error = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}


const updateShow = async (req, res) => {
  try {
    const response = await updateShowfn(req.params.id, req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully updated the show";
    return res.status(STATUS_CODE.OK).json(successResponseBody);
  } catch (error) {
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(error.code).json(errorResponseBody)
    }
    errorResponseBody.error = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}

export {
  createShow,
  getShow,
  deleteShow,
  updateShow
}