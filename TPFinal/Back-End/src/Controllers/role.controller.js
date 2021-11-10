const role =  require('../DB/models/role');
require('dotenv').config();
const sequelize = require('../DB/db');
const { QueryTypes } = require('sequelize');

export const GetAll = (req, res) =>{

    let query;
    if(req.role.toLowerCase() === ('full admin').toLowerCase()){
        query = "state = 1";
    }
    else if(req.role.toLowerCase() === ('admin').toLowerCase()){
        query = "state = 1 and  id <> 4";
    }
    else{
        query = "state = 1 and  id <> 4 and id <> 1";
    }
    sequelize.query(`SELECT id, name, description, state FROM roles rol  where ${query}`, { type: QueryTypes.SELECT })
    .then(result =>{
        res.json(result);
    }); 
}

export const GetById = (req, res) =>{  
    const {
        id
    } = req.params;
    role.findOne({
        attributes: ['id', 'name', 'description', 'state'],
        where: {
            id: id
        }
    }).then(result => {
        res.json(result);
    });    
}

export const Post = (req, res) =>{
    const { name, description} = req.body;
    role.create({
        id: 0, name: name,
        description: description,
        state: 1
    }).then(p => {
        if(p[0] === 0){          
            return res.json({
                status: parseInt(process.env.success_code),
                title: 'exito',
                message:'El role fue guardado con exito'
            });
        }
        else{
            return res.json(err);
        }
    })   
}

export const Put = (req, res) =>{
    const { name, description } = req.body;
    const { id } = req.params;
    role.update({
        name: name,
        description: description
    }, {
        where: {
            id: id,
        }
    }).then((response) =>{ 
        if(response[0] === 0){
            res.json({
                status:  parseInt(process.env.success_code),
                message:'El role fue modificado con exito'
            });
        }
        else{
            res.json({
                status:  parseInt(process.env.error_code),
                message:'El role no fue modificado con exito ',response
            });
        }
    })
    .catch((err) =>{
        res.json(err);
    });
}

export const Delete = (req, res) =>{  
    const { id } = req.params;
    role.update({state: 2},
        {where: {id: id}
    }).then((response) =>{ 
        res.json({
            status: parseInt(process.env.success_code),
            message:'El role fue eliminado con exito'
        });
    })
    .catch((err) =>{
        return res.json(err);
    });
}