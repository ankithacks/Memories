import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import userRouter from './route/user.route.js'
import authRouter from './route/auth.route.js'
import cookieParser from 'cookie-parser'
import listingRouter from '../api/route/listing.route.js'
import path from 'path'
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err)
})
const app=express()

const __dirname=path.resolve()
app.use(express.json())
app.use(cookieParser())
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use('/api/listing', listingRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})


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