const { Model, DataTypes } = require('sequelize');
const sequelize =  require('../db');

class Payment extends Model {}
Payment.init({ 
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
    paymentTypeId:{ 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'paymentTypes',
          key: 'id'
        }
    },   
    kayakId:{ 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'kayaks',
          key: 'id'
        }
    },   
    tariffId:{ 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'tariffs',
          key: 'id'
        }
    },   
    quotaId:{ 
        type: DataTypes.BIGINT(11),
        allowNull: false, 
        references: {
          model: 'quotas',
          key: 'id'
        }
    }, 
    description: DataTypes.STRING,
    creationDate: DataTypes.DATE,
    finalDate: DataTypes.DATE,
    state: DataTypes.INTEGER 
},
{ sequelize, modelName: 'payments' });
module.exports = Payment;