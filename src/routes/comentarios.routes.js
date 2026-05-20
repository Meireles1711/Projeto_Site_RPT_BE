const express = require('express');
const controller = require('../controllers/comentarios.controllers')

const router = express.Router();

router.get('/:postId', controller.listarPorPost);
router.post('/:postId', controller.criar);

module.exports = router;