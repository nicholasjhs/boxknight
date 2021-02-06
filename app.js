const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

const api = require('./api.js');

const app = express();
const port = 3000;

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
  let address = req.body.address;
  try {
    let shippingInfo = await api.getBestRate(address)
    res.render('confirm', {shipping: shippingInfo, address: address});
  } catch (err) {
    console.log(err);
    next(err);
  }
})

app.post('/send-shipment', async (req, res) => {
  let id = req.body.shippingId;
  let description = req.body.shippingDescription
  let shipping = {
    id: id,
    description: description
  };
  let address = req.body.address;
  try {
    let order = await api.sendShipment(shipping, address);
    res.render('thank-you', {order: order});
  } catch (err) {
    console.log(err);
    next(err);
  }
})

app.listen(port, () => {
  console.log(`I'm listening on port ${port}`);
})