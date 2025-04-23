import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connection from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlPath = path.join(__dirname, 'SQLQuery1.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

connection.query(sql, (err, results) => {
  if (err) throw err;
  console.log(' SQL importé avec succès.');
  connection.end();
});
