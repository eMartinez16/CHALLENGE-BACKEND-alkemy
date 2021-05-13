const { Router } = require('express');
const router = Router();
const characterController = require('../controllers/characterController');

router.get('/', characterController.list);
router.get('/:id', characterController.detail);
router.delete('/:id', characterController.delCharacter);
router.post('/', characterController.create);
router.patch('/:id', characterController.update);
module.exports = router;