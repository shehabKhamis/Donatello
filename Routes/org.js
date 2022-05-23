const express = require('express')
const router = express.Router()

const { body } = require('express-validator')

const adminController = require('../Controller/admin');

const orgAuthController = require('../Controller/orgAuth');

const orgAuthMiddleware = require('../middleware/orgAuth');


const Organization = require('../Model/Organization')


router.post('/post', orgAuthMiddleware, adminController.postCase)


router.get('/cases', orgAuthMiddleware, adminController.getOrgCases)

router.get('/proposals', orgAuthMiddleware, adminController.getOrgProposals)

router.get('/donations', orgAuthMiddleware, adminController.getOrgDonations)

router.put('/donations/done/:donId', orgAuthMiddleware, adminController.donationDone)

router.get('/donations/done', orgAuthMiddleware, adminController.getDoneDonations)



router.get('/proposals/accepted', orgAuthMiddleware, adminController.getOrgAcceptedProposals)

router.get('/proposals/rejected', orgAuthMiddleware, adminController.getOrgRejectedProposals)

router.get('/cases/:caseId', orgAuthMiddleware, adminController.getCase)

router.get('/proposals/:propId', orgAuthMiddleware, adminController.getProposal)

router.put('/proposals/accept/:propId', orgAuthMiddleware, adminController.acceptProposal)

router.delete('/proposals/reject/:propId', orgAuthMiddleware, adminController.rejectProposal)

router.delete('/cases/:caseId', orgAuthMiddleware, adminController.deleteCase)


router.put('/signup', [

    body('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage("please enter a valid e-mail.")
        .custom((value, { req }) => {
            return Organization.findOne({ where: { email: value } })
                .then(result => {

                    if (result) {

                        return Promise.reject("E-mail already in use.")
                    }
                    else {
                        return true;
                    }
                })

        })
        .normalizeEmail()
    ,
    body('password')
        .trim()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,

        })
        .withMessage("Password must contain uppercase letter(s),lowercase letter(s),symbol(s) and be at least 8 characters long  ")
    ,

    body('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Name field is required")
        .custom((value, { req }) => {
            return Organization.findOne({ where: { name: value } })
                .then(result => {

                    if (result) {

                        return Promise.reject("This Organiztion has registered before.")
                    }
                    else {
                        return true;
                    }
                })

        })

], orgAuthController.signup)




router.post('/login', orgAuthController.login)

router.put('/edit/:caseId', orgAuthMiddleware, adminController.editCase)

router.patch('/changepassword', orgAuthMiddleware,[body('password')
.trim()
.isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,

})
.withMessage("Password must contain uppercase letter(s),lowercase letter(s),symbol(s) and be at least 8 characters long  ")
], adminController.changePassword)

module.exports = router;

