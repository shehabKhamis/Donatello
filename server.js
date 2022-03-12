const bodyParser = require('body-parser');
const express = require('express');

const sequalize=require('./connection/sequelize')

const User = require('./Model/User')

const Case = require('./Model/Case')


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

Organization.hasMany(Case,{constraints : true,onDelete :'CASCADE',foreignKey: 'creator'});


sequalize.sync()
.then(result=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("working")
    })
}).catch(err=>{
    console.log(err);
})