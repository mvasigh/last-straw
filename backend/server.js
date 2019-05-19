require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');

// Instatiate the Express app
const app = express();

// Middleware for Express
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Connecting to the Database
// Development
const sequelize = new Sequelize(
  'postgres://rdeboeor:apSXDd2s_Cu3frmThQCmWJIjvjCrg9Qs@isilo.db.elephantsql.com:5432/rdeboeor'
);

app.get('/', (req, res) => {
  res.send('hello world');
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
