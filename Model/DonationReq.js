const Sequelize = require('sequelize')

const sequelize = require('../connection/sequelize')

const donationReq= sequelize.define('donationReq',{

    donationId :{
        type : Sequelize.INTEGER.UNSIGNED,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true,
        unique : true
    },
    phoneNum : {
        type : Sequelize.STRING(15),
        allowNull : false
    },
    amount : {
        type : Sequelize.INTEGER.UNSIGNED,
        allowNull:false,
        
    },
     donorName : {
        type : Sequelize.STRING,
        allowNull : false
    },
    donorAddress : {
        type : Sequelize.STRING,
        allowNull : false
    },

    
   

})



module.exports = donationReq;


