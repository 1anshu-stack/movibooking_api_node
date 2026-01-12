import { 
  createPaymentfn, 
  getPaymentByIdfn,
  getAllPaymentfn
} from "../services/payment.service.js";

import { 
  BOOKING_STATUS, 
  STATUS_CODE 
} from "../utils/constans.js";

import { 
  errorResponseBody, 
  successResponseBody 
} from "../utils/responseBody.js";


import User from "../models/user.model.js";
import Movie from "../models/movie.mode.js";
import Theatre from "../models/theatre.model.js";

import sendMail from "../services/email.service.js";

const create = async (req, res) => {
  try {
    const response = await createPaymentfn(req.body);
    
    if(response.status == BOOKING_STATUS.expired){
      errorResponseBody.error = 'The payment took more than 5 minutes to get processed, hence your booking got expired, please try again'
      errorResponseBody.data = response
      return res.status(STATUS_CODE.GONE).json(errorResponseBody);
    }
    if(response.status == BOOKING_STATUS.cancelled){
      errorResponseBody.error = 'The payment failed due to some reason, booking was not successfull, please try again'
      errorResponseBody.data = response
      return res.status(STATUS_CODE.PAYMENT_REQUIRED).json(errorResponseBody);
    }

    const user = await User.findById(response.userId);
    const movie = await Movie.findById(response.movieId);
    const theatre = await Theatre.findById(response.theatreId);
    if (!user || !movie || !theatre) {
      throw {
        err: "Invalid booking data. User/Movie/Theatre not found",
        code: STATUS_CODE.UNPROCESSABLE_ENTITY
      };
    }

    successResponseBody.data = response;
    successResponseBody.message = "Booking completed successfully"

    const subject = "Your booking is successfull";
    const content = `Your booking for ${movie.name} in ${theatre.name} for ${response.noOfSeats} seats on ${response.timing} is successful. Your booking id is ${response.id}`

    sendMail(subject, response.userId, content)
    // console.log("response", response, process.env.NOTI_SERVICE)
    return res.status(STATUS_CODE.OK).json(successResponseBody)
  }catch(error) {
    if(error.err){
      errorResponseBody.error = error.err
      return res.status(error.code).json(errorResponseBody)
    }

    errorResponseBody.error = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody)
  }
}


const getPaymentById = async (req, res) => {
  try {
    const response = await getPaymentByIdfn(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully get payment"

    return res.status(STATUS_CODE.OK).json(successResponseBody);
  } catch (error) {
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(error.code).json(successResponseBody);
    }
    errorResponseBody.error = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}


const getAllUserPayment = async (req, res) => {
  try {
    const response = await getAllPaymentfn(req.user);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched all the payment details"
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


export {
  create,
  getPaymentById,
  getAllUserPayment
}