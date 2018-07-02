const router = require('express').Router(); /* eslint-disable-line */
const { respond } = require('./route-helpers');
const Image = require('../models/Image');
const createEnsureAuth = require('../util/ensure-auth');

module.exports = router

    .post('/', createEnsureAuth(),respond(
        ({ body }) => {
            return Image.create(body);
        }
    ))

    .get('/', respond(
        ({ query }) => {
            return query ? Image.find(query).lean() : Image.find().lean();
        }
    ));