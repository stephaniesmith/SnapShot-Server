const { assert } = require('chai');
const User = require('../../lib/models/User');
const { getErrors } = require('./helpers');

describe('User model', () => {
    const data = {
        name: 'Steven',
        email: 'steven@gemsrock.com'
    };

    const password = 'abc';

    it('generates hash from password', () => {
        const steven = new User(data);
        steven.generateHash(password);
        assert.ok(steven.hash);
        assert.notEqual(steven.hash, password);
    });

    it('compares password to hash', () => {
        const steven = new User(data);
        steven.generateHash(password);
        assert.isOk(steven.comparePassword(password)); 
    });

    it('valid and good model', () => {
        const steven = new User(data);
        data._id = steven._id;
        assert.deepEqual(steven.toJSON(), data);
    });

    it('username is required', () => {
        const user = new User({});
        const errors = getErrors(user.validateSync(), 3);
        assert.equal(errors.name.kind, 'required');
        assert.equal(errors.email.kind, 'required');
        assert.equal(errors.hash.kind, 'required');
    });
});