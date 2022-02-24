
const {validationResult}=require('express-validator')

const User = require('../Model/User')

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
        User.create({name :  req.body.name,email :req.body.email,password: req.body.password})
        res.status(201).redirect('/feed/home')
       // res.status(200).json({name : req.body.name,email :req.body.email,password: req.body.password })
    }



}