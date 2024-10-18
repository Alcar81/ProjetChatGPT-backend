// backend/server.js

require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const cors = require('cors'); // Importer CORS
const { sequelize } = require('./models'); // Importer Sequelize si nécessaire
const app = express();
const userRoutes = require('./routes/users');

// Middleware
app.use(cors()); // Activer CORS
app.use(express.json()); // Pour analyser les corps de requête JSON

// Routes
app.use('/api/users', userRoutes); // Pour utiliser les routes des utilisateurs

// Synchroniser les modèles avec la base de données
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database: ', err));

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
