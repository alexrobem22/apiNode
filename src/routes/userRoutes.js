import { Router } from 'express';
import UserController from '../controllers/UserController'
import loginRequired from '../middlewares/loginRequired'

const router = new Router();

router.get('/', loginRequired, UserController.index);

router.get('/', loginRequired, UserController.show);


router.post('/', loginRequired, UserController.create);
router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);


export default router;