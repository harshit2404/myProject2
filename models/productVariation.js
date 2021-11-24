const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Variation = sequelize.define('variation',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    size:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull:false
    }

})

module.exports = Variation