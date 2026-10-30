import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import candidatoRoutes from './src/routes/candidatoRoutes.js';
import votoRoutes from './src/routes/votoRoutes.js';
import viewRoutes from './src/routes/viewRoutes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use('/api/candidatos', candidatoRoutes);
app.use('/api/votos', votoRoutes);
app.use('/', viewRoutes);

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada.',
    caminho: req.originalUrl
  });
});

export default app;
