import {Router} from 'express';
import {authjwt, validator} from '../Middlewares'
import * as documentTypecontroller from '../Controllers/documentType.controller';
const router = Router();

//Get All user
router.get('/',[authjwt.verifyToken, authjwt.isAdmin],documentTypecontroller.GetALl);

//Get by id
router.get('/:id',[authjwt.verifyToken, authjwt.isAdmin], documentTypecontroller.GetById);

//Create
router.post('/',[authjwt.verifyToken, validator.checkDocumentNoneRepeat, authjwt.isAdmin],documentTypecontroller.Post);

//Update
router.put('/:id',[authjwt.verifyToken, authjwt.isAdmin,validator.checkDocuUpdateExisted], documentTypecontroller.Put);

//Delete
router.delete('/:id',[authjwt.verifyToken, authjwt.isAdmin], documentTypecontroller.Delete);

module.exports = router;