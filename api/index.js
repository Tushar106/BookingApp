import * as dotenv from 'dotenv' 
dotenv.config()

import express from 'express'
const app=express();
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.js'
import  usersRouter from'./routes/users.js'
import  roomsRouter from './routes/rooms.js'
import  hotelsRouter from './routes/hotels.js'
import cors from "cors";


const connect=async ()=>{
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO)
        console.log("connect")
    }
    catch(error){
        throw error
    }
}


mongoose.connection.on("disconnected",()=>{
    console.log("mongoDb Disconnect")
})
mongoose.connection.on("connected",()=>{
    console.log("mongoDb is connected")
})

app.get("/",(req,res)=>{
    res.send("hello")
})
app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth",authRouter)
app.use("/api/hotels",hotelsRouter)
app.use("/api/rooms",roomsRouter)
app.use("/api/users",usersRouter)


app.use((err,req,res,next)=>{
    const errorStatus=err.status||500;
    const errorMessage=err.message||"something went wrong"
    if(err.code==11000){
        return res.status(errorStatus).json(err.keyValue);
    }
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        meassage:errorMessage,
        stack:err.stack 
    })
})

app.listen(8800,()=>{
    connect();
    console.log("Server 8800 started")
})