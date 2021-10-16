import * as encripto from '../Helpers/Cryptographies';
import config from '../config/config';
import jwt from 'jsonwebtoken';
const auth =  require('../DB/models/auth');
const sequelize = require('../DB/db');
const { QueryTypes } = require('sequelize');

export const SignIn = (req, res) =>{   
    const { userName, userPass} = req.body;  
    sequelize.query(`SELECT acc.id, acc.idUser, acc.idRole, acc.userName, acc.userPass, rol.name as role FROM accounts acc inner join roles rol on acc.idRole = rol.id where userName ="${userName}" and acc.state=1`, { type: QueryTypes.SELECT })
    .then(account =>{
        if (account.length == 0)
        {   
            return res.status(400).json({
                error:"No encontrado",                    
                message:"Usuario incorrecto"
            });
        }
        else{
            encripto.compare(userPass,account[0].userPass).then((response)=>
            {
                if(!response){
                    return res.status(401).json({
                        error:"No encontrado",                    
                        message:"contraseña incorrecta",
                        token:""
                    });
                }
                else
                { 
                    const token = jwt.sign(
                        {
                            idaccount:account[0].id, 
                            role:account[0].role, 
                            idRole:account[0].idRole, 
                            iduser:account[0].idUser
                        },
                        config.SECRET,{
                            expiresIn:86400 // vence en un dia
                        }
                    );
                    return res.status(200).json({token});
                }  
            })
        }
    });      
}

export const GetById = (req, res) =>{    
    
    // const { id } = req.params;
    // mysqlconnection.query('SELECT * FROM accounts where state = 1 and id =?',[id], (err, rows, fields) =>{
    //     if(!err){
    //         res.json(rows[0]);
    //     }
    //     else{
    //         res.json(err);
    //     }
    // });    
}

export const Put = (req, res) =>{
    // const { idUser, userPass } = req.body;
    // const { id } = req.params; 
    // encripto.encryptPassword(userPass).then(val =>{  
    //     mysqlconnection.query(`UPDATE accounts SET userPass = '${val}' WHERE id =${[id]}`, (err, rows, fields) =>{
    //         if(!err){
    //             res.json({
    //                 status: 201,
    //                 message:'La contraeña ha sido modificada con exito'
    //             });
    //         }
    //         else{
    //             return res.json(err);
    //         }
    //     });
    // });
}