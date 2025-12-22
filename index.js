import express from 'express';
import 'dotenv/config'



const app = express();
const port = process.env.PORT

// db connection
import connectDB from './config/db.js';
await connectDB();



app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/home', (req, res) => {
  return res.json({
    message: "hello from server"
  })
})


app.listen( port || 4000, () => {
  console.log(`server run on port ${port}`)
})