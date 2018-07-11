const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('../util/mongoose-helpers');

const schema = new Schema({
    title: RequiredString,
    description: RequiredString,
    url: RequiredString,
    albumId: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    }
});

schema.statics = {
    
    findByQuery(query) {
        return this.find(query)
            .lean();
    },

    findDetailById(id) {
        return this.findById(id)
            .lean();
    }
};

module.exports = mongoose.model('Image', schema);