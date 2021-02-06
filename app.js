const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const shipmentRoutes = require('./routes/shipment');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(shipmentRoutes);

app.listen(port, () => {
  console.log(`I'm listening on port ${port}`);
})