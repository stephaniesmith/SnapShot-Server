const { assert } = require('chai');
const { Types } = require('mongoose');
const { getErrors } = require('./helpers');
const Image = require('../../lib/models/Image');

describe('Image model', () => {
    
    it('valid good model', () => {
        const data = {
            title: 'Dirty Computer',
            description: 'The most awesome',
            url: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/DirtyComputer.png/220px-DirtyComputer.png',
            albumId: Types.ObjectId(), //eslint-disable-line
        };

        const image = new Image(data);
        data._id = image._id;
        assert.deepEqual(image.toJSON(), data);
        assert.isUndefined(image.validateSync());
    });

    it('image requires title, description, url, and albumId', () => {
        const image = new Image({});
        const errors = getErrors(image.validateSync(), 4);
        assert.equal(errors.title.kind, 'required');
        assert.equal(errors.description.kind, 'required');
        assert.equal(errors.url.kind, 'required');
        assert.equal(errors.albumId.kind, 'required');
    });

});