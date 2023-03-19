const mongoose  = require("mongoose");

const userSchema  = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
    type:String
    },
    phone:{
    type:Number
    },
    password:{
        type:String
    },
      role: {
        type: Number,
        default: 1,
        enum: [
          0,
          1,
          
        ],
      },
},{timestamps: true});
module.exports  = mongoose.model("User",userSchema)