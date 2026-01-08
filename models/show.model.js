import mongoose from "mongoose";
// import Theatre from "./theatre.model";

const showSchema = new mongoose.Schema({
  theatreId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  timing: {
    type: String,
    required: true
  },
  noOfSeats: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  format: {
    type: String
  }
}, {timestamps: true})

const Show = mongoose.Model("Show", showSchema)
export default Show;