import { Router } from 'express';
import CandidatoController from '../controllers/candidatoController.js';
import VotoController from '../controllers/votoController.js';

const router = Router();

router.get('/', (req, res) => res.redirect('/candidatos'));

// Rotas de visualização (Views EJS)
router.get('/candidatos', CandidatoController.renderizarPagina);
router.get('/votos', VotoController.renderizarPagina);

// Suporte adicional às operações CRUD também sem o prefixo /api
router.get('/candidatos/:id', CandidatoController.buscarPorId);
router.post('/candidatos', CandidatoController.criar);
router.put('/candidatos/:id', CandidatoController.atualizar);
router.patch('/candidatos/:id', CandidatoController.atualizar);
router.delete('/candidatos/:id', CandidatoController.excluir);
router.post('/votos', VotoController.criar);

export default router;
