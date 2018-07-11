const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Image E2E API', () => {

    before(() => dropCollection('images'));
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

    let KittenOne = {
        title: 'Kitten',
        description: 'Something cute',
        url: 'http://www.domusfelium.co.uk/faith_kitten_blue_silver_8_weeks.jpg',
    };

    let KittenTwo = {
        title: 'Kitten Two',
        description: 'Something cute!!!!!!!!!',
        url: 'http://www.domusfelium.co.uk/faith_kitten_blue_silver_8_weeks.jpg',
    };

    const janelle = {
        title: 'Kitten',
        description: 'Something cute',
        posterImage: 'http://www.domusfelium.co.uk/faith_kitten_blue_silver_8_weeks.jpg'
    };

    const someAlbum = {
        title: 'this is an album',
        description: 'album stuff',
        posterImage: 'http://www.domusfelium.co.uk/faith_kitten_blue_silver_8_weeks.jpg'
    };

    before(() => {
        return request.post('/api/albums')
            .set('Authorization', token)
            .send(janelle)
            .then(({ body }) => {
                janelle._id = body._id;
                KittenOne.albumId = body._id;
            });
    });

    before(() => {
        return request.post('/api/albums')
            .set('Authorization', token)
            .send(someAlbum)
            .then(({ body }) => {
                someAlbum._id = body._id;
                KittenTwo.albumId = body._id;
            });
    });

    before(() => {
        return request.post('/api/images')
            .set('Authorization', token)
            .send(KittenTwo)
            .then(({ body }) => {
                KittenTwo = body;
            });
    });

    it('posts an image', () => {
        return request.post('/api/images')
            .set('Authorization', token)
            .send(KittenOne)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal( __v, 0);
                assert.deepEqual(body, {
                    ...KittenOne,
                    _id,
                    __v
                });
                KittenOne = body;
            });
    });

    it('gets all images', () => {
        return request.get('/api/images')
            .then(({ body }) => {
                assert.deepEqual(body, [KittenTwo, KittenOne]);
            });
    });

    it('gets images by album id', () => {
        return request.get(`/api/images?albumId=${someAlbum._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, [KittenTwo]);
            });
    });

    it('gets image by id', () => {
        return request.get(`/api/images/${KittenOne._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, KittenOne);
            });
    });

    it('updates an image by id', () => {
        KittenOne.description = 'A cute kitten';
        return request.put(`/api/images/${KittenOne._id}`)
            .send(KittenOne)
            .then(({ body}) => {
                assert.deepEqual(body, KittenOne);
            });
    });

});