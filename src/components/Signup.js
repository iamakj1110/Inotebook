import React , {  useContext , useState} from 'react'
import CredContext from '../credentials/CredContext';
import { useHistory } from "react-router-dom";
const Signup = () => {
    let history = useHistory();
    const [ credentials , setCredentials ] = useState({name:"" ,  email: ""  , password: "" , confirmpassword:""})
    
    const context1 = useContext(CredContext);
    const  { signup } = context1;

    const handleChange =(e)=>{
        setCredentials({...credentials , [e.target.name] : e.target.value})
    }

    const handleClick = (e) =>{
        e.preventDefault();
        signup(credentials.name , credentials.email , credentials.password);
         history.push('/login');
 }
  return (
     <>
      <h2 className='mt-5 my-3'>  Create your account   </h2>
     <form onSubmit={handleClick} >
     <div class="form-group" >
     <label for="name">Name</label>
     <input type="text" name="name" value={credentials.name} onChange={handleChange} class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email"/>
    
   </div>
  <div class="form-group" >
    <label for="exampleInputEmail3">Email address</label>
    <input type="email" name="email" value={credentials.email} onChange={handleChange} class="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="Enter email"/>
   
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" name="password" value={credentials.password} onChange={handleChange}  class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>

  <div class="form-group">
    <label for="exampleInputPassword2">Confirm Password</label>
    <input type="password" name="confirmpassword" value={credentials.confirmpassword} onChange={handleChange}  class="form-control" id="exampleInputPassword2" placeholder="Password"/>
  </div>
  
  <button type="submit" class="my-1  btn btn-primary btn-sm">Submit</button>
</form>
     </>
  )
}

export default Signup;