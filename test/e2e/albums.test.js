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

    let kitten = {
        title: 'Kitten',
        description: 'Something cute',
        posterImage: 'http://www.domusfelium.co.uk/faith_kitten_blue_silver_8_weeks.jpg'
    };

    it('posts an album', () => {
        return request.post('/api/albums')
            .set('Authorization', token)
            .send(kitten)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal( __v, 0);
                assert.deepEqual(body, {
                    ...kitten,
                    _id,
                    __v
                });
                kitten = body;
            });
    });

    it('gets all albums', () => {
        return request.get('/api/albums')
            .then(({ body }) => {
                assert.deepEqual(body, [kitten]);
            });
    });

    it('updates an album', () => {
        kitten.description = 'A cute Kitten';
        return request.put(`/api/albums/${kitten._id}`)
            .set('Authorization', token)
            .send(kitten)
            .then(({ body }) => {
                assert.deepEqual(body, kitten);
            });
    });

    it('finds an album by id', () => {
        return request.get(`/api/albums/${kitten._id}`)
            .set('Authorization', token)
            .then(({ body }) => {
                assert.deepEqual(body, kitten);
            });
    });

});