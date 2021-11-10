const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Hanger extends Model {}
Hanger.init({ 
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true
    },   
    idLocation: DataTypes.BIGINT, 
    nrohanger: DataTypes.INTEGER,
    description: DataTypes.STRING,
    creationDate:DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'hangers' });
module.exports = Hanger;