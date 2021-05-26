import * as encripto from '../Helpers/Cryptographies'
import mysqlconnection from '../DB/db'; 
export const getUser = (req, res) =>{
    mysqlconnection.query('SELECT * FROM users where state = 1',(err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }
        else{
            console.log(err);
        }
    });    
}
export const getUserById = (req, res) =>{    
        const { id } = req.params;
    mysqlconnection.query('SELECT * FROM users where state = 1 and id =?',[id], (err, rows, fields) =>{
        if(!err){
            res.json(rows[0]);
        }
        else{
            console.log(err);
        }
    });    
}
export const createUser = (req, res) =>{
    const { id, firstName, lastName, address, phone, userName, userPass, idRole } = req.body;
    const query = `
    CALL CreateOrUpdateUser(?, ?, ?, ?, ?, ?, ?, ?);
    `
    const pass = ""; 
    encripto.encryptPassword(userPass).then(val =>{
        mysqlconnection.query(query,[id, firstName, lastName, address, phone, idRole, userName, val], (err, rows, fields) =>{
            if(!err){          
                return res.json({
                    status: 201,
                    message:'El usuario fue guardo con exito'
                });
            }
            else{
                console.log(err);
            }
        });
    });
   
}
export const updateUser = (req, res) =>{
    const { firstName, lastName, address, phone } = req.body;
    const { id } = req.params;
    const query = `
    CALL CreateOrUpdateUser(?, ?, ?, ?, ?);
    `
    mysqlconnection.query(query,[id, firstName, lastName, address, phone], (err, rows, fields) =>{
        if(!err){
            res.json({
                status: 201,
                message:'El usuario fue modificado con exito'
            });
        }
        else{
            console.log(err);
        }
    });
}
export const deleteUser = (req, res) =>{  
    const { id } = req.params;
    mysqlconnection.query('UPDATE users SET state = 2 WHERE id =?',[id], (err, rows, fields) =>{
        if(!err){
            res.json({
                status: 201,
                message:'El usuario fue eliminado con exito'
            });
        }
        else{
            console.log(err);
        }
    });
}