
const jwt = require('jsonwebtoken')

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
         decoded= jwt.verify(token,"SayedRagabMahmoudHemedaToken")
         console.log(decoded)
    }
    catch(err){

        err.statusCode=500;
        throw err
    }

    if(!decoded)
    {
        const error = new Error("Not Authenticated");
        error.statusCode = 401;
        throw error;
    }
    req.id=decoded.id;
   

    next();




};