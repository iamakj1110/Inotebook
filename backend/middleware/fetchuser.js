var jwt = require("jsonwebtoken");
const JWT_secret = 'akshat1280';


const fetchuser = (req , res , next) => {
    const token = req.header('auth-token');
    // const token = req.header('token');

    if(!token){
        res.status(401).send({error : "please authenticate using a valid tokken"})
    }

    try {
        // console.log("after data");
        const data = jwt.verify(token, JWT_secret);
        // console.log(data);
        req.id = data.user.id;
        next();
    } catch(error)
    {
        res.status(401).send({error : "please authenticate using a valid tokken"})
    }
}


module.exports = fetchuser
