import express from 'express';
import 'dotenv/config'

import MovieRoutes from './routes/movie.routes.js'


const app = express();
const port = process.env.PORT

// db connection
import connectDB from './config/db.js';
await connectDB();


// configure body-parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// invoking movie routes
MovieRoutes(app);

app.get('/home', (req, res) => {
  return res.json({
    message: "hello from server"
  })
})


app.listen( port || 4000, () => {
  console.log(`server run on port ${port}`)
})