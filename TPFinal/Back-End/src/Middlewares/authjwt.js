
import jwt from 'jsonwebtoken';
import config from '../config/config';
import mysqlconnection from '../DB/db'; 

export const verifyToken = async(req, res, next) =>{   
    try {
        const token = req.headers["x-access-token"];
        if(!token){
            return res.status(403).json({
                error:"token",
                message:"Token requiere"
            });
        }
        
        const decode = jwt.verify(token, config.SECRET);

        req.id = decode.id;
        const userExist =  mysqlconnection.query('SELECT * FROM users where state = 1 and id =?',[req.id]); 
        if(!userExist){
            return res.status(404).json({
                error:"error",
                message:"Usuario no encontrado"
            });
        }
        next();
    }
    catch (e) {
        return res.status(403).json({
            error:"token",
            message:"No autorizado"
        });
    }
};

export const isAdmin = async(req, res, next) => {
    try {        
        const userExist =  mysqlconnection.query('SELECT * FROM roles rol where state = 1 and .id =?',[req.body.idRole]); 
        if(userExist.name.toLowerCase() === ("admin").toLowerCase()){
            next();
            return;
        }
        else{
            return res.status(403).json({
                error:"error",
                message:"Requiere acceso administrativo"
            });  
        }
    } 
    catch (error) {
        return res.status(403).json({
            error:"error",
            message:"Acceso no permitido"
        });
    }
}