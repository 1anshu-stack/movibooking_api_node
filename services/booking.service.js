import Booking from "../models/booking.model.js";
import { STATUS_CODE } from "../utils/constans.js";


const createBooking = async (data) => {
  try {
    // console.log("data", data)
    const response = await Booking.create(data);
    console.log("response:", response);
    return response;
  } catch (error) {
    if(error.name == 'ValidationError'){
      let err = {};
      Object.keys(error.errors).forEach(key => {
        err[key] = error.errors[key].message;
      })
      throw {
        err: err,
        code: STATUS_CODE.UNPROCESSABLE_ENTITY
      }
    }
  }
}


const updateBookingfn = async (id, data) => {
  // console.log("id and data:",id, data)
  try {
    const response = await Booking.findByIdAndUpdate(id, data, {new: true, runValidators: true})
    if(!response){
      throw {
        err: "No booking found for the given id",
        code: STATUS_CODE.NOT_FOUND 
      }
    }
    return response;
  } catch (error) {
    if(error.name == "ValidationError"){
      let err = {}
      Object.keys(error.errors).forEach(key => {
        err[key] = error.errors[key].message
      })
      throw {
        err: err,
        code: STATUS_CODE.UNPROCESSABLE_ENTITY
      }
    }
    console.log(error)
    throw error;
  }
}


const getBookingsfn = async (data) => {
  try {
    const response = await Booking.find({
      userId: data.userId
    });
    return response;
  }catch (error){
    throw error;
  }
}

const getAllBookingsfn = async (data) => {
  try {
    const response = await Booking.find();
    return response;
  }catch (error){
    throw error;
  }
}


const getBookingByIdfn = async (id, userId) => {
  try{
    const response = await Booking.findById(id);
    if(!response){
      throw {
        err: "No booking records found for the id",
        code: STATUS_CODE.NOT_FOUND
      }
    }

    if(!response.userId != userId){
      throw {
        err: "Not able to access the booking",
        code: STATUS_CODE.NOT_FOUND
      }
    }
  }catch(error){
    console.log(error)
    throw error;
  }
}

export {
  createBooking,
  updateBookingfn,
  getBookingsfn,
  getAllBookingsfn,
  getBookingByIdfn
}