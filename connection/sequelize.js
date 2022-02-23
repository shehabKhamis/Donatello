const Sequelize = require('sequelize')

const seq=new Sequelize('donatello','root','root',{dialect : 'mysql',host : 'localhost'})


module.exports=seq;