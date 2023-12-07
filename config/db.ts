import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const connectDB = async () => {
   try {
    const db = await mongoose.connect(process.env.MONGO_URI!)

    const url = `${db.connection.host}: ${db.connection.port}`

    console.log(`Connected to ${url}`)

   } catch (error:any) {
    console.log(`Error connecting to database: ${error.message}`)
    process.exit(1);
   } 
}

export default connectDB