const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');
import kayak from '../models/kayak';

class KayakType extends Model {}
KayakType.init({ 
    id:{
        type: DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        unique:true,
        primaryKey: true,
    },   
    accountId:{ 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'accounts',
          key: 'id'
        }
    },   
    name: DataTypes.STRING, 
    description: DataTypes.STRING(5000),
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'kayaktypes' });

module.exports = KayakType;