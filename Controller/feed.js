
let Case = require('../Model/Case')


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



module.exports.postCase=(req,res)=>
{
    Case.create({
        title : req.body.title,
        description : req.body.description,
        goal : req.body.goal,
        imageUrl : req.body.imageUrl,
        toGo : req.body.goal,
        distance:req.body.distance,
        level:req.body.level,
        tags:req.body.tags,
        category : req.body.category


    }).then(result=>{
        res.status(201).json({
            case: result});
    })
    .catch(err=>
        {
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
