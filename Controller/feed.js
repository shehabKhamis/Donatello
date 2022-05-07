
let Case = require('../Model/Case');
const Proposal = require('../Model/Proposal');
const acceptedProposal = require('../Model/AcceptedProposals');
const rejectedProposal = require('../Model/RejectedProposals');
const Organization = require('../Model/Organization');
const User = require('../Model/User');
const {validationResult}=require('express-validator')

const bcrypt = require('bcryptjs')

module.exports.getCases=(req,res,next)=>
{
    Case.findAll()
    .then(result=>
        {
        if(!result.length)
        {
            const error = new Error("There are no cases")
            //204 ----> no content
            error.statusCode=204;
            next(error);

        }
        else
            {
                res.status(200).json({cases:result})

            } 
    } )
    .catch(err=>{
        if(!err.statusCode)
        {
            err.statusCode=500;
        }
        next(err);
    })
   
}






module.exports.getCase=(req,res,next)=>{
    const caseId= req.params.caseId;
    Case.findAll({where : {Caseid : caseId}})
    .then(result=>{
        
        if(!result.length)
        {
            
            const error=new Error('could not find case');
            error.statusCode=404;
            next(error) ;
        }
        else
        {

            
        res.status(200).json({case : result})
        }
        
    })
    .catch(err=>
        {
            if(!err)
            {
                err.statusCode=500;
            }
            next(err);

        })
}

module.exports.getOrgCases = (req, res, next) => {

    Case.findAll({ where: { creator: req.params.orgId } })
        .then(result => {

            if (!result.length) {

                const error = new Error('There are no cases so far !');
                error.statusCode = 404;
                res.status(404).json({ message: error.message })
            }
            else {


                res.status(200).json({ case: result })
            }

        })

}



module.exports.getProposals = async (req, res, next) => {
    try{
    let result = await Proposal.findAll({ where: { submitter: req.id } })
    let acc= await acceptedProposal.findAll({ where: { submitter: req.id } })
    let rej= await rejectedProposal.findAll({ where: { submitter: req.id } })
    for(let pro of acc)
    {
        console.log(pro)
        result.push(pro);
    }
    for(let pro of rej)
    {
        result.push(pro);
    }
    
            if (!result.length ) {

                const error = new Error('There are no proposals so far !');
                error.statusCode = 404;
                res.status(404).json({ message: error.message })
            }
            else {
               
                res.status(200).json({ proposal: result })
            }

      
        }
        catch(err){

            if(!err.statusCode)
            {
                err.statusCode = 500;
            }
            next(err)
}
}


module.exports.submitProposal=async (req,res,next)=>{

    try{
    const found = await Organization.findOne({where:{orgId : req.body.org}})
    if(!found)
    {
        const err = new Error("there is no organization with this Id.")
        throw err;
    }
    const created = await Proposal.create({
        title : req.body.title,
        description : req.body.description,
        goal : req.body.goal,
        name : req.body.name,
        phoneNum : req.body.phoneNumber,
        location :req.body.location,
        category : req.body.category,
        orgId : req.body.org,
        submitter : req.id
    })
    if(created)
    {
        res.json({message : "proposal is sent successfully."})
    }

    }

    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500;
        }
        next(err)
    }


},

module.exports.getOrganizations=(req,res,next)=>
{
    Organization.findAll({attributes :['name','orgId','category']})
    .then(result=>
        {
        if(!result.length)
        {
            
            const error = new Error("There are no organizations yet.")
            //204 ----> no content
            error.statusCode=204;
            next(error)

        }
        else
            {
                res.status(200).json({organizations:result})

            } 
    } )
    .catch(err=>{
        if(!err.statusCode)
        {
            err.statusCode=500;
        }
        next(err);
    })
   
}

module.exports.changePassword = async (req, res, next) => {

    try{ 
        const errors = validationResult(req)
        if(!errors.isEmpty())
        {
            const error = new Error("Validation error")
            error.statusCode =422
            error.data = errors.array();
            throw error
    
        }
        else
        {
        const pass = await User.findOne({where : {id : req.id},attributes:['password']})
        const match = await bcrypt.compare(req.body.current,pass.password)
        if(match)
        {
            const hashedPw= await bcrypt.hash(req.body.password,12)
        const found = await User.update({

        password:hashedPw
        },{where : { id : req.id}});

        if(found[0])
        {

            res.status(200).json({message : "password is successfully changed."})
        }
        else
        {
            res.status(400).json({message : "password cannot be changed."})
        }
        }
        else
        {
            res.status(400).json({message : "current password is not correct."}) 
        }
    }
       
    }
    catch(err){

        if(!err.statusCode)
        {
            err.statusCode = 500;
        }
        next(err)

    }

}

