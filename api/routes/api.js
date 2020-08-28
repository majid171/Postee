const express = require('express');
const router = new express.Router();
const apiController = require('../controllers/api-controller');

router.get('', apiController.home);

module.exports = router;