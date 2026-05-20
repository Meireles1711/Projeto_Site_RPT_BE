const express = require('express');
const controller = require('../controllers/likes.controllers');

const router = express.Router();

router.post('/:postId', controller.curtir)

module.exports = router;