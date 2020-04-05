const { Schema, model } = require('mongoose');

const resultBoardModel = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    results: {
        type: Array,
        default: []
    }
})

module.exports = model('ResultBoard', resultBoardModel);