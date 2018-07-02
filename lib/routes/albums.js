const router = require('express').Router(); /* eslint-disable-line */
const { respond } = require('./route-helpers');
const Album = require('../models/Album');
const createEnsureAuth = require('../util/ensure-auth');

module.exports = router

    .post('/', createEnsureAuth(), respond(
        ({ body }) => {
            return Album.create(body);
        }
    ))

    .get('/', respond(
        () => {
            return Album.find()
                .lean();
        }
    ));