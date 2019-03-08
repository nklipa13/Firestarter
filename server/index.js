const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./db');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/api', routes);

app.listen(9999, () => console.log('Server listening on port 9999'));