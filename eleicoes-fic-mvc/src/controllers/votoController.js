import Candidato from '../models/Candidato.js';
import Voto from '../models/Voto.js';

class VotoController {
  listar = (req, res) => {
    const votosComCandidato = Voto.listar().map(voto => {
      const candidato = Candidato.buscarPorId(voto.candidatoId);
      return {
        ...voto,
        candidatoNome: candidato ? candidato.nome : 'Candidato não encontrado',
        candidatoNumero: candidato ? candidato.numero : null,
        candidatoPartido: candidato ? candidato.partido : null
      };
    });

    return res.status(200).json(votosComCandidato);
  };

  criar = (req, res) => {
    const { candidatoId } = req.body ?? {};

    if (candidatoId === undefined || candidatoId === '') {
      return res.status(400).json({ erro: 'Informe o candidatoId.' });
    }

    const candidato = Candidato.buscarPorId(candidatoId);
    if (!candidato) {
      return res.status(404).json({ erro: 'O candidato informado não existe.' });
    }

    const voto = Voto.criar(candidato.id);

    if (req.headers.accept && req.headers.accept.includes('text/html') && !req.originalUrl.startsWith('/api/')) {
      return res.redirect('/votos');
    }

    return res.status(201).json({
      ...voto,
      candidatoNome: candidato.nome,
      candidatoNumero: candidato.numero,
      candidatoPartido: candidato.partido
    });
  };

  renderizarPagina = (req, res) => {
    const candidatos = Candidato.listar().map(candidato => ({
      ...candidato,
      totalVotos: Voto.contarPorCandidato(candidato.id)
    }));

    const votos = Voto.listar().map(voto => {
      const candidato = Candidato.buscarPorId(voto.candidatoId);
      return {
        ...voto,
        candidatoNome: candidato ? candidato.nome : 'Candidato não encontrado',
        candidatoNumero: candidato ? candidato.numero : '-',
        candidatoPartido: candidato ? candidato.partido : '-',
        dataFormatada: new Date(voto.data).toLocaleString('pt-BR')
      };
    });

    return res.render('votos', { votos, candidatos });
  };
}

export default new VotoController();
