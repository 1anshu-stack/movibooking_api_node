import { STATUS_CODE, USER_ROLE, BOOKING_STATUS } from "../utils/constans.js";
import { errorResponseBody } from "../utils/responseBody.js";
import { getTheatrefn } from "../services/theatre.service.js";
import { getUserById } from "../services/user.service.js";


import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;


const validateBookingCreateRequest = async (req, res, next) => {
  // validate the theatre id presence
  if(!req.body.theatreId){
    errorResponseBody.error = "No theatre id provided";
    return res.status(STATUS_CODE.NOT_FOUND).json(errorResponseBody);
  }

  // validate correct theatre id format
  if(!ObjectId.isValid(req.body.theatreId)){
    errorResponseBody.error = "Invalid theatreid provided"
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody)
  }

  // check theatre exist in a database
  const theatre = await getTheatrefn(req.body.theatreId);
  if(!theatre){
    errorResponseBody.error = "No theatre found for the given id";
    return res.status(STATUS_CODE.NOT_FOUND).json(errorResponseBody)
  }


  // validate the movie id presence
  if(!req.body.movieId){
    errorResponseBody.error = "No movie id provided";
    return res.status(STATUS_CODE.NOT_FOUND).json(errorResponseBody);
  }

  // validate correct movie id format
  if(!ObjectId.isValid(req.body.movieId)){
    errorResponseBody.error = "Invalid theatreid provided"
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody)
  }

  // validate if movie is running in the theatre or not
  const movieExists = theatre.movies.some(
    movieId => movieId.equals(req.body.movieId)
  );
  console.log("movieExists", movieExists)
  if(!movieExists){
    errorResponseBody.error = "Given movie is not available in the request theatre";
    return res.status(STATUS_CODE.NOT_FOUND).json(errorResponseBody)
  }

  // validate presence of timings
  if(!req.body.timing){
    errorResponseBody.error = "No movie timing passed";
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody)
  }

  //validate no of seats presence
  if(!req.body.noOfSeats){
    errorResponseBody.error = "No seats provided";
    return res.status(STATUS_CODE.BAD_REQUEST).json(errorResponseBody)
  }

  //request is correct
  next();
} 

const canChangeStatus = async (req, res, next) => {
  const user = await getUserById(req.user);
  if(user.userRole == USER_ROLE.customer && req.body.status && req.body.status != BOOKING_STATUS.cancelled){
    errorResponseBody.error = "You are not allowed to change the booking status";
    return res.status(STATUS_CODE.UNAUTHORISED).json(errorResponseBody);
  }

  next();
} 


export {
  validateBookingCreateRequest,
  canChangeStatus
}