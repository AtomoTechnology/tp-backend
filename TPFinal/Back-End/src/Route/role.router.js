import {Router} from 'express';
import {authjwt, validator} from '../Middlewares'
import * as rolepecontroller from '../Controllers/role.controller';
const router = Router();

//Get All user
router.get('/',[authjwt.verifyToken, authjwt.isAdmin],rolepecontroller.GetALl);

//Get by id
router.get('/:id',[authjwt.verifyToken, authjwt.isAdmin], rolepecontroller.GetById);

//Create
router.post('/',[authjwt.verifyToken, validator.checkRoleExisted, authjwt.isAdmin],rolepecontroller.Post);

//Update
router.put('/:id',[authjwt.verifyToken, authjwt.isAdmin,validator.checkRoleUpdateExisted], rolepecontroller.Put);

//Delete
router.delete('/:id',[authjwt.verifyToken, authjwt.isAdmin], rolepecontroller.Delete);

module.exports = router;