import {Router} from 'express';
import {authjwt, validator} from '../Middlewares'
import * as locationcontroller from '../Controllers/location.contoller';
const router = Router();

//Get All user
router.get('/',locationcontroller.GetAll);

//Get by id
router.get('/:id', locationcontroller.GetById);

//Create
router.post('/',[validator.checkLocationNoneRepeat],locationcontroller.Post);

//Update
router.put('/:id',[authjwt.verifyToken, authjwt.isAdmin], locationcontroller.Put);

//Delete
router.delete('/:id',[authjwt.verifyToken, authjwt.isAdmin], locationcontroller.Delete);

module.exports = router;