const User = require('../../models/User');
const ResultBoard = require('../../models/ResultBoard');
const { returnUser } = require('./merge');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

module.exports = ({
    users: async () => {
        try {
            const users = await User.find();

            return users.map(user => {
                return returnUser(user);
            })
        }
        catch(err) {
            throw err;
        }
    },
    createUser: async (args) => {
        let { email, password, name } = args.userInput;

        const user = new User({
            name
        })

        try {
            const candidate = await User.findOne({ email });

            if(candidate) throw new Error('User with same email is already created');
            user.email = email;

            const hashPassword = await bcryptjs.hash(password, 12);

            console.log(hashPassword)

            user.password = hashPassword;

            const result = await user.save();
            const resultBoard = new ResultBoard({
                owner: result._id
            });

            console.log(result)

            await resultBoard.save();

            return returnUser(result);
        }
        catch(err) {
            throw err;
        }
    },
    login: async ({ email, password }) => {
        try {
            const user = await User.findOne({ email });

            if(!user) throw new Error('Email is not exist');

            const identical = bcryptjs.compare(password, user.password);

            if(!identical) throw new Error('Wrong password');

            const token = jwt.sign({
                userId: user._id,
                email: user.email
            }, 
            process.env.JWT_SECRET, 
            {
                expiresIn: '1h'
            })

            return { 
                userId: user._id, 
                token, 
                tokenExpiration: 1 
            };
        }
        catch(err) {
            throw err;
        }
    }
})