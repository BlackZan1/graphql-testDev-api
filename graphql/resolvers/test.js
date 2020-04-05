const Test = require('../../models/Test');
const { returnTest } = require('./merge');

module.exports = {
    tests: async () => {
        try {
            const results = await Test.find();
    
            return results.map(test => {
                return returnTest(test);
            })
        }
        catch(err) {
            throw err;
        }
    },
    currentTest: async (args) => {
        let { type } = args;

        try {
            const test = await Test.findOne({ type });
            
            if(!test) throw new Error('Test is not exist!');

            return returnTest(test);
        }
        catch(err) {
            throw err;
        }
    },
    createTest: async (args) => {
        let { name, type, image, description } = args.testInput;

        let condidate = await Test.findOne({ type });

        if(!!condidate) throw new Error('Test is already exist');

        const test = new Test({
            name,
            type,
            image,
            description
        })

        try {
            const result = await test.save();

            return returnTest(result);
        }
        catch(err) {
            throw err;
        }
    }
}