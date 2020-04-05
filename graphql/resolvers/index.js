let TestResolver = require('./test');
let QuestionsResolver = require('./questions');
let AuthResolver = require('./auth');
let resultBoardResolver = require('./resultBoard');

module.exports = ({
    ...TestResolver,
    ...QuestionsResolver,
    ...AuthResolver,
    ...resultBoardResolver
})