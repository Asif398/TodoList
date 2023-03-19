require("dotenv").config();
const mongoose =require ("mongoose");
const express = require("express");
const cors = require("cors")
const app = express();

const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo")

app.use(express.json());
app.use(cors());
//mongodb connect
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true
}).then(()=>{
    console.log('DB CONNECTED')
}).catch((err)=>{
    console.log(err)
})

//api routes 
app.use("/api",userRoutes)
app.use("/api",todoRoutes);

const PORT = 8000;
app.listen(PORT,()=>{
console.log(`Server is up and running ${PORT}`);
})