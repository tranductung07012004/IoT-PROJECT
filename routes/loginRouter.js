const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginController');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/login/check', controller.loginControl);

module.exports = router;