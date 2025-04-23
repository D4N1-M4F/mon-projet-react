import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Setup __dirname pour ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Servir les fichiers statiques dans le dossier "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuration du stockage d’image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `image-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

//  Route d’upload d’image
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier image reçu' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ filename: req.file.filename, url: imageUrl });
});

// Test
app.get('/', (req, res) => {
  res.send('API SN Boutique en ligne (ESM)');
});

app.get('/api/produits/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM produits WHERE id_Produit = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Produit introuvable' });
    res.json(results[0]);
  });
});


// GET : Récupérer tous les produits
app.get('/api/produits', (req, res) => {
  db.query('SELECT * FROM produits', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST : Ajouter un produit
app.post('/api/produits', (req, res) => {
  console.log(' Données reçues :', req.body);
  const { nom, descriptions, prix, stock, categorie, image } = req.body;
  const sql = 'INSERT INTO produits (nom, descriptions, prix, stock, categorie, image) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [nom, descriptions, prix, stock, categorie, image], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ success: true, insertedId: result.insertId });
  });
});

// DELETE : Supprimer un produit
app.delete('/api/produits/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM produits WHERE id_Produit = ?', [id], (err) => {
    if (err) {
      console.error('Erreur SQL :', err);
      return res.status(500).json({ error: err });
    }
    res.json({ success: true });
  });
});

//  Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Serveur en cours sur http://localhost:${PORT}`);
});
