import {Router} from 'express';
import {authjwt, validator} from '../Middlewares'
import * as ctl from '../Controllers/kayak.controller';
const router = Router();

//Get All user
router.get('/',ctl.GetAll);

//Get by id
router.get('/:id', ctl.GetById);

//Create
router.post('/',[validator.checkLocationNoneRepeat],ctl.Post);

//Update
router.put('/:id',[authjwt.verifyToken, authjwt.isAdmin], ctl.Put);

//Delete
router.delete('/:id',[authjwt.verifyToken, authjwt.isAdmin], ctl.Delete);

module.exports = router;