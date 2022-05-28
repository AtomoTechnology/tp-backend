const kayak =  require('../DB/models/kayak');
import kayaktype from '../DB/models/kayakType';
require('dotenv').config(); 
import User from '../DB/models/user';

export const GetAll = (req, res) =>{
    kayak.findAll({
        attributes: ['id', 'userId', 'accountId', 'KayaktypeId','nroKayak', 'img','shovelQuantity','crewmember','creationDate', 'state'],
        include:[
            {
                model: User,
                as: "userKayak",
                where: {
                    state: parseInt(process.env.Activated)
                },
                required: false
            },
            {
                model: kayaktype,
                as: "typeKayak",
                where: {
                    state: parseInt(process.env.Activated)
                },
                required: false
            }
        ],
        where: {
            state: 1
        }
    }).then(result => {
        res.json(result);
    });    
}

export const GetById = (req, res) =>{    
    const { id } = req.params;
    kayak.findOne({
        attributes: ['id', 'userId', 'accountId','KayaktypeId','nroKayak', 'img','shovelQuantity','crewmember','creationDate', 'state'],
        include:[
            {
                model: User,
                as: "userKayak",
                where: {
                    state: parseInt(process.env.Activated)
                },
                required: false
            },
            {
                model: kayaktype,
                as: "typeKayak",
                where: {
                    state: parseInt(process.env.Activated)
                },
                required: false
            }
        ],
        where: {
            id: id,
            state: 1
        }
    }).then(result => {
        res.json(result);
    });      
}

export const Post = (req, res) =>{

    try {
        const { userId,accountId, KayaktypeId,nroKayak, img,shovelQuantity,crewmember} = req.body;
        const tiempoTranscurrido = Date.now();
        const today = new Date(tiempoTranscurrido);

        kayak.create({
            id: 0,accountId: accountId,userId: userId,kayakTypeId:KayaktypeId,shovelQuantity:shovelQuantity,
            nroKayak:nroKayak,crewmember:crewmember,
            creationDate: today,img:img,
            state: 1
        }).then(p => {          
            return res.json({
                status: parseInt(process.env.success_code),
                title: 'Crear kayak',
                message:'El kayak fue guardado con exito'
            });
        })
    } catch (error) {
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error crear kayak',
            message:'El kayak no fue guardado ',error
        });
    }   
}
export const Put = (req, res) =>{

    const { userId,accountId, KayaktypeId,nroKayak, img,shovelQuantity,crewmember} = req.body;
    const { id } = req.params;
    kayak.update({
        userId: userId,KayakTypeId:KayaktypeId,shovelQuantity:shovelQuantity,
        accountId: accountId,nroKayak:nroKayak,crewmember:crewmember,img:img,
    }, {
        where: {
            id: id,
        }
    }).then((response) =>{ 
        return res.json({
            status:  parseInt(process.env.success_code),
            title: 'Actualizar kayak',
            message:'El kayak fue modificado con exito'
        });
    })
    .catch((err) =>{
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error actualizar kayak',
            message:'El kayak no fue modificado con exito ',err
        });
    });
}
export const Delete = (req, res) =>{  
    const { id } = req.params;
    kayak.update({state: 2},
        {where: {id: id}
    }).then((response) =>{ 
        return res.json({
            status: parseInt(process.env.success_code),
            title: 'Eliminar kayak',
            message:'El kayak fue eliminado con exito'
        });
    })
    .catch((err) =>{        
        return res.json({
            status:  parseInt(process.env.error_code),
            title: 'Error eliminar kayak',
            message:'El kayak no fue eliminado ',err
        });
    });
}