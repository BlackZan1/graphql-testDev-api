const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type ResultBoardItem {
        type: String!
        score: Int!
    }

    type ResultBoard {
        owner: User!
        results: [ResultBoardItem!]!
    }

    input ResultBoardUpdateInput {
        results: [ResultBoardItem!]!
    }

    type User {
        _id: ID!
        email: String!
        password: String!
        name: String!
        resultBoard: ResultBoard!
    }

    input UserInput {
        email: String!
        password: String!
        name: String!
    }

    type LoginData {
        token: String!
        userId: ID!
        tokenExpiration: Int!
    }

    type Answer {
        right: Boolean!
        answer: String!
    }

    input AnswerInput {
        right: Boolean!
        answer: String!
    }

    type Question {
        _id: ID!
        title: String!
        type: String!
        from: Test!
        answers: [Answer!]!
    }

    input QuestionInput {
        title: String!
        type: String!
        answers: [AnswerInput!]!
    }

    type Test {
        _id: ID!
        name: String!
        image: String!
        type: String!
        description: String!
        questions: [Question!]!
    }

    input TestInput {
        name: String!
        type: String!
        image: String!
        description: String!
    }

    type RootQuery {
        users: [User!]!
        tests: [Test!]!
        boards: [ResultBoard!]!
        userBoard: ResultBoard!
        currentTest(type: String!): Test!
        questions: [Question!]!
        login(email: String!, password: String!): LoginData!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
        createTest(testInput: TestInput): Test
        createQuestion(questionInput: QuestionInput): Question
        updateResultBoard(resultBoardInput: ResultBoardUpdateInput): ResultBoard
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);