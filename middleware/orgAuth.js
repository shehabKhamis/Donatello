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
        console.log("gggggggg----->>>>>>>>>",decoded)
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
        console.log("hnaaaaaaaaahahahhahahahah",token)
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
    console.log(token)

    if(!token)
    {
        const error = new Error("Authentication header is not found !!")
        error.statusCode = 400;
        throw error;
    }
    let decoded;
    try{
        console.log("EL TOKEEEEEEEN EL KHAWAL",token)
         decoded= jwt.verify(token,process.env.ADMIN_ACCESS_TOKEN)
         console.log("gggggggg",decoded)
         req.id=decoded.id;
        req.name=decoded.name
    }
    catch(err){
        console.log("YAAAAAAAA KHAAWWWWWWAAAAAAAAAAAAAAALLLLLLLLLLLLLLLLLLLL")
        err.statusCode=401;
        err.message="Not Authenticated as an admin!!"
       // res.status(401).json({message : err.message});
       if(!decoded)
       {
        //  req.token,req.refreshToken= 
        generateToken(req,res,next);

         console.log("55555555555555555555",req.token)
         console.log("66666666666666666666666666666",req.refreshToken)

        //    const error = new Error("Not Authenticated");
        //    error.statusCode = 401;
        //    throw error;
       }
    }

   
    //
   

    next();




};