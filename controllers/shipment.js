const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const api = require('../api.js');

let addresses = {};

exports.getIndex = (req, res) => {
  res.render('index', {
    pageTitle: 'Home'
  })
};

exports.getShippingPage = (req, res) => {
  res.render('shipment', {
    shipping: null,
    addressId: null,
    isSent: false,
    destination: null,
    pageTitle: 'Shipment',
    hasError: false,
    errorMessages: null
  });
};

exports.postShippingInfo = async (req, res, next) => {
  const address = req.body.address;
  const city = req.body.city;
  const province = req.body.province;
  const postalCode = req.body.postalcode.trim();
  const country = req.body.country;
  const destination = {
    address_line_one: address,
    city: city,
    province: province,
    postalCode: postalCode,
    country: country
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(`errors: ${JSON.stringify(errors.array())}`);
    return res.render('shipment', {
      shipping: null,
      addressId: null,
      isSent: false,
      destination: destination,
      pageTitle: 'Shipment',
      hasError: true,
      errorMessages: errors.array()
    });
  }

  const id = uuidv4();
  addresses[id] = destination;
  try {
    let shippingInfo = await api.getBestRate(destination);
    // throw new Error('BROKE');
    res.render('shipment', {
      shipping: shippingInfo,
      addressId: id,
      isSent: true,
      destination: destination,
      pageTitle: 'Shipment',
      hasError: false,
      errorMessages: null
    });
  } catch (err) {
    console.log('requestBestShipping');
    // console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postShipment = async (req, res, next) => {
    const id = req.body.shippingId;
    const description = req.body.shippingDescription
    const shipping = {
      id: id,
      description: description
    };
    const addressId = req.body.addressId;
    const destination = addresses[addressId];
    try {
      let order = await api.sendShipment(shipping, destination);
      res.render('thank-you', {
        order: order,
        pageTitle: 'Thank You',
      });
    } catch (err) {
      console.log('postShipment');
      console.log(err);
      next(err);
    }
};