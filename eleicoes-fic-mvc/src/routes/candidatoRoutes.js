import { Router } from 'express';
import CandidatoController from '../controllers/candidatoController.js';

const router = Router();

router.get('/', CandidatoController.listar);
router.get('/:id', CandidatoController.buscarPorId);
router.post('/', CandidatoController.criar);
router.put('/:id', CandidatoController.atualizar);
router.patch('/:id', CandidatoController.atualizar);
router.delete('/:id', CandidatoController.excluir);

export default router;
