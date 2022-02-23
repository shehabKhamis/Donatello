
let Case = require('../Model/Case')


module.exports.getCases=(req,res,next)=>
{
    Case.findAll()
    .then(result=>
        {
        if(!result.length)
        {
            const error = new Error("there are no cases")
            //203 ----> no content
            error.statusCode=204;
            throw error;

        }
        
        res.status(200).json({cases:result})
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
        toGo : req.body.goal

    }).then(result=>{
        res.status(201).json({
            case: result});
    })
    .catch(err=>
        {
            console.log(err)
        })
    
}


module.exports.getCase=(req,res,next)=>{
    const caseId= req.params.caseId;
    Case.findAll({where : {id : caseId}})
    .then(result=>{
        if(!result.length)
        {
            const error=new Error('could not find case');
            error.statusCode=404;
            throw error;
        }
        res.status(200).json({case : result})
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
