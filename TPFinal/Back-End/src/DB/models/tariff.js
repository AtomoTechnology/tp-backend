const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Tariff extends Model {}
Tariff.init({ 
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
    kayakTypeId:{ 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'kayakTypes',
          key: 'id'
        }
    },   
    amount: DataTypes.DECIMAL, 
    description: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'tariffs' });

module.exports = Tariff;