const Sequelize = require('sequelize')

const sequelize = require('../connection/sequelize')

const Organization = sequelize.define('organization',{


    orgId : {
        type : Sequelize.INTEGER.UNSIGNED,
        autoIncrement : true,
        primaryKey : true,
        allowNull :false,
        unique : true
    },

    name :{
        type : Sequelize.STRING,
        allowNull : false
    },


    email : {
        type : Sequelize.STRING,
        allowNull : false,
        unique :true
    },

    category : {
        type : Sequelize.STRING,
        allowNull : false,
        
    },

    password:
    {
        type : Sequelize.STRING,
        allowNull : false
    }



})

module.exports = Organization;