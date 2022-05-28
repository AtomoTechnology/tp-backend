const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Documenttype extends Model {}
Documenttype.init({ 
    id:{
        type: DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        unique:true,
        primaryKey: true,
    },   
    name: DataTypes.STRING, 
    description: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER  
},
{ sequelize, modelName: 'documenttypes' });

module.exports = Documenttype;