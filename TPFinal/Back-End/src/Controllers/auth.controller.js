import * as encripto from '../Helpers/Cryptographies';
import config from '../config/config';
import jwt from 'jsonwebtoken';
const account = require('../DB/models/account');
import auth from '../DB/models/auth';
import role from '../DB/models/role';
require('dotenv').config();

const sequelize = require('../DB/db');
const { QueryTypes } = require('sequelize');

export const SignIn = (req, res) =>{ 
    const { userName, userPass} = req.body;  
    auth.findAll({
        attributes: ['id', 'userId', 'roleId', 'userName','userPass'],
        include: role ,
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
            console.log("ROle include: ",account[0].dataValues.role.dataValues.name);
            encripto.compare(userPass,account[0].dataValues.userPass).then((response)=>
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
                            idaccount:account[0].dataValues.id, 
                            role:account[0].dataValues.role.dataValues.name, 
                            idRole:account[0].dataValues.roleId, 
                            iduser:account[0].dataValues.userId
                        },
                        config.SECRET,{
                            expiresIn:86400 // vence en un dia
                        }
                    );
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
    account.findAll({
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
    account.findOne({
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
        account.update({
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