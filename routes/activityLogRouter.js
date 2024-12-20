const express = require('express');
const router = express.Router();
const controller = require('../controllers/activityLogController');

router.get('/', (req, res) => {
  res.locals.pageTitle = 'Activity Log';
  res.render('activityLog');
});

router.post('/send-mail', controller.sendMail);

module.exports = router;