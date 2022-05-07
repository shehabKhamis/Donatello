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
    orgName:{
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
        type : Sequelize.TEXT
    },
    level : 
    {
        type : Sequelize.STRING,
        allowNull : false
    },
    distance : 
    {
        type : Sequelize.FLOAT.UNSIGNED,
        allowNull : false
    },
    tags : 
    {
        type : Sequelize.JSON,
        allowNull : false
    },
    category : 
    {
        type : Sequelize.STRING,
        allowNull : false

    },
    userId : 
    {
        type: Sequelize.INTEGER,
        defaultValue: null,

    }

    
   

})



module.exports = Case;


