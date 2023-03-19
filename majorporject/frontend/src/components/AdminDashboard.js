import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
   
    // const [runEffect, setRunEffect] = React.useState(false);
    const [todo,setTodo] = useState([]);
    const [isAdmin,setIsAdmin] =useState(false)
   const  navigate = useNavigate()
    // console.log(role,"shami");
    // console.log(role.user, "anjali");
    // useEffect(()=>{
    // let role =JSON.parse(localStorage.getItem("user")).user.role;
    //     if(role === 0 ){
    //       setIsAdmin(true)
    //       navigate("/admin")
    //       getAllTodo();
    //     }else{
    //       setIsAdmin(false);
    //       navigate("/")
    //     }
    // },[isAdmin])

    const getAllTodo =async ()=>{
      let result =await fetch("http://localhost:8000/api/todo/all",{
        headers:{
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`

      }
      })
      result = await result.json();
      console.log("myTodo",result);
    //  setTodo(result.todos)
    if(result.status === "failed"){
      return false
     }else{
      setTodo(result.todos);
     }
    }
  return (
    <div>

<div>

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

    </div>
  )
}

export default AdminDashboard