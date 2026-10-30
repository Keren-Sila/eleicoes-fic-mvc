# Eleições FIC MVC — Exercícios 1 e 2

Projeto didático baseado no PDF da aula UC01 - MVC. Usa Node.js, Express, ES Modules, classes, arquitetura MVC e EJS.

## Como executar

1. Instale o Node.js.
2. Abra esta pasta no VS Code.
3. No terminal, execute:

```bash
npm install
npm start
```

4. Acesse `http://localhost:3000`.

O projeto usa armazenamento em memória, sem banco de dados. Os candidatos de exemplo e os votos são reiniciados quando o servidor é encerrado.

## Exercício 1 — API REST (JSON)

Todas as rotas `/api` retornam JSON.

| Método | Rota | Função |
|---|---|---|
| GET | `/api/candidatos` | Lista todos os candidatos |
| GET | `/api/candidatos/:id` | Busca um candidato |
| POST | `/api/candidatos` | Cria um candidato |
| PUT | `/api/candidatos/:id` | Atualiza os dados do candidato |
| PATCH | `/api/candidatos/:id` | Atualiza parcialmente os dados do candidato |
| DELETE | `/api/candidatos/:id` | Exclui um candidato |
| GET | `/api/votos` | Lista todos os votos |
| POST | `/api/votos` | Registra um voto |

### Exemplo: criar candidato

Envie `POST /api/candidatos` com o cabeçalho `Content-Type: application/json` e corpo:

```json
{
  "nome": "Daniel Rocha",
  "partido": "Partido do Esporte",
  "numero": 40
}
```

### Exemplo: registrar voto

Envie `POST /api/votos` com:

```json
{
  "candidatoId": 1
}
```

O voto só é registrado se o candidato existir. Para manter a consistência dos dados, não é possível excluir um candidato que já recebeu votos (resposta HTTP 409).

## Exercício 2 — Views EJS

- `GET /candidatos`: renderiza a view `src/views/candidatos.ejs`.
- `GET /votos`: renderiza a view `src/views/votos.ejs`.

As views usam dados dos Models e apresentam páginas HTML. As rotas da API continuam retornando JSON.

## Estrutura MVC

- `src/models/`: classes `Candidato` e `Voto`, responsáveis pelos dados.
- `src/controllers/`: recebe as requisições, valida os dados e coordena a operação.
- `src/routes/`: define os caminhos HTTP.
- `src/views/`: páginas EJS do exercício 2.
- `index.js`: configura Express, middlewares e rotas.
- `server.js`: inicia o servidor.

## Observação sobre os dados

O enunciado não especifica os campos dos candidatos e votos. Para este exemplo, cada candidato possui `id`, `nome`, `partido` e `numero`; cada voto possui `id`, `candidatoId` e `data`. Os nomes e partidos iniciais são fictícios e servem apenas para demonstrar o funcionamento.
