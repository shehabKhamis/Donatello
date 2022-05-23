const express = require('express')
const router =express.Router()

const feedController= require('../Controller/feed');

const { body } = require('express-validator')
const userAuth = require('../middleware/userAuth')



router.get('/home',userAuth,feedController.getCases)

router.patch('/changepassword',userAuth,[
body('password')
.trim()
.isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,

})
.withMessage("Password must contain uppercase letter(s),lowercase letter(s),symbol(s) and be at least 8 characters long  ")
],feedController.changePassword)

router.get('/home/:caseId',userAuth,feedController.getCase)

router.post('/donationrequest/:caseId',userAuth,feedController.donate)

router.get('/donations',userAuth,feedController.getDonations)

router.get('/organizations/:orgId',userAuth,feedController.getOrgCases)

router.get('/organizations',userAuth,feedController.getOrganizations)

router.get('/proposals',userAuth,feedController.getProposals)

router.post('/submit',userAuth,feedController.submitProposal)

module.exports=router