const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.locals.pageTitle = 'Activity Log';
  res.render('activityLog');
});

module.exports = router;