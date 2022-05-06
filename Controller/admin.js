
let Case = require('../Model/Case')

let Proposal = require('../Model/Proposal')

const bcrypt = require('bcryptjs')

let acceptedProposal = require('../Model/AcceptedProposals')

let rejectedProposal = require('../Model/RejectedProposals')
const Organization = require('../Model/Organization')



module.exports.getOrgCases = (req, res, next) => {

    Case.findAll({ where: { creator: req.id } })
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

module.exports.getOrgProposals = async (req, res, next) => {
    try{
    let result = await Proposal.findAll({ where: { orgId: req.id } })
        

            if (!result.length) {

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

module.exports.getOrgAcceptedProposals = async (req, res, next) => {
    try{
    let result = await acceptedProposal.findAll({ where: { orgId: req.id } })
        

            if (!result.length) {

                const error = new Error('There are no accepted proposals so far !');
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



module.exports.getOrgRejectedProposals = async (req, res, next) => {
    try{
    let result = await rejectedProposal.findAll({ where: { orgId: req.id } })
        

            if (!result.length) {

                const error = new Error('There are no rejected proposals so far !');
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

module.exports.acceptProposal=async (req,res,next)=>{
    const propId = req.params.propId;
    try
    {
        let found = await Proposal.findOne({where : {proposalId : propId,orgId : req.id}, attributes: { exclude: ['proposalId','createdAt','updatedAt'] } })
       // console.log("deeeeeeeeeeeeeeeeeleeeeeeeeeteee ---------> ",found.dataValues)
        if(found)
        {
            found.status="accepted"
            console.log("deeeeeeeeeeeeeeeeeleeeeeeeeeteee   2222222 ---------> ",found.dataValues)
            const acc = await acceptedProposal.create(found.dataValues)
            if(acc)
            {
                const del = await Proposal.destroy({where : {proposalId:propId,orgId:req.id}})
                if(del)
                {
                   const created =  await Case.create({
                        title: req.body.title,
                        description: req.body.description,
                        goal: req.body.goal,
                        imageUrl: req.body.imageUrl,
                        toGo: req.body.goal,
                        distance: req.body.distance,
                        level: req.body.level,
                        tags: req.body.tags,
                        category: req.body.category,
                        creator: req.id,
                        userId : found.dataValues.submitter
                
                
                    })
                    if(created)
                    {
                        res.status(201).json({message : "proposal has been accepted."})
                    }
                    else
                    {
                        res.status(400).json({message : "proposal has been deleted and not added to cases."})
                    }
                   
                }
                else
                {
                    res.status(400).json({message : "proposal is accepted but duplicated."})
                }
            }
            else
            {
                res.status(500).json({message : "error while accepting proposal."})
            }
        }
        else{
            res.status(404).json({message : "proposal is not found."})

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
}



module.exports.rejectProposal=async (req,res,next)=>{
    const propId = req.params.propId;
    try
    {
        const found = await Proposal.findOne({where : {proposalId : propId,orgId : req.id}, attributes: { exclude: ['proposalId','createdAt','updatedAt'] } })
        //console.log("deeeeeeeeeeeeeeeeeleeeeeeeeeteee ---------> ",del)
        if(found)
        {
            delete found.proposalId
            found.status="rejected"
            const acc = await rejectedProposal.create(found.dataValues)
            if(acc)
            {
                const del = await Proposal.destroy({where : {proposalId:propId,orgId:req.id}})
                if(del)
                {
                    res.status(201).json({message : "proposal has been rejected."})
                }
                else
                {
                    res.status(400).json({message : "proposal is rejected but duplicated."})
                }
            }
            else
            {
                res.status(500).json({message : "error while rejecting proposal."})
            }
        }
        else{
            res.status(404).json({message : "proposal is not found."})

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
}











module.exports.postCase = (req, res, next) => {
    console.log(req.id)
    Case.create({
        title: req.body.title,
        description: req.body.description,
        goal: req.body.goal,
        imageUrl: req.body.imageUrl,
        toGo: req.body.goal,
        distance: req.body.distance,
        level: req.body.level,
        tags: req.body.tags,
        category: req.body.category,
        creator: req.id,
        userId:null


    }).then(result => {
        res.status(201).json({
            message: "Case is created successfully."
        });
    })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}

module.exports.getCase=(req,res,next)=>{
    const caseId= req.params.caseId;
    const organId = req.id;
    Case.findAll({where : {Caseid : caseId,creator:organId}})
    .then(result=>{
        
        if(!result.length)
        {
            const error=new Error('Case is not found.');
            error.statusCode=404;
            res.status(404).json({message:error.message})
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


module.exports.getProposal=(req,res,next)=>{
    const proposalId= req.params.propId;
    const organId = req.id;
    Proposal.findAll({where : {proposalId : proposalId,orgId:organId}})
    .then(result=>{
        
        if(!result.length)
        {
            const error=new Error('Proposal is not found or you are not authenticated.');
            error.statusCode=404;
            res.status(404).json({message:error.message})
        }
        else
        {

            
        res.status(200).json({proposal : result})
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





module.exports.deleteCase = (req, res, next) => {
    const caseId = req.params.caseId;
    Case.findAll({ where: { CaseId: caseId } })
        .then(result => {
            console.log(result)

            if (!result.length) {
                const err = new Error("Couldn't find post.")
                err.statusCode = 404;
                res.status(202).json({ message: err.message })
                //throw err;
            }
            if (req.id === result[0].creator) {

                return Case.destroy({ where: { CaseId: caseId } });
            }

        })
        .then(check => {
            console.log(check)
            if (check) {
                res.status(202).json({ message: "deleted successfully." })
            }
            else {
                res.status(504).json({ message: "Couldn't delete post." })
            }

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err);
        })

}


module.exports.editCase = async (req, res, next) => {

    const caseId = req.params.caseId;
    try{

        const found = await Case.update({

        title: req.body.title,
        description: req.body.description,
        goal: req.body.goal,
        imageUrl: req.body.imageUrl,
        raised : req.body.raised,
        toGo : req.body.goal - req.body.raised,
        distance: req.body.distance,
        level: req.body.level,
        tags: req.body.tags,
        category: req.body.category,
        creator: req.id
        },{where : {CaseId : caseId , creator : req.id}});

        if(found[0])
        {

            res.status(200).json({message : "Case is successfully edited."})
        }
        else
        {
            res.status(400).json({message : "Case cannot be edited."})
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



module.exports.changePassword = async (req, res, next) => {

    try{ 
        const pass = await Organization.findOne({where : {orgId : req.id},attributes:['password']})
        const match = await bcrypt.compare(req.body.current,pass.password)
        if(match)
        {
            const hashedPw= await bcrypt.hash(req.body.password,12)
        const found = await Organization.update({

        password:hashedPw
        },{where : { orgId : req.id}});

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
    catch(err){

        if(!err.statusCode)
        {
            err.statusCode = 500;
        }
        next(err)

    }
}
