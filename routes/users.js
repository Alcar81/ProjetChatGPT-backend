// backend/routes/users.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Obtenir tous les utilisateurs
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// Ajouter un utilisateur
router.post('/', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const newUser = await User.create({ firstName, lastName, email, password });
    res.status(201).json(newUser);
});

// Autres routes (par exemple, pour modifier ou supprimer un utilisateur)

module.exports = router;
