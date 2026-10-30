export default class Voto {
  static dados = [];
  static proximoId = 1;

  static listar() {
    return this.dados;
  }

  static contarPorCandidato(candidatoId) {
    return this.dados.filter(voto => voto.candidatoId === Number(candidatoId)).length;
  }

  static criar(candidatoId) {
    const voto = {
      id: this.proximoId++,
      candidatoId: Number(candidatoId),
      data: new Date().toISOString()
    };

    this.dados.push(voto);
    return voto;
  }
}
