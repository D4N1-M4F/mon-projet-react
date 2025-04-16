// db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion MySQL:', err.stack);
    return;
  }
  console.log('✅ Connecté à la base MySQL avec succès !');
});

export default connection;
