require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const users = require('./model/Users/schema');


const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/user', graphqlHTTP({schema:users, pretty: true}))





app.get('/', (req, res) => { res.send("Seja Bem vindo")});
app.get('*', (req, res) => {res.send("Pagina Não Encontrada")});

app.use((err, req, res, next) => {if (err instanceof NotFound) {res.render('404.jade')} else {next(err)}});

app.listen(port, () => console.log(`Listening on port ${port}`));