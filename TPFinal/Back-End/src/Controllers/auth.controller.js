
import * as encripto from '../Helpers/Cryptographies';
import config from '../config/config';
import jwt from 'jsonwebtoken';
import mysqlconnection from '../DB/db'; 
export const signin = (req, res) =>{    
    const { userName, userPass} = req.body;
    mysqlconnection.query('SELECT * FROM login where userName =? and state =?',[userName, 1],(err, rows, fields) =>{
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
                    const token = jwt.sign({id:userfound.id},config.SECRET,{
                        expiresIn:86400 // vence en un dia
                    });
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