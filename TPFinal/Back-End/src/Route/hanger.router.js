import {Router} from 'express';
import {authjwt, validator} from '../Middlewares'
import * as ctrl from '../Controllers/hanger.controller';
const router = Router();

//Get All user
router.get('/',[authjwt.verifyToken, authjwt.isAdmin],ctrl.GetAll);

//Get by id
router.get('/:id',[authjwt.verifyToken, authjwt.isAdmin], ctrl.GetById);

//Create
router.post('/',[authjwt.verifyToken,validator.checkNroHangerNoneRepeat, authjwt.isAdmin],ctrl.Post);

//Update
router.put('/:id',[authjwt.verifyToken, authjwt.isAdmin], ctrl.Put);

//Delete
router.delete('/:id',[authjwt.verifyToken, authjwt.isAdmin], ctrl.Delete);

module.exports = router;