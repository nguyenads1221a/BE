import express from "express";
const cors= require('cors')
const cookieParser = require('cookie-parser')
require ('dotenv').config()
const connectDB =require('./config/db')
const router = require ('./routes')
const mongoose = require('mongoose')


const app=express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)

const PORT = process.env.PORT || 8080

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("CONNECT SUCCESS MONGGODB!");
  })
  .catch((error) => {
    console.error("CONNECT FAIL MONGGODB!", error);
  });

  app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING! http://localhost:${PORT}`);
  });
