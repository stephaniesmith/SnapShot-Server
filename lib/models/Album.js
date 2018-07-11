const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('../util/mongoose-helpers');

const schema = new Schema({
    title: RequiredString,
    description: RequiredString,
    posterImage: RequiredString
});

schema.statics = {
    
    findByQuery(query) {
        return this.find(query)
            .lean();
    },

    getDetailById(id) {
        return this.findById(id)
            .lean();
    }
};

module.exports = mongoose.model('Album', schema);
