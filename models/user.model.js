import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


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
    default: "CUSTOMER"
  },
  userStatus: {
    type: String,
    required: true,
    default: "APPROVED"
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
