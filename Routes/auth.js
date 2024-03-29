const express = require('express');
const { route } = require('./feed');

const {body}=require('express-validator')

const router = express.Router();

const User = require('../Model/User');

const authController = require('../Controller/auth')



router.put('/signup',[

    body('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("please enter a valid e-mail.")
    .custom((value,{req})=>
    {
        return User.findOne({where :{email : value}})
        .then(result=>
            {
                
                if(result)
                {
                    
                    return Promise.reject("E-mail already in use.")
                }
                else
                {
                    return true;
                } 
            })

    })
    .normalizeEmail()
    ,
    body('password')
    .trim()
    .isStrongPassword({
        minLength : 8,
        minLowercase :1,
        minUppercase:1,
        minNumbers:1,
        
    })
    .withMessage("Password must contain uppercase letter(s),lowercase letter(s),symbol(s) and be at least 8 characters long  ")
    ,

    body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name field is required")
    ,
    body('confirm')
    .trim()
    
    .custom((value,{req})=>{
        if(value === req.body.password)
        {
            return true;
        }
        else{
            throw new Error("passwords are not matched.")

        }


    })

],authController.signup)




router.post('/login',authController.login)









module.exports = router;
