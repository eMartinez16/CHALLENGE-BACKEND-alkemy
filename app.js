const express = require('express');
const app = express();

const charRoutes = require('./routes/characterRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', userRoutes);
app.use('/api/characters', charRoutes);

app.listen(3000);