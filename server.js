// C:\projetChatGPT\backend\server.js

const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const corsOptions = {
  origin: 'https://localhost:3000',
  credentials: true, // Permettre l'envoi des cookies si nécessaire
  allowedHeaders: ['Authorization', 'Content-Type'], // Ajouter l'en-tête Authorization
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Sécurisation avec HTTPS
const privateKey = fs.readFileSync(process.env.SSL_PRIVATE_KEY_PATH, 'utf8');
const certificate = fs.readFileSync(process.env.SSL_CERTIFICATE_PATH, 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log(`Le serveur fonctionne en toute sécurité sur le port ${PORT}`);
});

// Initialisation de la base de données
const sequelize = new Sequelize(process.env.DB_DEV, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

// Synchronisation de la base de données
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie.');
        return sequelize.sync(); // Synchronisation des modèles
    })
    .then(() => {
        console.log('Base de données synchronisée.');
    })
    .catch(error => {
        console.error('Impossible de se connecter à la base de données :', error);
    });