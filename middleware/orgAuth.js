
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
         decoded= jwt.verify(token,"SayedRagabMahmoudHemedaOrganizationToken")
         console.log(decoded)
    }
    catch(err){

        err.statusCode=401;
        err.message="Not Authenticated as an admin!!"
        res.status(401).json({message : err.message});
    }

    if(!decoded)
    {
        const error = new Error("Not Authenticated");
        error.statusCode = 401;
        throw error;
    }
    req.id=decoded.id;
    req.name=decoded.name
   

    next();




};