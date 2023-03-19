import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
    useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/')
    }
    })


  const collectdata = async () => {
    if(!name || !email ||!phone || !password){
      alert("please include all the fields")
      return false
    }
    console.log(name, email,phone, password);
    let result = await fetch("http://localhost:8000/api/signup", {
      method: "post",
      body: JSON.stringify({ name, email,phone, password }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    result = await result.json();
    // result = JSON.stringify(result)
    console.log(result);
   if(result.status === "success"){
        navigate("/signin")
   }
    
  
  };
  return (
   <div className="container m-30 mb-10 w-30"> 

<div className="register">
      <h1 >Register</h1>
     <div className="mb-3">
     <input
        className="inputBox form-control"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter a name"
      />
     </div>

      <input
        className="inputBox form-control"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />

     <input
        className="inputBox form-control"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter phone"
      /> 

      <input
        className="inputBox form-control"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button className="button btn btn-primary" onClick={collectdata} type="button">
        Submit
      </button>
    </div>

   </div>
  );
};

export default Signup;
