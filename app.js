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
  res.render('index');
})

app.post('/address', (req, res) => {
  let address = req.body.address;
  api.getRates(address);
  res.render('index');
})

app.listen(port, () => {
  console.log(`I'm listening on port ${port}`);
})