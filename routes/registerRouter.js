const express = require('express');
const router = express.Router();
const controller = require('../controllers/registerController');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/save', controller.getRegisterData);

module.exports = router;