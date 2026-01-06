import mongoose from "mongoose";

import { BOOKING_STATUS } from "../utils/constans.js";


const booking = new mongoose.Schema({
  theatreId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Theatre'
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Movie'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  timing: {
    type: String,
    required: true
  },
  noOfSeats: {
    type: Number,
    required: true
  },
  totalCost: {
    type: Number
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: [BOOKING_STATUS.processing, BOOKING_STATUS.cancelled, BOOKING_STATUS.successfull],
      message: "Invalid booking status"
    },
    default: BOOKING_STATUS.processing
  }
}, {
  timestamps: true
})


const Booking = new mongoose.model('Booking', booking);
export default Booking;