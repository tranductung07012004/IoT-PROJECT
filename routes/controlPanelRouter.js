const express = require('express');
const controller = require('../controllers/controlPanelController');
const router = express.Router();

router.get('/', controller.getDefaultLicensePlate);

router.get('/license-plates/:in_out', controller.getLatestLicensePlate);

router.get('/license-plates/:index/:in_out/:arrow', controller.getLicensePlateByIndex);
module.exports = router;