import mongoose, { mongo } from "mongoose";


const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  },
  description: String,
  city: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  address: String,
  owner: {
    
  }
}, { timestamps: true })


const Theatre = mongoose.model('Theatre', theatreSchema)

export default Theatre;