import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";
import { STATUS_CODE, BOOKING_STATUS, PAYMENT_STATUS, USER_ROLE } from "../utils/constans.js";
import User from "../models/user.model.js";


const createPaymentfn = async (data) => {
  try {
    const booking = await Booking.findById(data.bookingId);
    if(booking.status == BOOKING_STATUS.successfull){
      throw {
        err: "Booking already done, cannot make a new payment against it",
        code: STATUS_CODE.FORBIDDEN
      }
    }
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


const getPaymentByIdfn = async (id) => {
  try {
    // use populate bcz i also want to show the detail of booking.
    const response = await Payment.findById(id).populate('bookingId');
    console.log("response", response)
    if(!response){
      throw {
        err: 'No payment found for this id',
        code: STATUS_CODE.NOT_FOUND
      }
    }

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


const getAllPaymentfn = async (userId) => {
  try{
    const user = await User.findById(userId)
    let filter = {};
    if(user.userRole != USER_ROLE.admin){
      filter["userId"] = user.id;
    }
    // console.log("filter", filter)

    const bookings = await Booking.find(filter).select({_id:1})
    // console.log("bookings", bookings);

    const payments = await Payment.find({bookingId: {$in:bookings}})
    // console.log("payments", payments);
    return payments;
  }catch(error){
    console.log("getAllUserPaymentfn", error);
    throw error;
  }
}


export {
  createPaymentfn,
  getPaymentByIdfn,
  getAllPaymentfn
}