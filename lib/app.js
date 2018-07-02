const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./util/error-handler');


require('./models/register-plugin');

app.use(morgan('dev'));
app.use(cors());

const auth = require('./routes/auth');
const albums = require('./routes/albums');
const images = require('./routes/images');


app.use(express.json());

app.use('/api/auth', auth);
app.use('/api/albums', albums);
app.use('/api/images', images);

app.use(errorHandler());

module.exports = app;