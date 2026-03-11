import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from "cookie-parser"

dotenv.config()
const port = process.env.PORT 

import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

console.log("Connecting to database...", process.env.MONGO_URL)

const app = express()


app.use(cookieParser())


mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("Database connected successfully")
}).catch((err)=>{
  console.error("Database connection error:", err)
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to Atlas')
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected - retrying...')
})
mongoose.connection.on('error', (err) => {
  console.log('Mongoose error:', err)
})

app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:3000","https://taskmanager-frontend-chi-six.vercel.app"], 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

import AuthRoutes from './Routes/AuthRoutes.js'
import TaskRoutes from "./Routes/TaskRoutes.js" 



app.use("/api/v2/auths", AuthRoutes )
app.use("/api/v2/tasks", TaskRoutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
