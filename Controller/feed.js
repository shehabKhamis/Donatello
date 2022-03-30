
let Case = require('../Model/Case');
const Proposal = require('../Model/Proposal');
const Organization = require('../Model/Organization');



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
    Organization.findAll({attributes :['name','orgId']})
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
