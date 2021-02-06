const express = require('express');

const shipmentController = require('../controllers/shipment');

const router = express.Router();

router.get('/', shipmentController.getIndex);

router.get('/shipment', shipmentController.getShippingPage);

router.post('/shipment', shipmentController.requestBestShipping);

router.post('/send-shipment', shipmentController.postShipment);

module.exports = router;