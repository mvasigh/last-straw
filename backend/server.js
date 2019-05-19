require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');

// SERVER SETUP
// Instatiate the Express app
const app = express();

// Middleware for Express
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// DATABASE
// Connecting to the Database
// Development
const sequelize = new Sequelize(
  'postgres://rdeboeor:apSXDd2s_Cu3frmThQCmWJIjvjCrg9Qs@isilo.db.elephantsql.com:5432/rdeboeor'
);

// Defining Models for Database
const Place = sequelize.define('place', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lat: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  long: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  styrofoam: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  plastic: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  icondiments: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },
  compostable: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  }
});

// Function to add random data to database
const seedDatabase = async () => {
  await Place.create({
    name: 'Merida Mexican Restaurant',
    address: '2509 Navigation Blvd, Houston, TX 77003',
    lat: 29.7582547,
    long: 95.34373,
    styrofoam: true,
    plastic: false,
    icondiments: true,
    compostable: false
  });
};

// ROUTES
app.get('/', (req, res) => {
  res.send('hello world');
});

// Places Routes
// Get a single place
app.get('/places/:id', (req, res) => {
  Place.findOne({ where: { id: req.params.id } }).then(place => {
    return res.send(place);
  });
});

// Test connection with remote SQL database
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// Easily setup/seed database
const eraseDatabaseOnSync = true;
const port = process.env.PORT || 3000;

// Synchronize database and start Express server
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    seedDatabase();
  }

  app.listen(port, () =>
    console.log(`Destroyer of straws server listening on port ${port}!`)
  );
});
