import Candidato from '../models/Candidato.js';
import Voto from '../models/Voto.js';

class VotoController {
  listar = (req, res) => {
    const votosComCandidato = Voto.listar().map(voto => {
      const candidato = Candidato.buscarPorId(voto.candidatoId);
      return {
        ...voto,
        candidatoNome: candidato ? candidato.nome : 'Candidato não encontrado'
      };
    });

    return res.status(200).json(votosComCandidato);
  };

  criar = (req, res) => {
    const { candidatoId } = req.body;

    if (candidatoId === undefined || candidatoId === '') {
      return res.status(400).json({ erro: 'Informe o candidatoId.' });
    }

    const candidato = Candidato.buscarPorId(candidatoId);
    if (!candidato) {
      return res.status(404).json({ erro: 'O candidato informado não existe.' });
    }

    const voto = Voto.criar(candidato.id);
    return res.status(201).json({
      ...voto,
      candidatoNome: candidato.nome
    });
  };
}

export default new VotoController();
