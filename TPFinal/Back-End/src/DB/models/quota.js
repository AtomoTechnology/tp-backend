const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Quota extends Model {}
Quota.init({ 
    id:{
        type: DataTypes.BIGINT,
        allowNull:false,
        autoIncrement: true,
        unique:true,
        primaryKey: true,
    },   
    calendarId:{ 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'calendaryears',
          key: 'id'
        }
    },   
    numberquato: DataTypes.INTEGER, 
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'quotas' });

module.exports = Quota;