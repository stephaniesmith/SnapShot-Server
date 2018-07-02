const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('../util/mongoose-helpers');

const schema = new Schema({
    title: RequiredString,
    description: RequiredString,
    posterImage: RequiredString
});

module.exports = mongoose.model('Album', schema);
