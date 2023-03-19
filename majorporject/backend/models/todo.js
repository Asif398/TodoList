const mongoose  = require("mongoose");

const todoSchema  = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
    type:String
    },
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      }
    
},{timestamps: true});
module.exports  = mongoose.model("Todo",todoSchema)