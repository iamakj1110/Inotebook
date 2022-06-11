import CredContext from "./CredContext";


const CredState = (props) => {
 

//---------------Login credentials --------------------------------------------------------------
    const elogin = async (email , password)=>{
        const response = await fetch("http://localhost:5000/api/auth/loginuser" ,{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
               
             },

             body : JSON.stringify({email , password})
 
              
        });

        const json = await response.json()
        console.log(json);
        if(json.success)
        {
            localStorage.setItem('token' ,json.authtoken);
           
        }
        else{
            alert("Invalid Credentials")
        }
    }


//-----------------Sign up------------------------------------------------------------

   const signup  =  async (name , email , password) =>{
          const response =  await fetch("http://localhost:5000/api/auth/createuser" , {
               method : "POST",
               headers: {
                'Content-Type': 'application/json',
               
             },
             body : JSON.stringify({name , email  , password} )

          });

          const json = await response.json();
          localStorage.setItem('token' , json.authtoken);




   }
   





    return (
 <CredContext.Provider value={{elogin  , signup}}>
            {props.children}
        </CredContext.Provider>
  )


}
export default CredState;
