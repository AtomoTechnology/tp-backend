const location =  require('../DB/models/location');
require('dotenv').config(); 

export const GetAll = (req, res) =>{
    location.findAll({
        attributes: ['id', 'name', 'description', 'state'],
        where: {
            state: 1
        }
    }).then(result => {
        res.json(result);
    });    
}

export const GetById = (req, res) =>{    
    const { id } = req.params;
    location.findOne({
        attributes: ['id', 'name', 'description', 'state'],
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
    location.create({
        name: name,
        description: description,
        creationDate: today,
        state: 1
    }).then(p => {          
        return res.json({
            status: parseInt(process.env.success_code),
            title: 'Crear ubicacion',
            message:'La ubicación fue guarda con exito'
        });
    })
    .catch((err) =>{
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error crear ubicación',
            message:'La ubicación no fue guardada ',err
        });
    });
   
}
export const Put = (req, res) =>{

    const { name, description } = req.body;
    const { id } = req.params;
    location.update({
        name: name,
        description: description
    }, {
        where: {
            id: id,
        }
    }).then((response) =>{ 
        return res.json({
            status:  parseInt(process.env.success_code),
            title: 'Actualizar ubicación',
            message:'La ubicación fue modificada con exito'
        });
    })
    .catch((err) =>{
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error actualizar ubicación',
            message:'La ubicación no fue modificada con exito ',err
        });
    });
}
export const Delete = (req, res) =>{  
    const { id } = req.params;
    location.update({state: 2},
        {where: {id: id}
    }).then((response) =>{ 
        return res.json({
            status: parseInt(process.env.success_code),
            title: 'Eliminar ubicación',
            message:'La ubicación fue eliminada con exito'
        });
    })
    .catch((err) =>{        
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error eliminar ubicación',
            message:'La ubicación no fue eliminada ',err
        });
    });
}