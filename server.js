import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';


dotenv.config();
const app=express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000 
})
.then(() => console.log("✅ MongoDB successfully connected"))
.catch(err => console.log("❌ MongoDB not connected:", err.message));


const PORT = process.env.PORT || 5000;
app.use("/users", userRoutes);
app.listen(PORT,()=>{
    console.log('server is running on port',PORT);
});
