const Test = require('../../models/Test');
const User = require('../../models/User');
const ResultBoard = require('../../models/ResultBoard');
const Question = require('../../models/Question');

const questionsByType = async (type) => {
    try {
        const results = await Question.find({ type });

        if(!results.length) return [];

        return returnQuestions(results);
    }
    catch(err) {
        throw err;
    }
}

const testById = async (id) => {
    try {
        const test = await Test.findById(id);

        return returnTest(test);
    }
    catch(err) {
        throw err;
    }
}

const user = async (id) => {
    try {
        const user = await User.findById(id);

        if(!user) throw new Error('Can\'t find user by provided Id');

        return returnUser(user);
    }
    catch(err) {
        throw err;
    }
}

const resultBoard = async (userId) => {
    try {
        const board = await ResultBoard.findOne({ owner: userId });

        if(!board) throw new Error('Can\'t find results of provided Id user');

        console.log(board);

        if(!board.results.length) board.results = [];

        return returnResultBoard(board);
    }
    catch(err) {
        throw err;
    }
}

const returnQuestions = (questions) => {
    return questions.map(q => {
        return returnOneQuestion(q);
    })
}

const returnOneQuestion = (q) => {
    return {
        ...q._doc,
        _id: q._id,
        from: testById.bind(this, q.from)
    }
}

const returnTest = (test) => {
    return {
        ...test._doc,
        _id: test._id,
        questions: questionsByType.bind(this, test.type)
    }
}

const returnUser = (user) => {
    return {
        ...user._doc,
        _id: user._id,
        password: '<Blocked>',
        resultBoard: resultBoard.bind(this, user._id)
    }
}

const returnResultBoard = (board) => {
    return {
        ...board._doc,
        _id: board._id,
        owner: user.bind(this, board.owner)
    }
}

exports.returnQuestions = returnQuestions;
exports.returnOneQuestion = returnOneQuestion;
exports.returnUser = returnUser;
exports.returnTest = returnTest;
exports.returnResultBoard = returnResultBoard;