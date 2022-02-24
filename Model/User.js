const Sequelize = require('sequelize')

const sequelize = require('../connection/sequelize')

const User = sequelize.define('user',{


    id : {
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


    password:
    {
        type : Sequelize.STRING,
        allowNull : false
    }



})

module.exports = User;