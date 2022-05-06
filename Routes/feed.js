const express = require('express')
const router =express.Router()

const feedController= require('../Controller/feed');


const userAuth = require('../middleware/userAuth')



router.get('/home',userAuth,feedController.getCases)

router.patch('/changepassword',userAuth,feedController.changePassword)

router.get('/home/:caseId',userAuth,feedController.getCase)

router.get('/organizations',userAuth,feedController.getOrganizations)


router.post('/submit',userAuth,feedController.submitProposal)

module.exports=router