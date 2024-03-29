require('dotenv').config();
const jwt = require('jsonwebtoken')



generateToken=(req,res,next)=>
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
        decoded= jwt.verify(refToken,process.env.ADMIN_REFRESH_TOKEN)
        
        const token =jwt.sign({
            name : decoded.name,
            email : decoded.email,
            id : decoded.id

        },process.env.ADMIN_ACCESS_TOKEN,{expiresIn:'15m'})
        const refreshToken = jwt.sign({
            name : decoded.name,
            email : decoded.email,
            id : decoded.id

        },process.env.ADMIN_REFRESH_TOKEN,{expiresIn:'1y'})
        req.id=decoded.id;
        req.name = decoded.name;
        req.token =token;
        req.refreshToken = refreshToken;
        
        //return token , refreshToken;
   }
   catch(err){

       err.statusCode=401;
       err.message="YOU ARE NOT AUTHENTICATED AS AN ADMIN !!"
       res.status(401).json({message : err.message});
      if(!decoded)
      {
    
          const error = new Error("YOU ARE NOT AUTHENTICATED AS AN ADMIN !!");
          error.statusCode = 401;
          throw error;
      }
   }

}



module.exports=(req,res,next)=>
{

    const token = req.get('Authorization').split(' ')[1];
   

    if(!token)
    {
        const error = new Error("Authentication header is not found !!")
        error.statusCode = 400;
        throw error;
    }
    let decoded;
    try{
        
         decoded= jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN)
         
         req.id=decoded.id;
        req.name=decoded.name
    }
    catch(err){
        
        err.statusCode=401;
        err.message="Not Authenticated as an admin!!"
       
       if(!decoded)
       {
        
        generateToken(req,res,next);
       }
    }
   

    next();




};