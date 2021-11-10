const hanger =  require('../DB/models/hanger');
require('dotenv').config(); 
const sequelize = require('../DB/db');
const { QueryTypes } = require('sequelize');

export const GetAll = (req, res) =>{
    sequelize.query(`SELECT hg.id, hg.idLocation, hg.nrohanger, hg.creationDate, loc.name as location, hg.description, hg.state FROM hangers hg 
    inner join  locations loc on hg.idLocation = loc.id  where hg.state = 1`, { type: QueryTypes.SELECT })
    .then(result =>{
        res.json(result);
    });  
}

export const GetById = (req, res) =>{    
    const { id } = req.params;
    hanger.findOne({
        attributes: ['id', 'idLocation', 'description', 'nrohanger','creationDate',  'state'],
        where: {
            id: id,
            state: 1
        }
    }).then(result => {
        res.json(result);
    });      
}

export const Post = (req, res) =>{

    const { idLocation, description,nrohanger} = req.body;
    const tiempoTranscurrido = Date.now();
    const today = new Date(tiempoTranscurrido);
    hanger.create({
        idLocation: idLocation,
        description: description,
        nrohanger:nrohanger,
        creationDate: today,
        state: 1
    }).then(p => {          
        return res.json({
            status: parseInt(process.env.success_code),
            title: 'Crear parche',
            message:'El parche fue guardado con exito'
        });
    })
    .catch((err) =>{
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error crear parche',
            message:'El parche no fue guardado ' + err
        });
    });
   
}
export const Put = (req, res) =>{

    const { idLocation, description,nrohanger} = req.body;
    const { id } = req.params;
    hanger.update({
        idLocation: idLocation,
        description: description,
        nrohanger:nrohanger
    }, {
        where: {
            id: id,
        }
    }).then((response) =>{ 
        return res.json({
            status:  parseInt(process.env.success_code),
            title: 'Actualizar parche',
            message:'El parche fue modificado con exito'
        });
    })
    .catch((err) =>{
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error actualizar parche',
            message:'El parche no fue modificado ',err
        });
    });
}

export const Delete = (req, res) =>{  
    const { id } = req.params;
    hanger.update({state: 2},
        {where: {id: id}
    }).then((response) =>{ 
        return res.json({
            status: parseInt(process.env.success_code),
            title: 'Eliminar parche',
            message:'El parchefue eliminado con exito'
        });
    })
    .catch((err) =>{        
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error eliminar parche',
            message:'El parche no fue eliminado ',err
        });
    });
}