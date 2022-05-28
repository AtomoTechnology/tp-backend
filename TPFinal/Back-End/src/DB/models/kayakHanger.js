const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class KayakHanger extends Model {}
KayakHanger.init({ 
    id:{
      type: DataTypes.BIGINT,
      allowNull:false,
      autoIncrement: true,
      unique:true,
      primaryKey: true,
    },
    hangerId: { 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'hangers',
          key: 'id'
        }
    },
    kayakId: { 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'kayaks',
          key: 'id'
        }
    },
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER   
},
{ sequelize, modelName: 'kayakHangers' });

module.exports = KayakHanger;