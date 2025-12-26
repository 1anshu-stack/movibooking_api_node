import mongoose from 'mongoose'


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "booking"
    });
    console.log('Database connect successfully')
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}


export default connectDB;