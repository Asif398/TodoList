import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateTodo = () => {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit=async()=>{

    if(!title|| !description )
    {
      alert("include all fillled")
        return false;        
    }     
    // const userId =  await JSON.parse(localStorage.getItem("user"))._id;
     let result =await fetch("http://localhost:8000/api/createTodo",{
        method:'post',
        body:JSON.stringify({title,description}),
        headers:{
            'Content-Type':'application/json',
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`

        },
    });
     result = await result.json();
     if(result.status === "failed"){
     alert("connot cerate todo")
    return false;
     }
    else{
    alert("Successfully created todo");
    navigate("/")
    }
}
  return (
    <div>
    <div className="container m-40 mb-25 w-50 ">
    <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Title</label>
  <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} 
  className="form-control" id="exampleFormControlInput1" placeholder="enter title" />
</div>
<div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label">Description</label>
  <textarea className="form-control"  value={description} onChange={(e)=>setDescription(e.target.value)} 
   id="exampleFormControlTextarea1" rows="3"></textarea>
  
</div>
<div className="mb-3">
<button className='btn btn-primary' onClick={handleSubmit}>Submit</button>  
</div>
    </div>
    </div>
  )
}

export default CreateTodo;