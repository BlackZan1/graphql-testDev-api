const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const auth = require('./middleware/auth');

const app = express();

app.use(bodyParser.json());
app.use(auth);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, OPTIONS');

    if(req.method === 'OPTIONS') return res.sendStatus(200);

    next();
})

const SCHEMA = require('./graphql/schema/index');
const RESOLVERS = require('./graphql/resolvers/index');

app.use('/api', graphqlHTTP({
    schema: SCHEMA,
    rootValue: RESOLVERS,
    graphiql: true
}))

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }, 
    () => {
        console.log('MongoDB is Connected');
    }
)
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('Port: ' + process.env.PORT);
    })
})
.catch(err => {
    console.log(err);
    throw err;
})