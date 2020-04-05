const Question = require('../../models/Question');
const Test = require('../../models/Test');
const { returnOneQuestion, returnQuestions} = require('./merge');

module.exports = ({
    questions: async () => {
        try {
            const results = await Question.find();
    
            return returnQuestions(results);
        }
        catch(err) {
            throw err;
        }
    },
    createQuestion: async (args, req) => {
        let {title, type, answers } = args.questionInput;
        
        const newQuestion = new Question({
            title,
            answers,
            type
        })

        try {
            const foundTest = await Test.findOne({ type });

            if(!foundTest) throw new Error('Test is not exist');

            newQuestion.from = foundTest._id;

            const result = await newQuestion.save();

            return returnOneQuestion(result);
        }
        catch(err) {
            throw err;
        }
    }
})