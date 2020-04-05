const { Schema, model } = require('mongoose');

const QuestionSchema = Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Test'
    }
})

module.exports = model('Question', QuestionSchema);