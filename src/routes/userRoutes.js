import { Router } from 'express';
import UserController from '../controllers/UserController.js'
import loginRequired from '../middlewares/loginRequired.js'

const router = new Router();

router.get('/', loginRequired, UserController.index);

// router.get('/', loginRequired, UserController.show);


router.post('/', loginRequired, UserController.create);
router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);


export default router;