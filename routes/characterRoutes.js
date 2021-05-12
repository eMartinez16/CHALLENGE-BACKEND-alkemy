const { Router } = require('express');
const app = require('../app');
const router = Router();

router.get('/characters', (req, res) => {
    res.render('./charactersList');
});
module.exports = router;