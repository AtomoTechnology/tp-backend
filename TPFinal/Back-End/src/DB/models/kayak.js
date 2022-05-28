const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Kayak extends Model {}
Kayak.init({ 
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
          model: 'kayaktypes',
          key: 'id'
        }
    },
    userId: { 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'users',
          key: 'id'
        }
    },   
    crewmember:DataTypes.INTEGER,
    shovelQuantity:DataTypes.INTEGER,
    nroKayak:DataTypes.STRING,
    img:DataTypes.TEXT,
    description:DataTypes.STRING,
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'kayaks' });


module.exports = Kayak;