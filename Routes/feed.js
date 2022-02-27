const express = require('express')
const router =express.Router()

const feedController= require('../Controller/feed');


const userAuth = require('../middleware/userAuth')



router.get('/home',userAuth,feedController.getCases)


router.post('/home',feedController.postCase)


router.get('/home/:caseId',feedController.getCase)




module.exports=router