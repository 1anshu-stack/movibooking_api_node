import { successResponseBody, errorResponseBody } from "../utils/responseBody.js"
import { STATUS_CODE } from "../utils/constans.js";
import { createBooking } from "../services/booking.service.js";



const create = async (req, res) => {
  try {
    // protected with a authenticated route so, it have the access to req.user;
    let userId = req.user;
    const response = await createBooking({...req.body, userId: userId});

    successResponseBody.message = "Successfully created a booking";
    successResponseBody.data = response;
    return res.status(STATUS_CODE.CREATED).json(successResponseBody);
  } catch (error) {
    console.log(error)
    if(error.err){
      errorResponseBody.error = error.err;
      return res.status(error.code).json(errorResponseBody)
    }
    errorResponseBody.err = error;
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json(successResponseBody);
  }
}


export {
  create
}