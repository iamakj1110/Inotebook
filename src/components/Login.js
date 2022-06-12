import React , { useContext , useState  } from 'react'
import CredContext from "../credentials/CredContext";
import { useHistory } from "react-router-dom";
const Login = () => {

    let history = useHistory();
    const [ credentials , setCredentials ] = useState({email: ""  , password: ""})
    
    const context1 = useContext(CredContext);
    const  { elogin } = context1;

    const handleChange =(e)=>{
        setCredentials({...credentials , [e.target.name] : e.target.value})
    }

    const handleClick = async (e) =>{
      // console.log("pushed")
         e.preventDefault();
         await elogin(credentials.email , credentials.password);
         if(localStorage.getItem('token'))
         {
         history.push('/');
         }
        
    }
  return (
     <>
     <h2 className='mt-5 my-3'> Login to get your notes </h2>
     <form onSubmit={handleClick} >
  <div class="form-group" >
    <label for="exampleInputEmail2">Email address</label>
    <input type="email" name="email" value={credentials.email} onChange={handleChange} class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email"/>
   
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" name="password" value={credentials.password} onChange={handleChange}  class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
     </>
  )
}

export default Login