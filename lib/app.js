const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./util/error-handler');

require('./models/register-plugin');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

const auth = require('./routes/auth');
const albums = require('./routes/albums');
const images = require('./routes/images');

app.use('/api/auth', auth);
app.use('/api/albums', albums);
app.use('/api/images', images);

app.use((req, res) => {
    res.sendFile('index.html', { root: './public' });
});

app.use(errorHandler());

module.exports = app;