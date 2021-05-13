const { Router } = require('express');
const router = Router();
const characterController = require('../controllers/characterController');

router.get('/', characterController.list);

module.exports = router;