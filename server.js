// backend/server.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

app.use(express.json()); // Pour analyser les corps de requête JSON
app.use('/api/users', userRoutes); // Pour utiliser les routes des utilisateurs

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
