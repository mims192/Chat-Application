import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from  './routes/authUser.js'
import messageRouter from './routes/messageRoute.js'
import cookieParser from 'cookie-parser';
import userRouter from './routes/userroute.js'
import cors from 'cors'

const PORT=process.env.PORT||5000;

import {app , server} from './Socket/socket.js'

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }));


dotenv.config();
app.use(express.json());
app.use(cookieParser())

mongoose.connect(process.env.URL,{})
.then(()=>{ 
    console.log("Connected to Mongodb");
})
.catch((err)=>{ 
    console.error("Error connecting to MongoDB",err.message);
});
 


app.use('/api/auth',authRouter)  
app.use('/api/message',messageRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{   
    console.log(req);
    res.send("Hello")
    
    
})
server.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})