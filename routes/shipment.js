const express = require('express');
const { body } = require('express-validator');

const shipmentController = require('../controllers/shipment');

const router = express.Router();

router.get('/', shipmentController.getIndex);

router.get('/shipment', shipmentController.getShippingPage);

router.post(
    '/shipment',
    [
        body('postalcode')
            .matches(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i)
            .withMessage('Please enter a valid postal code'),
        body('address').trim().not().isEmpty(),
        body('city').trim().not().isEmpty(),
        body('province').trim().not().isEmpty(),
        body('country').trim().not().isEmpty(),

    ],
    shipmentController.postShippingInfo
);

router.post('/send-shipment', shipmentController.postShipment);

module.exports = router;