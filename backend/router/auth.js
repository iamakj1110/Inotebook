const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = 'akshat1280';


// creating a user using post request--------------------------------
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 })
],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user2 = await User.findOne({ email: req.body.email })

            if (user2) {
                return res.status(400).json({ error: "user already exists" })
             }
// encrypting password using sallt and hash----------------------------------------

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            const user1 = new User({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })

            user1.save();
        

// generating token for a user----------------------------------------------------------
            const data = {
                user: {
                    id: user1.id
                }
            }
            const jauthToken = jwt.sign(data, JWT_SECRET);
            res.json({authtoken :  jauthToken});
              }
        catch (error) {
            console.error(error.message);

        }



    });


 // login for a user----------------------------------------------------

    router.post('/loginuser', [
        body('email', 'enter a valid email').isEmail(),
        body('password' , "password cannot be blank").exists(),

    ],
        async (req, res) => {
    
            const errors = validationResult(req);
    
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
   
     const {email , password} = req.body ;
     let success = false;
    

     try {

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error : " wrong email"});
        }

        const passwordcomapre = await bcrypt.compare(password , user.password);
        if(!passwordcomapre)
        {
            return res.status(400).json({error: "wrong password"});

        }

        const data = {
            id : user.id
        }

        const authtoken = jwt.sign(data , JWT_SECRET);
        console.log("auth token generatiion",authtoken);
        if(authtoken)
        {
            success =true;
        }
        res.json({ success ,  authtoken});
        
     }catch(error){
   
   console.error(error.message);
   res.status(500).send(   "internal server error");

     }

         } )


// Route 3: Get logged in user Details using POST-----------------------------------------------

router.post('/getuser' , fetchuser , async (req , res) => {
    try {
        
        let userId = req.id; 
        const user = await  User.findById(userId).select("-password")
        console.log(user);
        res.send(user);
       } catch(error){
           res.status(500).send("Internal Server Error");
       }
})

module.exports = router;