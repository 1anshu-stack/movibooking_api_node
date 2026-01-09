import { STATUS_CODE } from "../utils/constans.js";
import { errorResponseBody } from "../utils/responseBody.js";

import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const verifyPaymentCreateRequest = async (req, res, next) => {
  // validate booking id presence
  if(!req.body.bookingId){
    errorResponseBody.error = "No booking id received";
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody)
  }

  if(!ObjectId.isValid(req.body.bookingId)){
    errorResponseBody.error = "Invalid booking id";
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody)
  }

  if(!req.body.amount){
    errorResponseBody.error = "No amount set";
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody)
  }

  next();
}

export {
  verifyPaymentCreateRequest
}