require('dotenv').config();
const jwt = require('jsonwebtoken')


generateRefToken=(req,res,next)=>
{
    const refToken = req.get('Authorization').split(' ')[2];
    if(!refToken)
    {
        const error = new Error("Refresh Token is not found !!")
        error.statusCode = 400;
        throw error;
    }
    let decoded;
    try{
        decoded= jwt.verify(refToken,process.env.USER_REFRESH_TOKEN)
        console.log("gggggggg----------->>>>>>>>>>>>>>>>",decoded)
        const token =jwt.sign({
            email : decoded.email,
            id : decoded.id

        },process.env.USER_ACCESS_TOKEN,{expiresIn:'15m'})
        const refreshToken = jwt.sign({
            email : decoded.email,
            id : decoded.id

        },process.env.USER_REFRESH_TOKEN,{expiresIn:'1y'})
        req.id=decoded.id;
      //  req.name = decoded.name;
        req.token =token;
        req.refreshToken = refreshToken;
        console.log("hnaaaaaaaaahahahhahahahahkoSOKO",token)
        //return token , refreshToken;
   }
   catch(err){

       err.statusCode=401;
       err.message="YOU ARE NOT AUTHENTICATED AS A USER !!"
       res.status(401).json({message : err.message});
      if(!decoded)
      {
    
          const error = new Error("YOU ARE NOT AUTHENTICATED AS A USER !!");
          error.statusCode = 401;
          throw error;
      }
   }

}


module.exports=(req,res,next)=>
{

    const token = req.get('Authorization').split(' ')[1];
    console.log(token)

    if(!token)
    {
        const error = new Error("Authentication header is not found !!")
        error.statusCode = 400;
        throw error;
    }
    let decoded;
    try{
         decoded= jwt.verify(token,process.env.USER_ACCESS_TOKEN)
         console.log(decoded)
         req.id=decoded.id;
    }
    catch(err){

        err.statusCode=401;
        err.message="Not Authenticated as a user!!"
       //res.status(401).json({message : err.message});

        if(!decoded)
    {

        generateRefToken(req,res,next);
        // const error = new Error("Not Authenticated");
        // error.statusCode = 401;
        // throw error;
    }
    }

    
    next();




};