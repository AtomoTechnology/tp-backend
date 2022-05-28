import jwt from 'jsonwebtoken';
import config from '../config/config';
require('dotenv').config();

const role = require('../DB/models/role');
const Account = require('../DB/models/account');

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
        
        Account.findOne({
            attributes: ['id', 'userName', 'userId', 'state'],
            where: {
                state: 1,
                id: req.id
            }
        })
        .then( result =>{            
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
        role.findOne({
            attributes: ['id', 'name', 'description', 'state'],
            where: {
                state: 1,
                name: req.role
            }
        }).then(result => {
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