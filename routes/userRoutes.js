const { Router } = require('express');
const userController = require('../controllers/userController');
const router = Router();

//endpoints usuarios
router.post('/login', userController.postLogin);
router.post('/register', userController.postRegister);

module.exports = router;