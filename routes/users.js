// backend/routes/users.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Obtenir tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
});

// Ajouter un utilisateur
router.post('/', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Validation des données
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        // Créer un nouvel utilisateur
        const newUser = await User.create({ firstName, lastName, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'L\'email doit être unique.' });
        }
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
    }
});

// Autres routes (par exemple, pour modifier ou supprimer un utilisateur)

module.exports = router;
