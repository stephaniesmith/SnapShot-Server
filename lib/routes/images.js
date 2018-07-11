const router = require('express').Router(); /* eslint-disable-line */
const { respond, getParam } = require('./route-helpers');
const Image = require('../models/Image');
const createEnsureAuth = require('../util/ensure-auth');

module.exports = router

    .param('id', getParam)

    .post('/', createEnsureAuth(),respond(
        ({ body }) => Image.create(body)
    ))

    .get('/', respond(
        ({ query }) => Image.findByQuery(query)
    ))
    
    .get('/:id', respond(
        ({ id }) => Image.findDetailById(id)
    ))
    
    .put('/:id', respond(
        ({ id, body }) => Image.updateById(id, body)
    ))
    
    .delete('/:id', respond(
        ({ id }) => Image.findByIdAndRemove(id)
    ));