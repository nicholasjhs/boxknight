const { v4: uuidv4 } = require('uuid');

const api = require('../api.js');

let addresses = {};

exports.getIndex = (req, res) => {
    res.render('index', {shipping: null});
};

exports.getShippingPage = (req, res) => {
    res.render('confirm', {shipping: null});
};

exports.requestBestShipping = async (req, res) => {
    const address = req.body.address;
    const city = req.body.city;
    const province = req.body.province;
    const postalCode = req.body.postalcode;
    const country = req.body.country;
    const destination = {
      address_line_one: address,
      city: city,
      province: province,
      postalCode: postalCode,
      country: country
    }
    const id = uuidv4();
    addresses[id] = destination;
    try {
      let shippingInfo = await api.getBestRate(destination)
      res.render('confirm', {shipping: shippingInfo, addressId: id});
    } catch (err) {
      console.log(err);
      next(err);
    }
};

exports.postShipment = async (req, res) => {
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
      res.render('thank-you', {order: order});
    } catch (err) {
      console.log(err);
      next(err);
    }
};