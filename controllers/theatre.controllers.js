import { successResponseBody, errorResponseBody } from "../utils/responseBody.js";


import { 
  createTheatrefn, 
  deleteTheatrefn,
  getTheatrefn,
  getAllTheatrefn
} from "../services/theatre.service.js"


const createTheatre = async (req, res) => {
  try{
    const response = await createTheatrefn(req.body)
    console.log("response", response);
    if(response.err){
      errorResponseBody.error = response.err
      errorResponseBody.message = 'validation failed on few parameters of the request body'
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response
    successResponseBody.message = "Successfully created the theatre"
    return res.status(200).json(successResponseBody)
  } catch(error){
    console.log(error);
    return res.status(500).json(errorResponseBody)
  }
}


const deleteTheatre = async (req, res) => {
  try {
    console.log(req.params.id)
    console.log(req.params)
    const response = await deleteTheatrefn(req.params.id);

    if(response.err){
      errorResponseBody.error = response.err
      return res.status(response.code).json(errorResponseBody)
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre information delete successfully"
    return res.status(202).json(successResponseBody)    
  } catch (error) {
    console.log(error)
    errorResponseBody.error = error
    return res.status(500).json(errorResponseBody);
  }
}


const getTheatre = async (req, res) => {
  try {
    const response = await getTheatrefn(req.params.id);
    if(response.err){
      errorResponseBody.error = response.err;
      return res.status(response.code).json(errorResponseBody)
    }

    successResponseBody.data = response;
    successResponseBody.message = "successfully fetched the data of the theatre"
    return res.status(201).json(successResponseBody)
  } catch (error) {
    console.log(error)
    errorResponseBody.error = error
    return res.status(500).json(errorResponseBody)
  }
}


const getAllTheatre = async (req, res) => {
  try {
    const response = await getAllTheatrefn();
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched all the theatres"
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.error = error;
    return res.status(500).json(errorResponseBody);
  }
}


export {
  createTheatre,
  deleteTheatre,
  getTheatre,
  getAllTheatre
}
