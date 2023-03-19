const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async(req,res)=>{
    try {
        const {name,email,phone,password} = req.body;
        if(!name || !email || !phone || !password)
        return res.status(422).json({error:"Plz include all the fields",status:"failed"});

        const userExist = await User.findOne({email:email});
        if(userExist)
        return res.status(400).json({error:"User already registerd",status:"failed"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const user = new User({
            name,
            email,
            phone,
            password:hashedPassword
        });

        let result = await user.save();

        result.password = undefined

        if(!result)
        return res.status(400).json({error:"Unable to registered user",status:"failed"});
        return res.status(200).json({user:result,message:"successfully user registered ",status:"success"});

    } catch (err) {
        return res.status(500).json({err:err.message,error:"Somethings went wrong",status:"failed"})
    }
}



exports.signin=async(req,res)=>{
   try {
    const {email,password} = req.body;
    if(!email || !password){
     return   res.status(400).json({message:"please required all fields",status:"failed"})
    }

    const userExist =await User.findOne({email})
    if(!userExist){
      return  res.status(422).json({message:"please register and then signin",status:"failed"})
    }

   const comparepassword = await bcrypt.compare(req.body.password,userExist.password);

   if(!comparepassword){
    return res.status(400).json({message:"Invalid credential ",status:"failed"})
   }
   userExist.password = undefined;
const token = jwt.sign({_id:userExist._id}, process.env.SECRET,{expiresIn:"2 days"})

   return res.status(200).json({user:userExist,auth:token, message:"Successfuly Signin ",status:"success"})

    
   } catch (error) {
    return res.status(500).json({err:err.message,error:"Somethings went wrong",status:"failed"})
    
   }
}


//update profile
 exports.updateProfile = async (req, res) => {
    try {
      const { name,password, phone} = req.body;
      const user = await User.findById(req.user._id);
     console.log("hii",user);
     
     if (password && password.length < 6) {
        return res.json({
          error: "Password is required and should be min 6 characters long",
        });
      }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
      const updated = await User.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone : phone|| user.phone,
        },
        { new: true }
   );
   
      updated.password = undefined;
  
      res.json(updated);
    } catch (err) {
      console.log(err);
    }
  };

  exports.allProfile = async (req, res) => {
    try {
      const user = await User.find()
      
      if (!user)
        return res
          .status(400)
          .json({ error: "unable to get the profile", status: "failed" });
      return res.status(200).json({
        users: user,
        message: "All the  user is here",
        status: "success",
      });
    } catch (err) {
      return res.status(500).json({
        err: err.message,
        error: "Somethings went wrong",
        status: "failed",
      });
    }
  };
  
  exports.singleProfile =async(req,res)=>{
    try {
       let user =await User.findOne({_id:req.params.id}) 
       if(user){
        return res.status(200).json({users:user,message:" single user are  here",status:"success"})
       }else{
        return res.status(400).json({message:"user was not found "})
       }
    } catch (err) {
    return res.status(500).json({err:err.message,message:"something went wrong",status:"failed"})
        
    }
}

