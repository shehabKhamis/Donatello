
const {validationResult}=require('express-validator')

const bcrypt = require('bcryptjs')

const User = require('../Model/User')


const jwt = require('jsonwebtoken')

module.exports.signup=(req,res,next)=>
{
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        const error = new Error("Validation error")
        error.statusCode =422
        error.data = errors.array();
        throw error

    }
    else{
        bcrypt.hash(req.body.password,12)
        .then(hashedPw=>{
           return User.create({name :  req.body.name,email :req.body.email,password: hashedPw})
        })
        .then(user=>{
            const token = jwt.sign({
                email : user.email,
                id : user.id
    
            },"SayedRagabMahmoudHemedaToken",{expiresIn:'1h'})
    

            res.status(201).json({token : token,id : user.id})

        })
        .catch(err=>{

            if(!err.statusCode)
            {
                err.statusCode=500
            }
            next(err)

        })

       
       
       // res.status(200).json({name : req.body.name,email :req.body.email,password: req.body.password })
    }



}


module.exports.login=(req,res,next)=>{
    let loadedUser;
    User.findOne({where :{email : req.body.email}})
    .then(user=>{
        if(!user)
        {
            const error = new Error("Email cannot be found, please signup!!")
            error.statusCode=404;
            res.status(404).json({message : error.message})
        }
        loadedUser= user;
        return bcrypt.compare(req.body.password,user.password)
    })
    .then(isEqual=>{

        if(!isEqual)
        {
            const err = new Error("Wrong password!");
            err.statusCode=401;
            res.status(401).json({message : error.message})
        }

        
        const token =jwt.sign({
            email : loadedUser.email,
            id : loadedUser.id

        },"SayedRagabMahmoudHemedaToken",{expiresIn:'1h'})

        res.status(200).json({token : token,id : loadedUser.id})


    })
    .catch(err=>{
        if(!err.statusCode)
        {
            err.statusCode=500;
        }
        next(err)
    })










}