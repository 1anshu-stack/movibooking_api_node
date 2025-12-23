import mongoose from 'mongoose'
import Movie from '../models/movie.mode.js';


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "booking"
    });

    // await Movie.create({
    //   name: "Bacchan Pandey",
    //   description: "Comedy masala movie",
    //   casts: ["Akshay kumar", "Kriti Sanon"],
    //   director: "Farhad Samji",
    //   trailerUrl: "http://bacchanpandey/trailers/1",
    //   language: "Hindi",
    //   releaseDate: "18-03-2022",
    //   releaseStatus: 'RELEASED'
    // });
    console.log('Database connect successfully')
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}


export default connectDB;