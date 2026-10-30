import { Router } from 'express';
import VotoController from '../controllers/votoController.js';

const router = Router();

router.get('/', VotoController.listar);
router.post('/', VotoController.criar);

export default router;
