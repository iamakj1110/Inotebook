const mongoose = require("mongoose");
const user = require("./User");


const NotesSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
        
    },

   title : {
        type : String ,
        required: true
    },

   description:{
       type : String
   },

   tag: String,   

   date: {
       type: Date,
       default: Date.now
   }


}) ;

module.exports = mongoose.model("Note" , NotesSchema );
