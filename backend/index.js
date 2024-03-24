const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();



app.use(cors());
app.use(express.json({ limit: '50mb' }));


// Add this to server.js
app.use('/',routes);

// configure cloudinary
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: 'dnnltdvkw',
  api_key: '534143582183246',
  api_secret: 'LYUvWzF2iMsaVrxKBzUBAC54kSU'
});

// Log the configuration
console.log(cloudinary.config());


// connect mongodb
mongoose.connect(`${process.env.DATABASE_URI}${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
     // Set the write concern mode here
  writeConcern: {
    w: 'majority'
  }
}).then(()=>{
    console.log("DB connected successfully");
}).catch((err)=>console.log("error:", err));


// sever listen

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});