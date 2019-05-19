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

// DATABASE SETUP
// Connecting to the Database
// Development
const sequelize = new Sequelize(
  'postgres://rdeboeor:apSXDd2s_Cu3frmThQCmWJIjvjCrg9Qs@isilo.db.elephantsql.com:5432/rdeboeor'
);

// Defining Models for interacting with Database
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

// ROUTES
// Root
app.get('/', (req, res) => {
  res.send('I am the destroyer of straws!');
});

// Places Routes
// Return all places
app.get('/places', (req, res) => {
  Place.findAll().then(places => {
    return res.send(places);
  });
});

// Create a new place
app.post('/places', (req, res) => {
  Place.create({
    name: req.body.name,
    address: req.body.address,
    lat: req.body.lat,
    long: req.body.long,
    styrofoam: req.body.styrofoam,
    plastic: req.body.plastic,
    icondiments: req.body.condiments,
    compostable: req.body.compostable
  });
  res.send('POST reached!');
});

// Get a single place
app.get('/places/:id', (req, res) => {
  Place.findOne({ where: { id: req.params.id } }).then(place => {
    return res.send(place);
  });
});

// Update a single place
app.put('/places/:id', (req, res, next) => {
  Place.update(
    {
      name: req.body.name,
      address: req.body.address,
      lat: req.body.lat,
      long: req.body.long,
      styrofoam: req.body.styrofoam,
      plastic: req.body.plastic,
      icondiments: req.body.condiments,
      compostable: req.body.compostable
    },
    { returning: true, where: { id: req.params.id } }
  )
    .then(function([rowsUpdate, [updatedPlace]]) {
      res.json(updatedPlace);
    })
    .catch(next);
});

// Delete a single place
app.delete('/places/:id', (req, res) => {
  Place.destroy({
    where: { id: req.params.id }
  }).then(deletedPlace => {
    res.json(deletedPlace);
  });
});

// Easily setup/seed database
const eraseDatabaseOnSync = false;
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
