const router = require('express').Router(); /* eslint-disable-line */
const { respond, getParam } = require('./route-helpers');
const Album = require('../models/Album');
const createEnsureAuth = require('../util/ensure-auth');

module.exports = router

    .param('id', getParam)

    .post('/', createEnsureAuth(), respond(
        ({ body }) => Album.create(body)
    ))

    .get('/', respond(
        ({ query }) => Album.findByQuery(query)
    ))

    .get('/:id', respond(
        ({ id }) => Album.getDetailById(id)
    ))

    .put('/:id', respond(
        ({ id, body }) => Album.updateById(id, body)
    ));