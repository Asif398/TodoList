import React from "react";
import {Link,useNavigate} from 'react-router-dom';
const Nav=()=>{
    const auth = localStorage.getItem('user');
    const navigate= useNavigate()
    const logout=()=>{
        localStorage.clear();
        navigate("/signup");
    }
    return(
        
        <div>
            <img className="logo"
            src="https://images-platform.99static.com//9xfS1pX1HePXshlLboFhmqp-vPs=/297x299:1362x1364/fit-in/500x500/99designs-contests-attachments/112/112818/attachment_112818410" alt="" />
         {auth? <ul className="nav-ul">
            <li><Link to="/">View Todo</Link></li>
            <li><Link to="/add">Create Todo</Link></li>
            <li><Link to="/update">Admin Dashboard</Link></li>
            <li><Link to="/profile">Update Profile</Link></li>
            <li> <Link onClick={logout} to="/signup">Logout </Link></li>    
        </ul>  
        :
         <ul className="nav-ul nav-right">
             <li> <Link to="/signup">Signup</Link></li>
           <li> <Link to="/signin">Signin</Link></li>
         </ul>
         }
        </div>
    )
}


export default Nav;