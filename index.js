const  doenv = require('dotenv').config();
const app = require('express')();
const consign = require('consign');
const db = require('./config/db');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const users = require('./model/Users/schema');

app.db = db;

consign()
    .then('./middlewares')
    .then('./api/Validations/')
    .then('./api')
    .then('./routes/')
    .into(app)



app.use('/user', graphqlHTTP({schema:users, pretty: true}))

app.use((err, req, res, next) => {if (err instanceof NotFound) {res.render('404.jade')} else {next(err)}});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor executando na porta: ${port}`));