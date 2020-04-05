const { Schema, model } = require('mongoose');

const TestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    questions: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }
})

module.exports = model('Test', TestSchema);