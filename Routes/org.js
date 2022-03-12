const express = require('express')
const router =express.Router()

const {body}=require('express-validator')

const adminController= require('../Controller/admin');

const orgAuthController= require('../Controller/orgAuth');

const orgAuthMiddleware= require('../middleware/orgAuth');


const Organization = require('../Model/Organization')


router.post('/post',orgAuthMiddleware,adminController.postCase)


router.get('/cases',orgAuthMiddleware,adminController.getOrgCases)



router.delete('/cases/:caseId',orgAuthMiddleware,adminController.deleteCase)


router.put('/signup',[

    body('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("please enter a valid e-mail.")
    .custom((value,{req})=>
    {
        return Organization.findOne({where :{email : value}})
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
    .custom((value,{req})=>
    {
        return Organization.findOne({where :{name : value}})
        .then(result=>
            {
                
                if(result)
                {
                    
                    return Promise.reject("This Organiztion has registered before.")
                }
                else
                {
                    return true;
                } 
            })

    })

],orgAuthController.signup)




router.post('/login',orgAuthController.login)









module.exports = router;


module.exports=router