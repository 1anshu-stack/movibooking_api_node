import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { USER_ROLE, USER_STATUS } from '../utils/constans';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email'],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  userRole: {
    type: String,
    required: true,
    enum: {
     values: [USER_ROLE.customer, USER_ROLE.admin, USER_ROLE.client],
     message: "Invalid user role given" 
    },
    default: USER_ROLE.customer,
  },
  userStatus: {
    type: String,
    required: true,
    enum: {
      values: [USER_STATUS.approved, USER_STATUS.pending, USER_STATUS.rejected],
      message: "Invalid status for user given"
    },
    default: USER_STATUS.approved
  }
}, {timestamps: true})

userSchema.pre('save', async function () {
  console.log(this);
  const hash = await bcrypt.hash(this.password, 10);
  console.log(hash);
  this.password = hash;
  console.log(this);
})


const User = mongoose.model('User', userSchema)
export default User;
