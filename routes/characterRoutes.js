const { Router } = require('express');
const router = Router();
const characterController = require('../controllers/characterController');
const verifyToken = require('../verifyToken');

router.get('/', characterController.list);
router.get('/:id', characterController.detail);
router.delete('/:id', verifyToken, characterController.delCharacter);
router.post('/', verifyToken, characterController.create);
router.patch('/:id', verifyToken, characterController.update);
module.exports = router;