import express from 'express';
import dotenv from 'dotenv';
import db from './db.js'; 

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API SN Boutique en ligne 🚀');
});

app.get('/produits', (req, res) => {
  db.query('SELECT * FROM produits', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur en cours sur http://localhost:${PORT}`);
});
