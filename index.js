import express from 'express';
import 'dotenv/config'

import MovieRoutes from './routes/movie.routes.js'
import TheatreRouter from "./routes/theatre.routes.js"
import AuthRouter from "./routes/user.routes.js"
import BookeingRouter from "./routes/booking.routes.js"
import ShowRoutes from "./routes/show.routes.js"


const app = express();
const port = process.env.PORT

// db connection
import connectDB from './config/db.js';
import mongoose from 'mongoose';
await connectDB();


// configure body-parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// mongoose debug
mongoose.set('debug', true);

// invoking movie routes
MovieRoutes(app);
TheatreRouter(app);
AuthRouter(app);
BookeingRouter(app);
ShowRoutes(app);


app.listen( port || 4000, () => {
  console.log(`server run on port ${port}`)
})
