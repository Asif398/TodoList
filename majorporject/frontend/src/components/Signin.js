import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 
  useEffect(()=>{
   let auth= localStorage.getItem("user")
   if(auth){
    navigate("/")

   }
  },[])

 const handleLogin= async()=>{
    console.log(email,password);
    let result =await fetch("http://localhost:8000/api/signin",{
         method:'post',
         body: JSON.stringify({email,password}) ,
         headers:{
            'Content-Type':'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
         }
    })
    result =await result.json()

        if(result.user){
       localStorage.setItem("user",JSON.stringify(result))
       localStorage.setItem("token",JSON.stringify(result.auth))


            navigate("/");
        }else{
            alert("please correct details");

        }
    
    // console.log(result);
 }  


  
  return (
    <div className="register">
      <h1>Signgin</h1>
     

      <input
        className="inputBox "
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />

      <input
        className="inputBox "
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button className="button" onClick={handleLogin} type="button">
        Submit
      </button>
    </div>
  );
};

export default Signin;
