import express from "express"
import cors from "cors"
import "dotenv/config";
// import dotenv from "dotenv"
// dotenv.config();        // Access environment variable
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/UserRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";




// App config
const app = express()     // Application object and manage server
const port = process.env.PORT || 4000          // dotenv -> environment variable
connectDB()   // connected with mongoDb

// middleware
app.use(express.json())  // convert json to js file and vice-verse.
app.use(cors())   // we can acces from backend any ip

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)



// API endpoints
app.get("/", (req, res) =>{     // "/" -> path
    res.send("API working!!")
})


app.listen(port, () => console.log("Server started on port : "+ port));  // Run application using this port number
