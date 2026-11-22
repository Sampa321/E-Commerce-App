import mongoose from "mongoose";


const connectDB = async () => {
    // mongoose.connection.on('connected', () =>{
    //     console.log("DB Connected");
    // })
    await mongoose.connect(process.env.MONGODB_URL, {dbName : "E-Commerce-App"})    // await -> waiting for connection
}

export default connectDB;


