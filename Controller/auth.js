require('dotenv').config();
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
    
            },process.env.USER_ACCESS_TOKEN,{expiresIn:'1h'})
            const refreshToken = jwt.sign({
                //name : user.name,
                email : user.email,
                id : user.orgId
    
            },process.env.USER_REFRESH_TOKEN,{expiresIn:'1y'})
    

            res.status(201).json({token : token,refreshToken:refreshToken,id : user.id,name : user.name,email:user.email})

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
            res.status(401).json({message : err.message})
        }

        
        const token =jwt.sign({
            email : loadedUser.email,
            id : loadedUser.id

        },process.env.USER_ACCESS_TOKEN,{expiresIn:'1h'})
        const refreshToken = jwt.sign({
           
            email : loadedUser.email,
            id : loadedUser.orgId

        },process.env.USER_REFRESH_TOKEN,{expiresIn:'1y'})

        res.status(200).json({token : token,refreshToken:refreshToken ,id : loadedUser.id,name : loadedUser.name,email:loadedUser.email})


    })
    .catch(err=>{
        if(!err.statusCode)
        {
            err.statusCode=500;
        }
        next(err)
    })










}