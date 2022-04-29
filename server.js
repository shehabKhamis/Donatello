const bodyParser = require('body-parser');
const express = require('express');

const sequalize=require('./connection/sequelize')

const User = require('./Model/User')

const Case = require('./Model/Case')

const Proposal = require('./Model/Proposal')


const Organization = require('./Model/Organization')

const userRoutes = require('./Routes/feed.js')

const authRoutes = require('./Routes/auth')

const orgRoutes = require('./Routes/org')

const app=express();

app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})


app.use('/feed',userRoutes);

app.use('/org',orgRoutes);

app.use('/auth',authRoutes)

app.use((error,req,res,next)=>
{
    console.log(error)
    const status = error.statusCode || 500
    const msg = error.message
    console.log(msg)
    res.status(status).json({message : error.data})

})

Organization.hasMany(Case,{constraints : true,onDelete :'CASCADE',foreignKey: 'creator',allowNull:false});

User.hasMany(Proposal,{constraints : true,onDelete :'CASCADE',foreignKey: 'submitter',allowNull:false})

Proposal.belongsTo(Organization,{constraints : true,onDelete :'CASCADE',foreignKey: 'orgId',allowNull:false})


sequalize.sync()
.then(result=>{
    const server=app.listen(process.env.PORT || 3000,()=>{
        console.log("working")
        const io = require('./socket').init(server);
        io.on('connection',socket=>{
            console.log("new connection")
        })
    })
}).catch(err=>{
    console.log(err);
})