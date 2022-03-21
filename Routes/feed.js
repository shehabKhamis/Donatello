const express = require('express')
const router =express.Router()

const feedController= require('../Controller/feed');


const userAuth = require('../middleware/userAuth')



router.get('/home',userAuth,feedController.getCases)



router.get('/home/:caseId',userAuth,feedController.getCase)


router.post('/submit',userAuth,feedController.submitProposal)

module.exports=router