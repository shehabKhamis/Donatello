const Sequelize = require('sequelize')

const sequelize = require('../connection/sequelize')

const acceptedProposal= sequelize.define('acceptedProposal',{

    proposalId :{
        type : Sequelize.INTEGER.UNSIGNED,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true,
        unique : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false

    },
    phoneNum : {
        type : Sequelize.STRING(15),
        allowNull : false
    },

    title:{
        type : Sequelize.STRING,
        allowNull: false
    },
    description : {
        type : Sequelize.STRING,
        allowNull:false
    },
    goal : {
        type : Sequelize.INTEGER.UNSIGNED,
        allowNull:false,
        
    },
    location :{
        type : Sequelize.STRING,
        allowNull : false

    },
    
    category : 
    {
        type : Sequelize.STRING,
        allowNull : false

    },
    status : {
        type : Sequelize.STRING,
        allowNull : false,
        defaultValue : "accepted"

    }

    
   

})



module.exports = acceptedProposal;


