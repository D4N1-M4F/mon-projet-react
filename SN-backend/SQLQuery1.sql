-- Base: SN 
-- CREATE DATABASE IF NOT EXISTS SN;

-- Supprimer les tables dans l'ordre inverse des dépendances
DROP TABLE IF EXISTS Audit;
DROP TABLE IF EXISTS LigneCommande;
DROP TABLE IF EXISTS Paiement;
DROP TABLE IF EXISTS Commande;
DROP TABLE IF EXISTS Produit;
DROP TABLE IF EXISTS produits;
DROP TABLE IF EXISTS Client;
DROP TABLE IF EXISTS Administrateur;

-- Table Administrateur
CREATE TABLE Administrateur (
  id_Adminstrateur INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50),
  email VARCHAR(50) UNIQUE NOT NULL,
  motDePasse VARCHAR(64) NOT NULL
);
CREATE INDEX idx_admin_email ON Administrateur(email);

-- Table Client
CREATE TABLE Client (
  id_Client INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50),
  email VARCHAR(50) UNIQUE NOT NULL,
  motDePasse VARCHAR(64) NOT NULL,
  adresse VARCHAR(100),
  telephone VARCHAR(15)
);
CREATE INDEX idx_client_email ON Client(email);

-- Table Produits
CREATE TABLE produits (
  id_Produit INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50),
  descriptions VARCHAR(500) NOT NULL,
  prix DECIMAL(10,2) CHECK (prix >= 0),
  stock INT CHECK (stock >= 0),
  categorie VARCHAR(25) NOT NULL,
  UNIQUE(nom)
);
CREATE INDEX idx_produit_nom ON produits(nom);
CREATE INDEX idx_produit_categorie ON produits(categorie);

-- Table Commande
CREATE TABLE Commande (
  id_Commande INT AUTO_INCREMENT PRIMARY KEY,
  dateCommande DATE,
  montantTotal DECIMAL(10,2),
  statut VARCHAR(20) CHECK (statut IN ('en attente', 'validée', 'expédiée', 'annulée')),
  id_Client INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_Client) REFERENCES Client(id_Client) ON DELETE CASCADE
);
CREATE INDEX idx_commande_date ON Commande(dateCommande);
CREATE INDEX idx_commande_client ON Commande(id_Client, dateCommande);

-- Table Paiement
CREATE TABLE Paiement (
  id_Paiement INT AUTO_INCREMENT PRIMARY KEY,
  montant DECIMAL(10,2),
  datePaiement DATE,
  methode VARCHAR(30) CHECK (methode IN ('Carte', 'Paypal', 'Virement')),
  id_Commande INT,
  FOREIGN KEY (id_Commande) REFERENCES Commande(id_Commande) ON DELETE CASCADE,
  UNIQUE(id_Commande)
);
CREATE INDEX idx_paiement_date ON Paiement(datePaiement);

-- Table LigneCommande
CREATE TABLE LigneCommande (
  id_LigneCommande INT AUTO_INCREMENT PRIMARY KEY,
  quantité INT CHECK (quantité > 0),
  sous_Total DECIMAL(10,2),
  id_Produit INT,
  id_Commande INT,
  FOREIGN KEY (id_Commande) REFERENCES Commande(id_Commande) ON DELETE CASCADE,
  FOREIGN KEY (id_Produit) REFERENCES produits(id_Produit) ON DELETE CASCADE
);
CREATE INDEX idx_lignecommande_produit ON LigneCommande(id_Produit, id_Commande);

-- Table Audit
CREATE TABLE Audit (
  id_Audit INT AUTO_INCREMENT PRIMARY KEY,
  action VARCHAR(255) NOT NULL,
  dateAction DATETIME DEFAULT CURRENT_TIMESTAMP,
  id_Adminstrateur INT,
  FOREIGN KEY (id_Adminstrateur) REFERENCES Administrateur(id_Adminstrateur) ON DELETE SET NULL
);
