import { Router } from 'express';
import Candidato from '../models/Candidato.js';
import Voto from '../models/Voto.js';

const router = Router();

router.get('/', (req, res) => res.redirect('/candidatos'));

router.get('/candidatos', (req, res) => {
  res.render('candidatos', { candidatos: Candidato.listar() });
});

router.get('/votos', (req, res) => {
  const votos = Voto.listar().map(voto => {
    const candidato = Candidato.buscarPorId(voto.candidatoId);
    return {
      ...voto,
      candidatoNome: candidato ? candidato.nome : 'Candidato não encontrado',
      dataFormatada: new Date(voto.data).toLocaleString('pt-BR')
    };
  });

  res.render('votos', { votos });
});

export default router;
