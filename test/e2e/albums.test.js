const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Album E2E API', () => {

    before(() => dropCollection('albums'));
    before(() => dropCollection('users'));

    let token = null;

    before(() => {
        return request
            .post('/api/auth/signup')
            .send({
                name: 'Please Post',
                email: 'test@test.com',
                password: 'xyz'
            })
            .then(({ body }) => token = body.token);
    });

    let janelle = {
        title: 'Kitten',
        description: 'Something cute',
        posterImage: 'http://www.domusfelium.co.uk/faith_kitten_blue_silver_8_weeks.jpg'
    };

    it('posts an album', () => {
        return request.post('/api/albums')
            .set('Authorization', token)
            .send(janelle)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal( __v, 0);
                assert.deepEqual(body, {
                    ...janelle,
                    _id,
                    __v
                });
                janelle = body;
            });
    });

    it('gets all albums', () => {
        return request.get('/api/albums')
            .then(({ body }) => {
                assert.deepEqual(body, [janelle]);
            });
    });

});