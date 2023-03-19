const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require('../models/user');

const verifiedToken = (req,res,next)=>{
let token = req.headers.authorization;
if(token){
    token = token.split(" ")[1];
    jwt.verify(token,process.env.SECRET,(err,payload)=>{
        if(err){
        return res.status(401).json({ error: "you must be logged in" });
        }
        const {_id} = payload;
        User.findById(_id).then((userdata)=>{
            req.user = userdata;
            next();
        })
    })

}else{
    return res.status(401).json({ error: "unauthorized User" });
}

}
//admin
const isAdmin = async(req,res,next)=>{
try {
    const user = await User.findById(req.user._id);// tkon check login
    console.log("hii",user);
    if(user.role !== 0){
    return res.status(401).json({ error: " You are not a admin" });
 
    }else{
        next();
    }
} catch (error) {
    return res.status(500).json({ error: "Something wnet wrong" });
    
}
}


module.exports = {verifiedToken,isAdmin};