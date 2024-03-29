const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet')
const sequalize=require('./connection/sequelize')

const User = require('./Model/User')
const donationReq = require('./Model/DonationReq');

const Donation = require('./Model/Donation');

const Case = require('./Model/Case')

const Proposal = require('./Model/Proposal')

const rejectedProposal = require('./Model/RejectedProposals')

const acceptedProposal = require('./Model/AcceptedProposals')




const Organization = require('./Model/Organization')

const userRoutes = require('./Routes/feed.js')

const authRoutes = require('./Routes/auth')

const orgRoutes = require('./Routes/org');
const socket = require('./socket');


const app=express();

app.use(helmet());

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

Organization.hasMany(donationReq,{constraints : true,onDelete :'SET NULL',foreignKey: 'orgId',allowNull:false});

Case.hasMany(donationReq,{constraints : true,onDelete :'SET NULL',foreignKey: 'caseId',allowNull:false});

User.hasMany(donationReq,{constraints : true,onDelete :'SET NULL',foreignKey: 'donorId',allowNull:false})

Organization.hasMany(Donation,{constraints : true,onDelete :'SET NULL',foreignKey: 'orgId',allowNull:false});

Case.hasMany(Donation,{constraints : true,onDelete :'SET NULL',foreignKey: 'caseId',allowNull:false});

User.hasMany(Donation,{constraints : true,onDelete :'SET NULL',foreignKey: 'donorId',allowNull:false})


User.hasMany(Proposal,{constraints : true,onDelete :'CASCADE',foreignKey: 'submitter',allowNull:false})

User.hasMany(acceptedProposal,{constraints : true,onDelete :'CASCADE',foreignKey: 'submitter',allowNull:false})

User.hasMany(rejectedProposal,{constraints : true,onDelete :'CASCADE',foreignKey: 'submitter',allowNull:false})

Proposal.belongsTo(Organization,{constraints : true,onDelete :'CASCADE',foreignKey: 'orgId',allowNull:false})

acceptedProposal.belongsTo(Organization,{constraints : true,onDelete :'CASCADE',foreignKey: 'orgId',allowNull:false})
rejectedProposal.belongsTo(Organization,{constraints : true,onDelete :'CASCADE',foreignKey: 'orgId',allowNull:false})

sequalize.sync()
.then(result=>{
    const server=app.listen(process.env.PORT || 3000)
        console.log("working")
        const io = require('./socket').init(server);
        io.on('connection',socket=>{
            console.log("new connection",socket)
            socket.on('set-name',(name)=>{
            console.log('bushi name : ',name);
            })
        });

        
    })
.catch(err=>{
    console.log(err);
})