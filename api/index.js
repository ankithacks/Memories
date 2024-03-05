import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import userRouter from './route/user.route.js'
import authRouter from './route/auth.route.js'
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err)
})
const app=express()
app.use(express.json())

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use((err, req,res, next)=>{
    const statusCode=err.statuscode || 500;
    const message=err.message || 'internal Server error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})



app.listen(3000, ()=>{
    console.log(`server running on port 3000`)
})