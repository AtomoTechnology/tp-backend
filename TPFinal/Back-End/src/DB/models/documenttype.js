const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Documenttype extends Model {}
Documenttype.init({ 
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true
    },   
    name: DataTypes.STRING, 
    description: DataTypes.STRING,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'documenttypes' });
module.exports = Documenttype;