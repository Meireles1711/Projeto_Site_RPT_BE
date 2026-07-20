const express = require('express');
const controller = require('../controllers/usuarios.controllers');

const router = express.Router();

router.post('/', controller.login);

module.exports = router;
