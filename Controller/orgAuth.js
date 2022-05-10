const {validationResult}=require('express-validator')

const bcrypt = require('bcryptjs')

const Organization = require('../Model/Organization')

const io = require('../socket')
const Case = require('../Model/Case')

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
           return Organization.create({name :  req.body.name,email :req.body.email,password: hashedPw,category : req.body.category})
        })
        .then(org=>{
            const token = jwt.sign({
                name : org.name,
                email : org.email,
                id : org.orgId
    
            },"SayedRagabMahmoudHemedaOrganizationToken",{expiresIn:'1h'})
    
            io.getIo().emit("orgReg",{org : org})
            res.status(201).json({token : token,id : org.orgId,name : org.name,email : org.email})

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
    let loadedOrg;
    Organization.findOne({where :{email : req.body.email}})
    .then(org=>{
        if(!org)
        {
            const error = new Error("Email cannot be found, please signup!!")
            error.statusCode=404;
            res.status(404).json({message : error.message})
        }
        loadedOrg= org;
        return bcrypt.compare(req.body.password,org.password)
    })
    .then(isEqual=>{

        if(!isEqual)
        {
            const err = new Error("Wrong password!");
            err.statusCode=401;
            res.status(401).json({message : err.message})
        }

        
        const token =jwt.sign({
            name : loadedOrg.name,
            email : loadedOrg.email,
            id : loadedOrg.orgId

        },"SayedRagabMahmoudHemedaOrganizationToken",{expiresIn:'1h'})

        res.status(200).json({token : token,id : loadedOrg.orgId,name : loadedOrg.name,email : loadedOrg.email})


    })
    .catch(err=>{
        if(!err.statusCode)
        {
            err.statusCode=500;
        }
        next(err)
    })

}



