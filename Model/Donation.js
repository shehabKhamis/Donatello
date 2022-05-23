const Sequelize = require('sequelize')

const sequelize = require('../connection/sequelize')

const Donation= sequelize.define('donation',{

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
    },orgName:{
        type : Sequelize.STRING,
        allowNull: false
    },
    title:{
        type : Sequelize.STRING,
        allowNull: false
    },
    description : {
        type : Sequelize.STRING,
        allowNull:false
    },
    status : {
        type : Sequelize.STRING,
        allowNull : false,
        defaultValue : "Done"

    }

    
   

})



module.exports = Donation;


