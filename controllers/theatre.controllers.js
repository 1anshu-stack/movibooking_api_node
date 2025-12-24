import { successResponseBody, errorResponseBody } from "../utils/responseBody.js";


import {createTheatrefn} from "../services/theatre.service.js"


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


export {
  createTheatre
}