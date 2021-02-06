const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const { v4: uuidv4 } = require('uuid');

const api = require('./api.js');

const app = express();
const port = 3000;

let addresses = {};

app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', {shipping: null});
})

app.get('/shipment', (req, res) => {
  res.render('confirm', {shipping: null});
})

app.post('/shipment', async (req, res) => {
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
})

app.post('/send-shipment', async (req, res) => {
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
})

app.listen(port, () => {
  console.log(`I'm listening on port ${port}`);
})