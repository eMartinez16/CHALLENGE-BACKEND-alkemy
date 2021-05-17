const { Router } = require('express');
const router = Router();
const movieController = require('../controllers/movieController');
const verifyToken = require('../verifyToken');

router.get('/', movieController.list);
router.get('/:id', movieController.detail);
router.post('/', verifyToken, movieController.create);
router.patch('/:id', verifyToken, movieController.modify);
router.delete('/:id', verifyToken, movieController.delMovie);

module.exports = router;