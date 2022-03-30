
let Case = require('../Model/Case')



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
        creator: req.id


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
    Case.findAll({where : {Caseid : caseId}})
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


