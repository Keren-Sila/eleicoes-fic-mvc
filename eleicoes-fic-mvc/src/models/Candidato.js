export default class Candidato {
  static dados = [
    { id: 1, nome: 'Ana Costa', partido: 'Partido da Educação', numero: 10, foto: '/img/ana-costa.jpg' },
    { id: 2, nome: 'Bruno Lima', partido: 'Partido da Saúde', numero: 20, foto: '/img/bruno-lima.jpg' },
    { id: 3, nome: 'Carla Souza', partido: 'Partido da Cultura', numero: 30, foto: '/img/carla-souza.jpg' }
  ];

  static listar() {
    return this.dados;
  }

  static buscarPorId(id) {
    return this.dados.find(candidato => candidato.id === Number(id)) || null;
  }

  static buscarPorNumero(numero) {
    return this.dados.find(candidato => candidato.numero === Number(numero)) || null;
  }

  static criar(dados) {
    const novoId = this.dados.length
      ? Math.max(...this.dados.map(candidato => candidato.id)) + 1
      : 1;

    const candidato = {
      id: novoId,
      nome: String(dados.nome).trim(),
      partido: String(dados.partido).trim(),
      numero: Number(dados.numero),
      foto: dados.foto ? String(dados.foto).trim() : '/img/candidato-padrao.svg'
    };

    this.dados.push(candidato);
    return candidato;
  }

  static atualizar(id, dados) {
    const candidato = this.buscarPorId(id);
    if (!candidato) return null;

    if (dados.nome !== undefined) candidato.nome = String(dados.nome).trim();
    if (dados.partido !== undefined) candidato.partido = String(dados.partido).trim();
    if (dados.numero !== undefined) candidato.numero = Number(dados.numero);
    if (dados.foto !== undefined) candidato.foto = String(dados.foto).trim();

    return candidato;
  }

  static excluir(id) {
    const indice = this.dados.findIndex(candidato => candidato.id === Number(id));
    if (indice === -1) return false;

    this.dados.splice(indice, 1);
    return true;
  }
}
