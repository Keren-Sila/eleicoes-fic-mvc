import Candidato from '../models/Candidato.js';
import Voto from '../models/Voto.js';

class CandidatoController {
  listar = (req, res) => {
    const candidatos = Candidato.listar().map(candidato => ({
      ...candidato,
      totalVotos: Voto.contarPorCandidato(candidato.id)
    }));
    return res.status(200).json(candidatos);
  };

  buscarPorId = (req, res) => {
    const candidato = Candidato.buscarPorId(req.params.id);
    if (!candidato) {
      return res.status(404).json({ erro: 'Candidato não encontrado.' });
    }
    return res.status(200).json({
      ...candidato,
      totalVotos: Voto.contarPorCandidato(candidato.id)
    });
  };

  criar = (req, res) => {
    const { nome, partido, numero } = req.body ?? {};

    if (typeof nome !== 'string' || !nome.trim() || typeof partido !== 'string' || !partido.trim() || numero === undefined || numero === '') {
      return res.status(400).json({
        erro: 'Informe nome, partido e numero.'
      });
    }

    if (!Number.isInteger(Number(numero)) || Number(numero) < 1) {
      return res.status(400).json({ erro: 'O número do candidato deve ser um inteiro positivo.' });
    }

    const numeroExistente = Candidato.buscarPorNumero(numero);
    if (numeroExistente) {
      return res.status(409).json({ erro: 'Já existe um candidato cadastrado com este número.' });
    }

    const candidato = Candidato.criar({ nome: String(nome), partido: String(partido), numero });
    return res.status(201).json(candidato);
  };

  atualizar = (req, res) => {
    const { nome, partido, numero } = req.body ?? {};

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

    const candidatoAtual = Candidato.buscarPorId(req.params.id);
    if (!candidatoAtual) {
      return res.status(404).json({ erro: 'Candidato não encontrado.' });
    }

    if (numero !== undefined) {
      const outroComMesmoNumero = Candidato.buscarPorNumero(numero);
      if (outroComMesmoNumero && outroComMesmoNumero.id !== candidatoAtual.id) {
        return res.status(409).json({ erro: 'Já existe outro candidato cadastrado com este número.' });
      }
    }

    const candidato = Candidato.atualizar(req.params.id, req.body);
    return res.status(200).json(candidato);
  };

  excluir = (req, res) => {
    const id = Number(req.params.id);
    const possuiVotos = Voto.contarPorCandidato(id) > 0;

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

  renderizarPagina = (req, res) => {
    const candidatos = Candidato.listar().map(candidato => ({
      ...candidato,
      totalVotos: Voto.contarPorCandidato(candidato.id)
    }));

    return res.render('candidatos', { candidatos });
  };
}

export default new CandidatoController();
