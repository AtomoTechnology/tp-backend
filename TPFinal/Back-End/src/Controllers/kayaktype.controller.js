const kayakType =  require('../DB/models/kayakType');
import kayak from '../DB/models/kayak';
require('dotenv').config(); 

export const GetAll = (req, res) =>{
    kayakType.findAll({
        attributes: ['id', 'name', 'description', 'creationDate', 'state'],
        include: kayak ,
        where: {
            state: 1
        },
        order: [
            ['id', 'DESC'],
        ]
    }).then(result => {
        res.json(result);
    });    
}

export const GetById = (req, res) =>{    
    const { id } = req.params;
    kayakType.findOne({
        attributes: ['id', 'name', 'description', 'creationDate', 'state'],
        include: kayak ,
        where: {
            id: id,
            state: 1
        }
    }).then(result => {
        res.json(result);
    });      
}

export const Post = (req, res) =>{

    const { name, description} = req.body;
    const tiempoTranscurrido = Date.now();
    const today = new Date(tiempoTranscurrido);
    kayakType.create({
        name: name,
        description: description,
        creationDate: today,
        state: 1
    }).then(p => {          
        return res.json({
            status: parseInt(process.env.success_code),
            title: 'Crear tipo kayak',
            message:'El tipo de kayak fue guardado con exito'
        });
    })
    .catch((err) =>{
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error crear tipo kayak',
            message:'El tipo de kayak no fue guardado con ',err
        });
    });
   
}
export const Put = (req, res) =>{

    const { name, description } = req.body;
    const { id } = req.params;
    kayakType.update({
        name: name,
        description: description
    }, {
        where: {
            id: id,
        }
    }).then((response) =>{ 
        return res.json({
            status:  parseInt(process.env.success_code),
            title: 'Actualizar tipo kayak',
            message:'El tipo de kayak fue modificado con exito'
        });
    })
    .catch((err) =>{
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error actualizar tipo kayak',
            message:'Lel tipo de kayak no fue modificada con exito ',err
        });
    });
}
export const Delete = (req, res) =>{  
    const { id } = req.params;
    kayakType.update({state: 2},
        {where: {id: id}
    }).then((response) =>{ 
        return res.json({
            status: parseInt(process.env.success_code),
            title: 'Eliminar tipo kayak',
            message:'El tipo de kayak fue eliminado con exito'
        });
    })
    .catch((err) =>{        
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error eliminar tipo kayak',
            message:'El tipo de kayak no fue eliminada ',err
        });
    });
}