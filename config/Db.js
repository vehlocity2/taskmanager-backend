import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async ()=>{
    console.log("Connecting to database...", process.env.MONGO_URL)
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connection error:", error)
    }
}

export default connectDB