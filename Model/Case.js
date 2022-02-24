const Sequelize = require('sequelize')

const sequelize = require('../connection/sequelize')

const Case= sequelize.define('case',{

    CaseId :{
        type : Sequelize.INTEGER.UNSIGNED,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true,
        unique : true
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
    raised : {
        type : Sequelize.INTEGER.UNSIGNED,
        defaultValue : 0
    },
    toGo : {
        type : Sequelize.INTEGER.UNSIGNED,
        allowNull : false

    },
    imageUrl : 
    {
        type : Sequelize.STRING
    }
   

})



module.exports = Case;


