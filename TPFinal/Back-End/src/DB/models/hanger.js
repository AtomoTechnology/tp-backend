const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Hanger extends Model {}
Hanger.init({ 
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
    locationId:{ 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'locations',
          key: 'id'
        }
    }, 
    nrohanger: DataTypes.INTEGER,
    description: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'hangers' });
module.exports = Hanger;