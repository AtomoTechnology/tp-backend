
import * as encripto from '../Helpers/Cryptographies';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import mysqlconnection from '../DB/db'; 

export const signin = (req, res) =>{    
    const { userName, userPass} = req.body;
    mysqlconnection.query('SELECT *, rol.name as role FROM accounts acc inner join roles rol on acc.idRole = rol.id where userName =? and acc.state =?',[userName, 1],(err, rows, fields) =>{
        if(!err){
            const userfound = rows[0];
            if(!userfound)
            {
                return res.status(400).json({
                    error:"No encontrado",                    
                    message:"Usuario incorrecto"
                });
            }
            else{ 
                const pass = encripto.compare(userPass,userfound.userPass);
                if(!pass){
                    return res.status(401).json({
                        error:"No encontrado",                    
                        message:"contraseña incorrecta",
                        token:""
                    });
                }
                else{ 
                    const token = jwt.sign(
                        {
                            idaccount:userfound.id, 
                            role:userfound.role, 
                            idRole:userfound.idRole, 
                            iduser:userfound.idUser
                        },
                        config.SECRET,{
                            expiresIn:86400 // vence en un dia
                        }
                    );
                    return res.status(200).json({token});
                }            
            }
        }
        else{
            return res.status(400).json({
                error:"Error",                    
                message:"No se pude establecer la conexion"
            });
        }
    });    
}

export const GetById = (req, res) =>{    
    const { id } = req.params;
    mysqlconnection.query('SELECT * FROM accounts where state = 1 and id =?',[id], (err, rows, fields) =>{
        if(!err){
            res.json(rows[0]);
        }
        else{
            res.json(err);
        }
    });    
}

export const Put = (req, res) =>{
    const { idUser, userPass } = req.body;
    const { id } = req.params; 
    encripto.encryptPassword(userPass).then(val =>{  
        mysqlconnection.query(`UPDATE accounts SET userPass = '${val}' WHERE id =${[id]}`, (err, rows, fields) =>{
            if(!err){
                res.json({
                    status: 201,
                    message:'La contraeña ha sido modificada con exito'
                });
            }
            else{
                return res.json(err);
            }
        });
    });
}