import { createPaymentfn } from "../services/payment.service.js";
import { BOOKING_STATUS, STATUS_CODE } from "../utils/constans.js";
import { errorResponseBody, successResponseBody } from "../utils/responseBody.js";


const create = async (req, res) => {
  try {
    const response = await createPaymentfn(req.body);
    // console.log("response", response)
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

    successResponseBody.data = response;
    successResponseBody.message = "Booking completed successfully"
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


export {
  create
}