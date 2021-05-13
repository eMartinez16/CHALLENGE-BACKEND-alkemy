const { Router } = require('express');
const router = Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.list);
router.get('/:id', movieController.detail);
router.post('/', movieController.create);
router.patch('/:id', movieController.modify);
router.delete('/:id', movieController.delMovie);

module.exports = router;