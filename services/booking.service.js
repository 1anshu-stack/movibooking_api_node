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


export {
  createBooking
}