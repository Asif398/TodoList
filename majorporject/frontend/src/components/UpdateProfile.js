import React, { useEffect, useState } from "react";
// import { useParams } from 'react-router-dom';
const UpdateProfile = (item) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  // const params  = useParams()
  let x = JSON.parse(localStorage.getItem("user"))
  x= x.user._id;
  console.log(x,"asif");
  
   useEffect(()=>{
    getSingleUser()
   },[])

  const getSingleUser =async ()=>{
    let result = await fetch(`http://localhost:8000/api/singleProfile/user/${x}`,{
        
        headers:{
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`

        }
    })
    result = await result.json();
    // result = result.result;
    console.log(result,"raza");
    setName(result.users.name);
    setPhone(result.users.phone);
    setPassword(result.users.password);

  }


  const handleSubmit = async() => {
    console.log(name, phone, password);
    let result = await fetch(`http://localhost:8000/api/updateprofile/user/${x}`,{
        method:'PUT',
        body:JSON.stringify({name,phone,password}) ,
        headers:{
         'Content-Type':'application/json',
         "Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })
    result=await result.json();
    console.log(result,"hiiii");
  };

  

  return (
    <div >
      <div className="container m-40 mb-25 w-50 mt-10 ">
        <form>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
