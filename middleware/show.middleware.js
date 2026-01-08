import { STATUS_CODE } from "../utils/constans.js"
import { errorResponseBody } from "../utils/responseBody.js"


import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;


const validateCreateShowRequest = async (req, res, next) => {
  // validate thetre id
  if(!req.body.theatreId){
    errorResponseBody.error = "No theatre provided";
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody);
  }
  if(!ObjectId.isValid(req.body.theatreId)){
    errorResponseBody.error = "Invalid theatre id";
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody);
  }

  // validate movie id
  if(!req.body.movieId){
    errorResponseBody.error = "No movie provided";
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody);
  }
  if(!ObjectId.isValid(req.body.movieId)){
    errorResponseBody.error = "Invalid movie id";
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody);
  }

  // validate timing 
  if(!req.body.timing){
    errorResponseBody.error = "No timing provided";
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody);
  }

  // validate noOfSeats 
  if(!req.body.noOfSeats){
    errorResponseBody.error = "No seat info provided";
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody);
  }

  // validate price
  if(!req.body.price){
    errorResponseBody.error = "No price info provided";
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody);
  }

  next()
}


const validateShowUpdateRequest = async (req, res, next) => {
  if(req.body.theatreId || req.body.movieId){
    errorResponseBody.error = 'We can not update theatre or movie for an already added show'
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody)
  }

  next();
}

export {
  validateCreateShowRequest,
  validateShowUpdateRequest
}