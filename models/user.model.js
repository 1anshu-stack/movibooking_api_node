import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { USER_ROLE, USER_STATUS } from '../utils/constans.js';


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
  if (!this.isModified('password')) return;
  // console.log(this);
  const hash = await bcrypt.hash(this.password, 10);
  // console.log(hash);
  this.password = hash;
  // console.log(this);
})


/**
 * This is going to be an instance method for user, to compare a password with the stored encrypted password
 * @param plainPassword -> Input password given by the user in sign in request 
 * @returns -> boolena denoting whether passwords same or not.
 */
userSchema.methods.isValidPassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};


const User = mongoose.model('User', userSchema)
export default User;
