import { Router } from 'express';
import AlunoController from '../controllers/AlunoController.js'
import loginRequired from '../middlewares/loginRequired.js'

const router = new Router();

router.get('/', loginRequired, AlunoController.index);

router.post('/', loginRequired, AlunoController.create);

router.put('/', loginRequired, AlunoController.update);

router.delete('/', loginRequired, AlunoController.delete);


export default router;