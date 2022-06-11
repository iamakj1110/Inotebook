// get notes using GET login request
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = 'akshat1280';
const Notes = require("../models/Notes");
const { application } = require("express");
const { update } = require("../models/User");
const { logDOM } = require("@testing-library/react");


// get notes by making a get request --------------------------------
router.get('/getnotes' , fetchuser , async (req , res) =>{
// console.log(req);
    try {

        const notes = await Notes.find({user : req.id});

        res.json(notes);
    }
    catch(error)
    {
        res.status(500).send("internal server error");
    }


})





// add a new note using post--------------------

router.post('/addnote' , fetchuser , [
    body('title' , 'enter a valid title').isLength({ min :3}),
    body( 'description' , ' description must be of 5 character' ).isLength({min : 5}),
]  , async (req , res)=>{

    try{
     const   { title , description , tag} = req.body;
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).send("error in validation");

     }

     const note1 = new Notes({
         title , description , tag , user: req.id  
     })

     const savedNote = await note1.save();
     res.json(savedNote);

    }catch(error)
    {
        res.status(500).send("internal server error");
    }
} );





// updating an existing request by making a put request

router.put('/updatenotes/:id' , fetchuser , async (req , res)=>
{
   try{
       const { title , description , tag } = req.body;
       
    
  const updatednote = {};

   if(title){updatednote.title = title}

   if(description){updatednote.description = description}
   if(tag){ updatednote.tag = tag}
   const foundnotes =  await Notes.findById( req.params.id );
   if(!foundnotes)
   {
       return res.status(404).send("Notes not found");
   }

   if(foundnotes.user.toString() !== req.id)
   {
       return res.status(401).send("Not allowed");
   }

   let updatingnote =await Notes.findByIdAndUpdate(req.params.id , { $set : updatednote} , {new : true});
   res.json(updatingnote);

   }catch(error)
   {
       res.status(500).send(" internal server error")
   }
})











// deleting a note by sending a delete request
router.delete('/deletenotes/:id' , fetchuser , async (req , res) =>
{
   try{
    
       
    

   const foundnotes =  await Notes.findById( req.params.id );
   if(!foundnotes)
   {
       return res.status(404).send("Notes not found");
   }

   if(foundnotes.user.toString() !== req.id)
   {
       return res.status(401).send("Not allowed");
   }

   let updatingnote =await Notes.findByIdAndDelete(req.params.id);

  
   res.json({"success": "deleted succesfully" , updatingnote:updatingnote});

   }catch(error)
   {
       res.status(500).send(" internal server error")
   }
})


module.exports = router;