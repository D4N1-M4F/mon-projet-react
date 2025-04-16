
CREATE DATABASE SN;


CREATE TABLE Administrateur (
id_Adminstrateur SMALLINT PRIMARY KEY,
nom VARCHAR (50),
email VARCHAR (50) UNIQUE NOT NULL,
motDePasse VARCHAR(64) NOT NULL
);

CREATE INDEX idx_admin_email ON Administrateur(email);

CREATE TABLE Client (
id_Client SMALLINT PRIMARY KEY,
nom VARCHAR (50),
email VARCHAR (50) UNIQUE NOT NULL,
motDePasse VARCHAR(64) NOT NULL,
adresse VARCHAR (100),
telephone VARCHAR(15)
);

CREATE INDEX idx_client_email ON Client(email);

CREATE TABLE Produit (
id_Produit SMALLINT PRIMARY KEY,
nom VARCHAR (50),
descriptions VARCHAR(500) NOT NULL,
prix DECIMAL(10,2),
stock INT,
categorie VARCHAR (25) NOT NULL
);

CREATE INDEX idx_produit_nom ON Produit(nom);
CREATE INDEX idx_produit_categorie ON Produit(categorie);

ALTER TABLE Produit 
ADD CONSTRAINT chk_prix_produit 
CHECK (prix >= 0);

ALTER TABLE Produit 
ADD CONSTRAINT chk_stock_produit 
CHECK (stock >= 0);

ALTER TABLE Produit ADD CONSTRAINT unique_nom UNIQUE (nom);

CREATE TABLE Commande (
id_Commande SMALLINT PRIMARY KEY,
dateCommande DATE,
montantTotal DECIMAL(10,2),
statut VARCHAR (20),
id_Client SMALLINT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_Client) REFERENCES Client (id_Client) ON DELETE CASCADE
);

CREATE INDEX idx_commande_date ON Commande(dateCommande);
CREATE INDEX idx_commande_client ON Commande(id_Client, dateCommande);

ALTER TABLE Commande 
ADD CONSTRAINT chk_statut_commande 
CHECK (statut IN ('en attente', 'validée', 'expédiée', 'annulée'));

CREATE TABLE Paiement (
id_Paiement SMALLINT PRIMARY KEY,
montant DECIMAL(10,2),
datePaiement DATE,
methode VARCHAR (30),
id_Commande SMALLINT,
FOREIGN KEY (id_Commande) REFERENCES Commande (id_Commande) ON DELETE CASCADE
);

CREATE INDEX idx_paiement_date ON Paiement(datePaiement);

ALTER TABLE Paiement 
ADD CONSTRAINT chk_methode_paiement 
CHECK (methode IN ('Carte', 'Paypal', 'Virement'));

ALTER TABLE Paiement ADD CONSTRAINT unique_id_commande UNIQUE (id_Commande);

CREATE TABLE LigneCommande (
id_LigneCommande SMALLINT PRIMARY KEY,
quantité INT,
sous_Total DECIMAL(10,2),
id_Produit SMALLINT,
id_Commande SMALLINT,
FOREIGN KEY (id_Commande) REFERENCES Commande (id_Commande) ON DELETE CASCADE,
FOREIGN KEY (id_Produit) REFERENCES Produit (id_Produit) ON DELETE CASCADE
);

CREATE INDEX idx_lignecommande_produit ON LigneCommande(id_Produit, id_Commande);

ALTER TABLE LigneCommande 
ADD CONSTRAINT chk_quantite_ligne 
CHECK (quantité > 0);

CREATE TABLE Audit (
id_Audit INT AUTO_INCREMENT PRIMARY KEY,
action VARCHAR(255) NOT NULL,
dateAction DATETIME DEFAULT CURRENT_TIMESTAMP,
id_Adminstrateur SMALLINT,
FOREIGN KEY (id_Adminstrateur) REFERENCES Administrateur(id_Adminstrateur) ON DELETE SET NULL
);