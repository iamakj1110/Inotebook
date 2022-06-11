const express = require("express");
const app = express();
const connectToMongoose = require("./db");
var cors = require("cors");
app.use(cors())
app.use(express.json())



connectToMongoose();
app.use(express.json());
app.get("/" , function(req , res){
    res.send("hello");
})

app.use('/api/auth' , require('./router/auth'));
app.use('/api/notes' , require('./router/notes'));

app.listen(5000 , function(err){
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("running on port 3000");
    }
});

 
 
 
  
   
     
       
          
               
                  
                   
                  

     
    
    
    
          
                 
                   
                        
                             
                   
                     
                         
                            
                                 
                                      





