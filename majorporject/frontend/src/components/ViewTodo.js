import React, { useEffect, useState } from 'react';


const ViewTodo = () => {


     const [todo,setTodo] = useState([]);

     useEffect(()=>{
     getstodo();
     },[])
    
    // let todo =[
    //     {
    //         _id:1,
    //         title:"hello wolrd",
    //         description:"this is my text"
    //     },
    // ]

    const getstodo =async ()=>{
       let result = await fetch("http://localhost:8000/api/todo/mytodo",{
        headers:{
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
       })
       result = await result.json();
       console.log("hii", result);
       if(result.status === "failed"){
        return false
       }else{
        setTodo(result.todos);
       }
    }
    // let vies =setTodo(result.todos)
    // console.log(vies);
    // console.log("asif",todo);
    
  return (
    <div>
        <h1>Heloo</h1>


    {
        todo.map((item)=>
            <div className="card m-3" style={{width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              
              <p className="card-text">{item.description}</p>
            </div>
          </div>
        )
    }


    </div>
  )
}

export default ViewTodo;