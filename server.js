const bodyParser = require('body-parser');
const express = require('express');

const sequalize=require('./connection/sequelize')


const userRoutes = require('./Routes/feed.js')

const app=express();

app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})


app.use('/feed',userRoutes);




sequalize.sync().then(result=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log("working")
    })
}).catch(err=>{
    console.log(err);
})