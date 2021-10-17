import jwt from 'jsonwebtoken';
import config from '../config/config';
import mysqlconnection from '../DB/db';
const role = require('../DB/models/role');
const auth = require('../DB/models/auth');

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).json({
                error: "token",
                message: "Token requiere"
            });
        }

        const decode = jwt.verify(token, config.SECRET);

        req.id = decode.idaccount;
        req.role = decode.role;
        req.idRole = decode.idRole;

        // console.log("entrando verifyToken con id: ",req.id);
        auth.findOne({
            attributes: ['id', 'userName', 'idUser', 'state'],
            where: {
                state: 1,
                id: req.id
            }
        })
        .then( result =>{            
        // console.log("entrando verifyToken con result: ",result);
            if (result == null) {
                return res.status(404).json({
                    error: "error",
                    message: "Usuario no encontrado"
                });
            }
            next();
        });
    } catch (e) {
        return res.status(403).json({
            error: "token",
            message: "No autorizado"
        });
    }
};

export const isAdmin = async (req, res, next) => {
    try {        
        // console.log("entrando isAdmin con role: ",req.role);
        role.findOne({
            attributes: ['id', 'name', 'description', 'state'],
            where: {
                state: 1,
                name: req.role
            }
        }).then(result => {
            // console.log("entrando then isAdmin con role: ",result);
            if (result != null) {
                if (result.dataValues.name.toLowerCase() === ("admin").toLowerCase()) {
                    next();
                    return;
                } else {
                    return res.status(403).json({
                        error: "error",
                        message: "Requiere acceso administrativo"
                    });
                }
            } else {
                return res.status(403).json({
                    error: "error",
                    message: "Requiere acceso administrativo"
                });
            }
        })
    } catch (error) {
        return res.status(403).json({
            error: "error",
            message: "Acceso no permitido"
        });
    }
}