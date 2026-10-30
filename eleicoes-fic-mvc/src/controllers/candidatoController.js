import Candidato from '../models/Candidato.js';
import Voto from '../models/Voto.js';

class CandidatoController {
  listar = (req, res) => {
    return res.status(200).json(Candidato.listar());
  };

  buscarPorId = (req, res) => {
    const candidato = Candidato.buscarPorId(req.params.id);
    if (!candidato) {
      return res.status(404).json({ erro: 'Candidato não encontrado.' });
    }
    return res.status(200).json(candidato);
  };

  criar = (req, res) => {
    const { nome, partido, numero } = req.body;

    if (typeof nome !== 'string' || !nome.trim() || typeof partido !== 'string' || !partido.trim() || numero === undefined || numero === '') {
      return res.status(400).json({
        erro: 'Informe nome, partido e numero.'
      });
    }

    if (!Number.isInteger(Number(numero)) || Number(numero) < 1) {
      return res.status(400).json({ erro: 'O número do candidato deve ser um inteiro positivo.' });
    }

    const candidato = Candidato.criar({ nome: String(nome), partido: String(partido), numero });
    return res.status(201).json(candidato);
  };

  atualizar = (req, res) => {
    const { nome, partido, numero } = req.body;

    if (nome === undefined && partido === undefined && numero === undefined) {
      return res.status(400).json({ erro: 'Envie ao menos um campo para atualizar.' });
    }

    if (nome !== undefined && (typeof nome !== 'string' || !nome.trim())) {
      return res.status(400).json({ erro: 'O nome não pode ficar vazio.' });
    }

    if (partido !== undefined && (typeof partido !== 'string' || !partido.trim())) {
      return res.status(400).json({ erro: 'O partido não pode ficar vazio.' });
    }

    if (numero !== undefined && (!Number.isInteger(Number(numero)) || Number(numero) < 1)) {
      return res.status(400).json({ erro: 'O número do candidato deve ser um inteiro positivo.' });
    }

    const candidato = Candidato.atualizar(req.params.id, req.body);
    if (!candidato) {
      return res.status(404).json({ erro: 'Candidato não encontrado.' });
    }
    return res.status(200).json(candidato);
  };

  excluir = (req, res) => {
    const id = Number(req.params.id);
    const possuiVotos = Voto.listar().some(voto => voto.candidatoId === id);

    if (possuiVotos) {
      return res.status(409).json({
        erro: 'Não é possível excluir um candidato que já possui votos registrados.'
      });
    }

    const excluido = Candidato.excluir(id);
    if (!excluido) {
      return res.status(404).json({ erro: 'Candidato não encontrado.' });
    }

    return res.status(200).json({ mensagem: 'Candidato excluído com sucesso.' });
  };
}

export default new CandidatoController();
