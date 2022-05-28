const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Historial extends Model {}
Historial.init({ 
    id:{
        type: DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        unique:true,
        primaryKey: true,
    },   
    actionName: DataTypes.STRING, 
    module: DataTypes.STRING, 
    description: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'historials' });

module.exports = Historial;