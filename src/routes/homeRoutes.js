import { Router } from 'express';
import homeController from '../controllers/HomeController.js'

const router = new Router();

router.get('/alunos', homeController.index);

router.post('/alunos', homeController.create);


export default router;