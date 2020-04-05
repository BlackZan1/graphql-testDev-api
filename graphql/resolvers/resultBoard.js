const ResultBoard = require('../../models/ResultBoard');
const { returnResultBoard } = require('./merge');

module.exports = ({
    boards: async (args, req) => {
        if(!req.isAuth) throw new Error('You are not loggined');

        try {
            const boards = await ResultBoard.find();

            return boards.map(board => {
                return returnResultBoard(board);
            })
        }
        catch(err) {
            throw err;
        }
    },
    userBoard: async (args, req) => {
        if(!req.isAuth) throw new Error('You need to login');

        try {
            const board = await ResultBoard.findOne({ owner: req.userId });

            if(!board.results.length) board.results = [];

            return returnResultBoard(board);
        }
        catch(err) {
            throw err;
        }
    },
    updateBoard: async (args, req) => {
        if(!req.isAuth) throw new Error('You need to login');

        let { results } = args.resultBoardInput;

        try {
            const board = await ResultBoard.findOneAndUpdate({ owner: req.userId }, () => {
                return {
                    results
                }
            });
            
            return returnResultBoard(board);
        }
        catch(err) {
            throw err;
        }
    }
})