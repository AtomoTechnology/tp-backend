import * as encripto from '../Helpers/Cryptographies';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import Account  from '../DB/models/account';
import role from '../DB/models/role';
require('dotenv').config();

const sequelize = require('../DB/db');
const { QueryTypes } = require('sequelize');

export const SignIn = (req, res) =>{ 
    const { userName, userPass} = req.body;  
    Account.findOne({
        attributes: ['id', 'userId', 'roleId', 'userName','userPass'],
        include:[
            {
                model: role, 
                as: 'roleAcc',              
                where:{
                    state: 1
                },
                required: true
            }] ,
        where: {
            state: 1,
            userName: userName
        }
    })
    .then(account =>{
        if (!account)
        {   
            return res.json({
                status: parseInt(process.env.server_notfount_code),
                error:"No encontrado",                    
                message:"Usuario incorrecto"
            });
        }
        else{
            encripto.compare(userPass,account.dataValues.userPass).then((response)=>
            {
                if(!response){
                    return res.json({
                        status: parseInt(process.env.server_notfount_code),
                        error:"No encontrado",                    
                        message:"contraseña incorrecta",
                        token:""
                    });
                }
                else
                { 
                    const token = jwt.sign(
                        {
                            idaccount:account.dataValues.id, 
                            role:account.dataValues.roleAcc.dataValues.name, 
                            idRole:account.dataValues.roleId, 
                            iduser:account.dataValues.userId
                        },
                        config.SECRET,{
                            expiresIn:86400 // vence en un dia
                        }
                    );
                    
        console.log("itoken ",token);
                    return res.json({
                        status: parseInt(process.env.success_code),
                        token: token
                    });
                }  
            })
        }
    });      
}

export const GetAll = (req, res) => {
    Account.findAll({
        attributes: ['id', 'userName', 'userId', 'roleId', 'state'],
        where: {
            state: 1
        },
        order: [
            ['id', 'DESC'],
        ]
    }).then(result => {
        res.json(result);
    })
}

export const GetById = (req, res) =>{        
    const {
        id
    } = req.params;
    Account.findOne({
        attributes: ['id', 'userName', 'userId', 'roleId', 'state'],
        where: {
            id: id,
            state: 1
        }
    }).then(result => {
        res.json(result);
    });  
}

export const Put = (req, res) =>{
    const { newUserPass } = req.body;   
    const { id } = req.params;
    encripto.encryptPassword(newUserPass).then(val => {
        Account.update({
            userPass: val
        }, {
            where: {
                id: id
            }
        }).then((response) =>{ 
            if(response){
                res.json({
                    status:  parseInt(process.env.success_code),
                    message:'La contraeña ha sido modificada con exito'
                });
            }
            else{
                res.json(response);
            }
        })
        .catch((err) =>{
            res.json(err);
        })
    });;
}