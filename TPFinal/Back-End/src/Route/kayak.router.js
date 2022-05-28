import {Router} from 'express';
import {authjwt, validator} from '../Middlewares'
import * as ctl from '../Controllers/kayak.controller';
const router = Router();

try {
    
} catch (error) {
    
}
//Get All user
router.get('/',ctl.GetAll);

//Get by id
router.get('/:id', ctl.GetById);

//Create
router.post('/',[authjwt.verifyToken, authjwt.isAdmin, validator.isValidSizeImg],ctl.Post);

//Update
router.put('/:id',[authjwt.verifyToken, authjwt.isAdmin, validator.isValidSizeImg], ctl.Put);

//Delete
router.delete('/:id',[authjwt.verifyToken, authjwt.isAdmin], ctl.Delete);

module.exports = router;