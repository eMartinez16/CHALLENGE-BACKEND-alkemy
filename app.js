const express = require('express');
const app = express();
const charRoutes = require('./routes/characterRoutes');
const db = require('./db');

const dbS = db.getDbInstance();
app.set('view engine', 'ejs');
app.listen(3000);

app.get('/', (req, res) => {
    const result = db.getAllData();
    res.render('index');
});

app.use('/characters', charRoutes);