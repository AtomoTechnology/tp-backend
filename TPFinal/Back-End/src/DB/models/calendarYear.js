const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class CalendarYear extends Model {}
CalendarYear.init({ 
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
    namecalendar: DataTypes.STRING, 
    description: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'calendaryears' });

module.exports = CalendarYear;