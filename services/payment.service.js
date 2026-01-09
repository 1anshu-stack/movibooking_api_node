import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";
import { STATUS_CODE, BOOKING_STATUS, PAYMENT_STATUS } from "../utils/constans.js";


const createPaymentfn = async (data) => {
  try {
    const booking = await Booking.findById(data.bookingId);
    if(!booking){
      throw {
        err: 'No booking found',
        code: STATUS_CODE.NOT_FOUND
      }
    }
    let bookingTime = booking.createdAt;
    let currentTime = Date.now();

    // calculate how many min are remaining
    let minutes = Math.floor(((currentTime - bookingTime)/1000)/60)
    if(minutes > 5){
      booking.status = BOOKING_STATUS.expired;
      await booking.save();
      return booking;
    }

    const payment = await Payment.create({
      bookingId: data.bookingId,
      amount: data.amount
    });
    if(payment.amount != booking.totalCost){
      payment.status = PAYMENT_STATUS.failed
    }
    if(!payment || payment.status == PAYMENT_STATUS.failed){
      booking.status = BOOKING_STATUS.cancelled;
      await booking.save();
      await payment.save();
      return booking;
    }

    payment.status = PAYMENT_STATUS.success;
    booking.status = BOOKING_STATUS.successfull;
    await booking.save();
    await payment.save();
    return booking;

  } catch (error) {
    console.log("error in servie", error.errors);
    throw error;
  }
}


export {
  createPaymentfn
}