# Eleições FIC MVC — Exercícios 1 e 2

Projeto didático desenvolvido para a disciplina de Node.js (UC01 - Padrão MVC). Utiliza **Node.js**, **Express**, **ES Modules (`import`/`export`)**, **arquitetura MVC** e **EJS** para renderização de views.

## 1. Como instalar e executar

1. Certifique-se de ter o **Node.js** instalado.
2. No terminal, entre na pasta do projeto e instale as dependências:

```bash
cd eleicoes-fic-mvc
npm install
npm start
```

*(Observação: você também pode executar `npm start` diretamente na pasta raiz do repositório).*

3. Com o servidor iniciado, acesse no navegador:
   - Página de Candidatos (EJS): `http://localhost:3000/candidatos`
   - Página de Votos (EJS): `http://localhost:3000/votos`
   - API JSON de Candidatos: `http://localhost:3000/api/candidatos`
   - API JSON de Votos: `http://localhost:3000/api/votos`

O projeto utiliza armazenamento em memória (arrays estáticos nos Models), conforme solicitado na atividade de MVC, sem dependência obrigatória de banco de dados externo.

---

## 2. Estrutura MVC do Projeto

```text
eleicoes-fic-mvc/
├── public/
│   └── style.css                     # Estilos das páginas EJS
├── src/
│   ├── models/
│   │   ├── Candidato.js              # Regras e dados de candidatos (CRUD em memória)
│   │   └── Voto.js                   # Regras, contagem e registro de votos
│   ├── controllers/
│   │   ├── candidatoController.js    # Validações, respostas JSON e renderização de candidatos.ejs
│   │   └── votoController.js         # Validações, respostas JSON e renderização de votos.ejs
│   ├── routes/
│   │   ├── candidatoRoutes.js        # Rotas REST de candidatos (/api/candidatos)
│   │   ├── votoRoutes.js             # Rotas REST de votos (/api/votos)
│   │   └── viewRoutes.js             # Rotas das páginas EJS (/candidatos e /votos)
│   └── views/
│       ├── partials/
│       │   ├── header.ejs            # Cabeçalho e menu de navegação
│       │   └── footer.ejs            # Rodapé padrão
│       ├── candidatos.ejs            # Página EJS de listagem e votação rápida de candidatos
│       └── votos.ejs                 # Página EJS de listagem e formulário de votos
├── client.http                       # Requisições prontas para teste (REST Client)
├── index.js                          # Configuração do Express, middlewares, EJS e rotas
├── server.js                         # Inicialização do servidor HTTP na porta 3000
└── package.json                      # Configuração do projeto e ES Modules ("type": "module")
```

---

## 3. Exercício 1 — API REST (JSON)

Todas as rotas `/api` retornam respostas em formato **JSON** com os códigos de status HTTP adequados (`200`, `201`, `400`, `404`, `409`).

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/candidatos` | Lista todos os candidatos e seus totais de votos |
| `GET` | `/api/candidatos/:id` | Consulta um candidato específico pelo ID |
| `POST` | `/api/candidatos` | Cadastra um novo candidato |
| `PUT` | `/api/candidatos/:id` | Atualiza os dados de um candidato |
| `PATCH` | `/api/candidatos/:id` | Atualiza parcialmente os dados de um candidato |
| `DELETE` | `/api/candidatos/:id` | Exclui um candidato (desde que não possua votos) |
| `GET` | `/api/votos` | Lista todos os votos registrados |
| `POST` | `/api/votos` | Registra um novo voto para um candidato existente |

### Exemplo: criar candidato (`POST /api/candidatos`)

Cabeçalho: `Content-Type: application/json`

```json
{
  "nome": "Daniel Rocha",
  "partido": "Partido do Esporte",
  "numero": 40
}
```

### Exemplo: atualizar candidato (`PUT /api/candidatos/1`)

Cabeçalho: `Content-Type: application/json`

```json
{
  "nome": "Ana Costa Atualizada",
  "partido": "Partido da Educação",
  "numero": 11
}
```

### Exemplo: registrar voto (`POST /api/votos`)

Cabeçalho: `Content-Type: application/json`

```json
{
  "candidatoId": 1
}
```

> **Regras de validação implementadas:**
> - Não é permitido cadastrar dois candidatos com o mesmo número (`HTTP 409`).
> - O voto só é registrado se o `candidatoId` pertencer a um candidato existente (`HTTP 404` caso não exista).
> - Não é permitido excluir um candidato que já recebeu votos (`HTTP 409`).

---

## 4. Exercício 2 — Views com EJS

- `GET /candidatos`: acionada pelo `CandidatoController.renderizarPagina`, renderiza `src/views/candidatos.ejs` exibindo os cartões de cada candidato, número, partido, ID, total de votos recebidos e botão para votar.
- `GET /votos`: acionada pelo `VotoController.renderizarPagina`, renderiza `src/views/votos.ejs` exibindo o formulário para registrar voto e a tabela com todos os votos computados.

