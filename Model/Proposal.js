const Sequelize = require('sequelize')

const sequelize = require('../connection/sequelize')

const proposal= sequelize.define('proposal',{

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

    }

    
   

})



module.exports = proposal;


