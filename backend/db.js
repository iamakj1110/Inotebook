const mongoose = require("mongoose");

const mongoURI =  "mongodb://localhost:27017/inotebook";

const connectToMongoose = () =>{
    mongoose.connect(mongoURI , function(err){
        if(!err)
        {
            console.log("connected to mongoose");
        }
        else{
            console.log(err);
        }
    })
}

module.exports = connectToMongoose;


