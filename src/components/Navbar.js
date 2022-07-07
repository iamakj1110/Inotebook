import React from 'react'
import { useLocation,

  Link
} from "react-router-dom";
const Navbar = () => {
  const logmeout =()=>{
     localStorage.removeItem('token');
  }

   const location = useLocation();
   

  return (

    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Inotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav  me-auto  ">  
        <li className="nav-item">
          <Link className={ `nav-link ${location.pathname==="/"? "active" : " "}` } aria-current="page" to="/">Home</Link>
        </li>
//         <li className={ `nav-link ${location.pathname==="/About"? "active" : " "}` } >
//           <Link className="nav-link" to="/About">About</Link>
//         </li>
       
  
      </ul>
     { localStorage.getItem('token')?<Link class="btn btn-primary btn-sm" to="/login" onClick={logmeout} role="button">Logout</Link>:
        <form className="d-flex">
      <Link className={` ${location.pathname==='/signup'? "disabled" : ""} mx-2  btn btn-primary btn-sm`} to="/signup" role="button">Signup</Link>
       <Link className={`${location.pathname==='/login'?"disabled" : "" } btn btn-primary btn-sm mx-2" `} to="/login" role="button">Login</Link>
     
        
      </form>
}
     
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
