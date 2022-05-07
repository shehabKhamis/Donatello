const express = require('express')
const router =express.Router()

const feedController= require('../Controller/feed');


const userAuth = require('../middleware/userAuth')



router.get('/home',userAuth,feedController.getCases)

router.patch('/changepassword',userAuth,feedController.changePassword)

router.get('/home/:caseId',userAuth,feedController.getCase)

router.get('/organizations/:orgId',userAuth,feedController.getOrgCases)

router.get('/organizations',userAuth,feedController.getOrganizations)

router.get('/proposals',userAuth,feedController.getProposals)

router.post('/submit',userAuth,feedController.submitProposal)

module.exports=router