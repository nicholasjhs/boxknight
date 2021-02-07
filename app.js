const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');

const shipmentRoutes = require('./routes/shipment');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));;

app.use(shipmentRoutes);

// app.use((err, req, res) => {
//   console.log("hello");
//   const status = err.statusCode || 500;
//   const message = err.message;
//   const data = err.data;
//   res.status(status).json({message: message, data: data});
// });

app.listen(port, () => {
  console.log(`I'm listening on port ${port}`);
})