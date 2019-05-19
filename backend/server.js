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
  // v1 (no image support)
  // 'postgres://rdeboeor:apSXDd2s_Cu3frmThQCmWJIjvjCrg9Qs@isilo.db.elephantsql.com:5432/rdeboeor'
  // v2 (with image support)
  'postgres://ltjsfegh:PnRnB9xgiT3-kXb4Ef4RIXpt2zWDceUa@raja.db.elephantsql.com:5432/ltjsfegh'
);

// Defining Models for interacting with Database
const Place = sequelize.define('place', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING(1234) ,
    allowNull: true
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
    imageUrl: req.body.image,
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
      imageUrl: req.body.image,
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

const seedData = [
  {
    "Name": "Merida Mexican Restaurant",
    "Address": "2509 Navigation Blvd, Houston, TX 77003",
    "Lat": "29.7582547",
    "Long": "-95.34373",
    "Styrofoam": "TRUE",
    "Plastic": "FALSE",
    "Condiments": "FALSE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAPgyNb-gd0bddIrupTXsj9adsbYj2sbTBmM_KrweFz_mAo7ps7VznJtVfqt01HiaddUTtWUoUOHBqCLQ2U9OK1ZvWwsWhuP3FfOfULn6uDK2mo2s8QTBCY0VnBlMi8-yrEhAuTJs1Qht_BJJ0xlOtvrEQGhRlgGvzRlJ7ie2H2-E-ERW_2lg51w&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Pappas Bar-B-Q",
    "Address": "8777 Main St, Houston, TX 77025",
    "Lat": "29.6914213",
    "Long": "-95.416682",
    "Styrofoam": "FALSE",
    "Plastic": "FALSE",
    "Condiments": "TRUE",
    "Compostable": "FALSE",
    "field9": "Beverage containers, Straws, Plates or serving containers, Utensils, Sides containers, Condiments containers, Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAs0Id6KVIBJDEPC6IoILmSK0oV_2NzuZ26pjAXeMPA-48HKP5N1H2-l6HOfY00N5i5ErAW8XE4e4TIbOBD4RytdSvqXR866p0k73k9_Ww6lI2wvfMojNqzDvNCMnmnYpCEhBbwiesipjr9KXltZV0ouWEGhRxHcZqxE8u63nr98B4MIWYzV6Baw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "KFC",
    "Address": "1945 El Dorado Blvd, Houston, TX 77062",
    "Lat": "29.5783605",
    "Long": "-95.1219741",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "FALSE",
    "Compostable": "TRUE",
    "field9": "Straws, Utensils, Sides containers, Condiments containers, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAoNtteoxtp1Gv76bRw6s1mxYssnH9uzgrtiGmg0q0Pl15SjfjlZBlQ_GkRbaNKM0YAa2QYlJA733IiZr8C30QP6uXfI4l73bD0FRKYj2hZG2_mSXfWadIoFs913NlVkbJEhDJKAQnT8yYTwBS1ZLe8OCMGhST7TaXYxuhARDWdGvGyArK4BcavQ&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "JuiceLand",
    "Address": "3206 White Oak Dr, Houston, TX 77007",
    "Lat": "29.7817546",
    "Long": "-95.3922153",
    "Styrofoam": "TRUE",
    "Plastic": "FALSE",
    "Condiments": "FALSE",
    "Compostable": "FALSE",
    "field9": "Condiments containers, Containers for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAAdis-chU61AE6msHpKyECzeIbhqsJjNl9bzINsoe7Cj1G04ZUQJ1f7DycogJJ3k0ymP5_w-Uy-jS_BTWbGlFpRgTjSyjs0cwz4vZk0lRDam7zCdtOCEVnvCzxIUid58jEhAfZpKqp9gUQL5Aod8IQkBaGhTBCnfIrp_qCRuqpeiFsUNNpEi7kA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Nam Eatery",
    "Address": "B, 502 E 20th St, Houston, TX 77008",
    "Lat": "29.8038321",
    "Long": "-95.3930349",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "FALSE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Condiments containers, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAlJobpomEKKNXA0S_tT_WeeVdnlxX0q362PGMEitMMAoYIeHW9fHF7Y96YlPttrz5HCFHfM5XOvY1oLFQGMrTe-2xPCYoO2T7As0-n8HxDvTJy0UKiqNVo5MgcMWcl8oEEhCeR6cD2tfRkxR14_2KB8YpGhSiHNz6EIsxVABgvhzgs8YYVnsDhg&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Brasil",
    "Address": "2604 Dunlavy St, Houston, TX 77005",
    "Lat": "29.74256",
    "Long": "-95.402257",
    "Styrofoam": "FALSE",
    "Plastic": "TRUE",
    "Condiments": "FALSE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAATRyKHBCsfUJoRKsucPpOxpzYFpmSydTNPSFSoiAHT0ZmbfN6QqXD02fMJOqqAHOHg-eNImYfBV-FJ7Uzc7qrBu93qIjHqYl6oF24ssdxJ-RrbvrPklxVvfp2Nj_s39SfEhDLR1R2vWMlt5_pCONxaX0sGhRRoxFIs0ZgNkKahyAl6Xqiu025nA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Empire Café",
    "Address": "1732 Westheimer Rd, Houston, TX 77098",
    "Lat": "29.7428851",
    "Long": "-95.4035421",
    "Styrofoam": "TRUE",
    "Plastic": "FALSE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Panera Bread",
    "Address": "3151 W Holcombe Blvd, Houston, TX 77025",
    "Lat": "29.7428851",
    "Long": "-95.4035421",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "FALSE",
    "field9": "Beverage containers, Straws, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRZAAAAaLxTxKaHDYzlI4Ef0EvTLUuE9mjJVA3-37fDgWjY7wGa4r0detSZGdi95KJZmCFJVchPb1WWKJx7LdffhrGE6rGzGu_cNlxzVpe11V3hw_A_r7J1k823u6mORuAVYNP0EhCYeMIfteiE3jkZxVQ5fJNTGhQmSFLJdIap_9c-lsRWnXsMQ9UziA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Oui Banh Mi",
    "Address": "1601 Richmond Ave, Houston, TX 77006",
    "Lat": "29.7341564",
    "Long": "-95.399702",
    "Styrofoam": "TRUE",
    "Plastic": "FALSE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Utensils, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRZAAAAu9RWjs4PEoEog64Mu0_oKPFawdHAaiP6N8f7v8hlKISO-nLmK26Y5m1ixXDyIO_2vvrpECpJ6lFgkv0lpyKvaith4XosDRfF9_TVy28fqauQ4ZGeRaBdhGNHQHjAADdiEhBho_EXNYT38Bgg6XdHTif-GhRKo2tTvVBOB5dD_Z3ySwXyfYU1Jw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "CoCo Crêpes, Waffles & Coffee",
    "Address": "2339 University Blvd, Houston, TX 77005",
    "Lat": "29.7147249",
    "Long": "-95.4143684",
    "Styrofoam": "TRUE",
    "Plastic": "FALSE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Baytown Seafood",
    "Address": "925 Main St, Liberty, TX 77575",
    "Lat": "30.0647931",
    "Long": "-94.7964505",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Plates or serving containers, Utensils, Condiments containers, Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAYa2HNUgqyX_onIO42r9EJZrsSYPvzNvhCavY_GYf76fph6Kg3B4NnQdzmnZMGwryQjrhzjy02D8hIQDAaHWrCeTZL9XlR47IlZzshIygzfAhkpaog0AVrg6wLwVhyUUnEhBHQ9XmRsPZnbSb75cVwJh7GhTLdLyvVbhw0yRBsPZvYg1I_E3WrA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Doc's Motorworks Bar & Grill",
    "Address": "1303 Westheimer Rd, Houston, TX 77006",
    "Lat": "29.7434544",
    "Long": "-95.3951208",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Containers for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA8swClHAu86zP4ARpzJaaljzCJ5mo5SBelVvTxrYEfv_qtmLYe-LQp6S-OKGquvEeyp4HEFzkitwz4Zw2bYQvLNy3zm8FGeHnYTfBjO0DyNdKVTksGDGS1Va-6djUzHfeEhC5cwRM-uZl2AGVFy6c-c9MGhSvpexiLpsuNBamg7OOqP7g47294g&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Empire Café",
    "Address": "1732 Westheimer Rd, Houston, TX 77098",
    "Lat": "29.7428851",
    "Long": "-95.4035421",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Containers for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Dimassi's Mediterranean Buffet",
    "Address": "8236 Kirby Dr, Houston, TX 77054",
    "Lat": "29.6888774",
    "Long": "-95.4131409",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Containers for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAADOY7RrzAUYPHxgp5PEwXO4vk1hTUbMNe18vK3xct1B7V-fs0B_Xbvx4PvqsdmeO3G5wHk89Mh7ghbqqxodZwI_ByimB2I5Zv4TgAsqS_zo8XfQhc3wUO8zeUNxQpDm1wEhAiQMbuaBfasR9PKJmpPzgtGhRQsXKiI5l9_01AHgwjiVy_eTcWAA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Sweet Tomatoes",
    "Address": "8775 Katy Fwy, Houston, TX 77024",
    "Lat": "29.7833054",
    "Long": "-95.5056817",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Condiments containers, Containers for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAqq6VdBsQHZ790sPWmJQaNZkTMuyQV_5s6foWx3llwGe_Rhx__MFNxCJsVJUn9YWPBgQsl5dMtNhN3D3lhPf4lNa2camFbAkei2ttMeXcZWjAtuquGvPUTnzLqMs2IMXMEhBX7cNKDl2_UaxFfkRSQinwGhS-o9vBba-ECIUlylyGrcHvAhkOLA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Barnaby's Cafe",
    "Address": "801 Congress Ave, Houston, TX 77002",
    "Lat": "29.7633057",
    "Long": "-95.3620762",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAGgwglaFdl-2iIZiyQIbzW82SlIMy66tx1A_IXrzE570Yfx2U8Ydhi9y5PDbzPCXvuLCHIaGTXDfTf9YUamxzVyKnj_eAJbtpSlJLOYmyqsDaD3649K3VJoxryVjqkd5dEhCBuCaTBc41EYmQ6sD7Y8Z1GhTmgljGDXGb1gLagr7Ovu8VErghOg&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Little Pappas Seafood Kitchen",
    "Address": "3001 S Shepherd Dr, Houston, TX 77098",
    "Lat": "29.7390759",
    "Long": "-95.4102888",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAsXkznLwYJ5Vy9Gb6MZHHHMF3iLTh_brq_IDej1Xd-8H6LbPpDwO_OKVFzuxCFFjHKxHu-Olzx-6iHkvCD6ne3V98sJFB6a5AzKdcw-Bs3lzIfbloz5Q3EX592aym51tHEhCzsthgKedRhl3gbjHQ1T7bGhRMkC4eXfUrLJjvAnvqJ7qFlQzrZw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Liberty Taco",
    "Address": "a, 4703 Richmond Ave, Houston, TX 77027",
    "Lat": "29.7322076",
    "Long": "-95.4566904",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Utensils, Condiments containers, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAkjZLeVTgJugNirPDktNFmOSwkHWn06AKhSNammyuOHrUvZ2b7uPVHJlekA2CGSE6r8K3MMBmDzfCcyGxwIY5ZuTNUvoyzer-CzdaHBQ8E9nfK853RZk6LDADOa8ZD6iZEhAV_vZKmw7XT64ONG-7PoIEGhSViKo7jvsnKS75IME8ruFiU-ArJQ&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "la Madeleine French Bakery & Café Sunset Valley",
    "Address": "5493 Brodie Ln, Sunset Valley, TX 78745",
    "Lat": "30.2296154",
    "Long": "-97.8195869",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAekRBwUmu2SHRFHX08ty5pqk3q1js-K6kG-yL7GNMmggCmtGXvKarg56MOuh2LgGXmu3YBTVNd3iMu_kd32sln5tL7OY51m-9xQ1tSSHKW9qExem8cNu0gyH6x6BwVhdMEhAGcNv93Wr_nDRP9x4ftNLYGhR2CQxrjfavruBbsj7qaBfOM6Dj-A&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Cafe Express",
    "Address": "1422 W Gray St, Houston, TX 77019",
    "Lat": "29.7535843",
    "Long": "-95.3994502",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out, They ONLY use plastic disposable beverage containers- for dining in the restaurant and for take out.",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAI2fxEv_oO_2aV12vHFfVdVCW1H3CFfvcxTwjp9yrZfmLyW87GZth6jHYOIFEXeaQWjqPzHnJMnt8rrtRFHy3dXkI6Lysj5PvGcP4FSeuy4XH4c-U_oQYbcbPCQKoYxowEhBNqRultMWd23uzOJ8DiulvGhStC-zwiIHtfGqkiz5MbW34hT7y3g&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Platypus Brewing",
    "Address": "1902 Washington Ave suite e, Houston, TX 77007",
    "Lat": "29.768051",
    "Long": "-95.3775152",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Containers for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAdxrSmvxmV1y2eaO4OEaVP3xkASdDt_fDFMJkJHmQbLoBvGWyeUCrpMvvitFcI3MrWmHZxOAVFWSmMGpnHt4wMBmp-f_wLRz9FmCpZW_CZvnAjBx0h7bxD6kel_4S09X0EhA1bpAcaWTC9TF2i5paMKw4GhTLPyZ791C6-34_6q-cX7EeriXPIQ&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "bellagreen",
    "Address": "2305 West Alabama Street SteR2, Houston, TX 77098",
    "Lat": "29.7382312",
    "Long": "-95.4153755",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Containers for left overs or take out, Utensils for left overs or take out, Some take out is paper",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAV0CWKdXUz_wU1kObhrcj8kv9Zt0vMZPHbrGOlY16XMo7OEGux62pXMLdmDUltvVvUiIJeZYizfJ-wwHc7_SA4Ux24AHfVd8xOE5-iEqrezrUH8Btx9dP47L80QMnHb0pEhCbsCCr-mPiQyg3ZNZLmLiXGhSbKEXi3o4FKgT0fQt-0oPLmq12_w&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Tiny's No. 5",
    "Address": "3636 Rice Boulevard, West University Place, TX 77005",
    "Lat": "29.7172369",
    "Long": "-95.4334791",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Containers for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAADfCF--mUwWdrLqbv4JqoB9IpssvzT-QeG_1opjUKYvWYcykJYrJ7K3qTJdDSIkBVH1F8eBXQjthH115LqTD2Crlz-T8ENs_MWsCykDiH6rkjllaob-dhx7fG7sIRa8UoEhAfQYlEU_TIt1KZPFjB3pGSGhQwWnpzwynqn5VM439EoG-JtOMTjw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Restrospect Coffee Bar",
    "Address": "3709 La Branch St, Houston, TX 77004",
    "Lat": "29.7353569",
    "Long": "-95.3754197",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Utensils, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAACVkNiVswfqN_KumZOXwkZdHmBjdrI7tCVppB6SHk4-ksbZJ7MvbeW3vV6B4hapQc0LnbqHLH-Wu8ZvJb0Roc9Tex_R5FRn1WyN0h1YC53bu6ZpArhncLpcYXTKV1FXqeEhC3rPAzNtkXy3ng0oq473GRGhTLfxYKx8ItOAfBgcn_iuZYIjGbdw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Hunan's Restaurant",
    "Address": "3835 Bellaire Blvd, Houston, TX 77025",
    "Lat": "29.7053693",
    "Long": "-95.4381231",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAMW6_iwf5ZQ-xWceARsiSbVYqFJlRST6V97oaJHYuwNR37OyWK697lBJX1qqVwaykPwrg6CQl7z3OAljBn34ALSLrcEkkK3cAQEk-hUoqgB6Wi9Fvc7epdxDF4fyG1EaHEhDpreDti5PB2gvKR_Udh_ljGhQ9T1sYZUK4rMqpE_iu3AcDfBqqfA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Chipotle MexicanGrill",
    "Address": "13313 FM 1960, Houston, TX 77065",
    "Lat": "29.9158626",
    "Long": "-95.6165062",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAZyqwg9yReb9CIGmbDUgl5iKKjcHdZ5Q1X-TGsYegeft9mTlWtTzDKvRlW3TYwQGvy2YeIilyW_COClrYShYl7Bl9GwfcGUdQlaAp_-swcqwSOBK1lqFz6OVilkGy6mPtEhDAYpUJ15dDWc-Bhc0oUOw0GhRYyb1LbSr_S8sqqocUlWmrSA3ZkQ&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Paulie's",
    "Address": "1834 Westheimer Rd, Houston, TX 77018",
    "Lat": "29.7428911",
    "Long": "-95.4061049",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Utensils, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAK3UkaUEaeViYq6xgEbqclbc88xxhJmQzBbgQ8pMKHahhi0cLsJ7JY_UrLMrY9ewMl_iy90jR0Q2Q8qtgUPW3MrP6v7iyJr-QyHJW3hAznZStzNTjND3WgbRizVI2OtnXEhCgOo5FQZtc31BH2OsirMk2GhR3s_Gwakv0ovQZkK9-gKVdS5OH2w&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Cafe Express",
    "Address": "1422 W Gray St, Houston, TX 77019",
    "Lat": "29.7535843",
    "Long": "-95.3994502",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA2uuq_NtCLezzHDtph0KgYeitt8hrOvt7PqKj8SEs1MeWW96KeSyKiLTQTN8CwoQo44XuVwRQ79CsFG8YPKvKmuHwat6d9dnTYf6jYTo1zpQ7O37P1sQ8EtbO4V49-eIsEhDQ4b7iKYvngTUfwA9bfMqIGhQ9TU29TfbGa6t37eHkhBADHLw3dA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "La Trattoria Tuscano",
    "Address": "4223 Research Forest Dr # 950, Spring, TX 77381",
    "Lat": "30.1814913",
    "Long": "-95.4859556",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAfkzyyR6-qphJDLTWF6O_EcaO8_dv8wqiPGRxzGrgifqepHRHzd2-xxcO_nxEtMO334GsHvKY_ch54WWKeGMWBinUH9-VXa6P_mNqkmOATQjHl6XMjlx827yvivbJwY_-EhBqSAcHuHrfp5gDhwJ2MRGUGhSnZDWrKjRxGEzz253QBMdlDpA4Og&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Mellow Mushroom",
    "Address": "16000 Stuebner Airline Rd, Spring, TX 77379",
    "Lat": "30.0120034",
    "Long": "-95.5147389",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA57cHzEf8MpoOeac0Z_r_kIPQMT7FJlFM6RHdnEa7zv63evx1Qn7DnHnM6KkZgEg7ohNR_9mP-lnzMTXqyV_6v4D3rCWc2ZnqIbDfuUNgGVK-GgSush9l57_ubDDb2-RiEhAsPwvyJTTKrRTLgHOdxX82GhSXl5BJkv_2d1UxiVn34Za-sEDl1A&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Common Bond Café & Bakery",
    "Address": "1706 Westheimer Rd, Houston, TX 77006",
    "Lat": "29.7429809",
    "Long": "-95.40232",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Balls Out Burger",
    "Address": "3531, 1603 N Durham Dr, Houston, TX 77008",
    "Lat": "29.7998535",
    "Long": "-95.4120976",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Plates or serving containers, Utensils",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRZAAAAreFR2i6WffeZ0VW4AH09KDPcxSmKfQUvYpPUjgLczc24_Y9HENlvQbUwL9zKMXqx57G9dzX8q5UfgHKlGEofMq6RR4SDvEKjA61Xvt4t7VRlhlfOUk89pplEiwJtjy8uEhD9vEmektzW3u8vQWiS1EuvGhTVdHxhgr3ORh1-8UNkGhLaNTP5Yg&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "The Dunlavy & The Kitchen at The Dunlavy",
    "Address": "3422 Allen Pkwy, Houston, TX 77019",
    "Lat": "29.7611493",
    "Long": "-95.401866",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, 1/2 oz containers for marmalaide",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAaO_h7mut-8YjZUF3Suxnbb6jmj0M6TTNLVG7kmJ-1e7hvQ3Lt72bSnHuQ0rGZggWX0-KHAwABFwL9M9Q-vrGHTl2plZQh-KYZwznTRTCKugz2ygQroQRGaZDXGUGmKorEhDObnU0BTxSvizNPbhG2UvRGhS4Ru9HrcS6gzq6FI4iiJk0PWoByg&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "P.F. Chang's",
    "Address": "4094 Westheimer Rd, Houston, TX 77027",
    "Lat": "29.7424473",
    "Long": "-95.4478879",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Bags for left overs or take out, fortune cookes in plastic",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAVmRbozp8Dt7jhISHawVieaLnCEZRm4TiBI87s737-tYjHE-1e36aIwz19Wtj5mV7X4gW56nmI8KgWN4BLDvhMa7kWoGpuMAGqJ_05URLNqFuUql5eI7rZlmCK1zr73XSEhDUh8DipJf3gxeLgf3eCoMvGhRZXDbTStTVQ4lfNb5-7Zk2JZsGFw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Buca di Beppo Italian Restaurant",
    "Address": "5192 Buffalo Speedway, Houston, TX 77005",
    "Lat": "29.7269492",
    "Long": "-95.42832",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAebyaNjmMD6l7QMItkB0VQmppydv1YM3WtScyCrv8OIA8h4RScGzF3t17-Kq9Qnz7hPKZ-VwBRJPV8zSgsHuzyy6zrTSOJ_pogwdVxCu070ukO2tpt30PQhw67AeeOKNMEhDPX6HGqM33YJUPTlOHaEwWGhT7Gt6tUC5p23-Px2aSSGsGgKWmvg&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "rise nº2",
    "Address": "1700 Post Oak Blvd #290, Houston, TX 77056",
    "Lat": "29.7493446",
    "Long": "-95.4622183",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Plates or serving containers",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Salata",
    "Address": "3651 Weslayan St #216, Houston, TX 77027",
    "Lat": "29.7338556",
    "Long": "-95.4409856",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Utensils, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAbslVbiBeGBaKD9r547NwDglpQaAnjsYYoIZ75ges2WUyTJE9bkmxXiPbq0lecuP6oSIDLuPWprwIaV2my17H9Rlto1sflkbIeK2gFETeiFK8sx2B65impVFDbjFIRv2tEhCGyGEZBE8kHEHSvjadoRpFGhRgVlfDz1DfAHHJE7q_b5LjStZYAA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Goode Company BBQ",
    "Address": "8865 Six Pines Dr Suite 100, Shenandoah, TX 77380",
    "Lat": "30.1758584",
    "Long": "-95.4608875",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Containers for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAJ8vp2PHVAwdAqcd0JJdrKgHNbPC6zKvMcnvLW3QYWlAN0ykiiGcfrWClzvd-6AOdXq8bNz1cBxzJaRkUaCpx31QcN5m630CZ9XyCyDqAkP4B1fCJYLwkHPYI1FI3AswpEhDOsf98A8d4JG-oy8HULpp5GhS9MkBOmU0gLJz8e53Pr72RuAn-nA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Johnny Tamale Cantina",
    "Address": "4647 East Sam Houston Pkwy S, Pasadena, TX 77505",
    "Lat": "29.6396242",
    "Long": "-95.1590507",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Condiments containers, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAoQF1opsOJh7Otw7O4CO1hhue-Lz0K3bHSYloMuNCX3U7FXPKMSZPkxjzmqA-oY06WymNWNiNgTpv9wguymqFY20TeONWj4eV81f3YCN4wTjxlBMt3lzlbB0Idt7IONyjEhAE-lOqfdcN3bjEt-vSehlTGhRNSCrimV0yXUZ2WntbZhPvGiE7tw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "The Brisket House",
    "Address": "5775 Woodway Dr, Houston, TX 77057",
    "Lat": "29.7599509",
    "Long": "-95.4823678",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Plates or serving containers, Utensils, Sides containers, Condiments containers, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRZAAAAOK4PlXdamSJylV1sgDEULYPbm3zPWXvZt-cTPZhR7FqaSqWvzqfwI2d6qeGDqE09LIFIHC_JnfifuD5XG3MdOMx-BBiBotXCtwRRVzTVPrVy1FPEhVlRpSGDQfbhEy4EEhCRpDwarSlTEUIryicwoJxqGhTuiA2WvKfxHRwCRCF-bWPAbrxkaQ&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Fadi's Meyerland Mediterranean Grill",
    "Address": "4738 Beechnut St, Houston, TX 77096",
    "Lat": "29.6896366",
    "Long": "-95.4602653",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAhzm2lf8Uzu7UJLVPDfUoh_PEyB_YhQHRXfmE_E0973qDzKOy5o8n4CKBF2pyiOs_OpWbng_RM1_AtPy-QUgI9nZ-7YwixrOpxuUq-V4WxsUkrL-qWrSUjpuulhWHyV_jEhAK_ASwlaegDJpyhulTN1FdGhSaZu1wFhuhB0Bfbb_Aijh8JnfR8w&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Jenni's Noodle House",
    "Address": "3111 S Shepherd Dr, Houston, TX 77098",
    "Lat": "29.7381472",
    "Long": "-95.4103748",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAE9HTUlbbahMU4IdpIiWJOAU1UYB5KYVRuB6X_d9bkq58nU6yA8SWz-CdKrINMwo5AJbu3jh1Hr5adjJjlL8xbyv0_fNlSJp5mBLArcTwqArFQDLTiPiarFIiwYWEvp1EEhBSi-fj55WJFe0hLUo02yqGGhR5wrwDX551L3zWhCDD7Pn_2kUGqw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Osaka Izakaya",
    "Address": "2802 S Shepherd Dr, Houston, TX 77098",
    "Lat": "29.7403729",
    "Long": "-95.4110396",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAATY-TUIz0On7KcYUz1-8a33CRQfQQIDA2ydyGT66BMip4F_gpOp4r9IIaWpXv-QQPNYWzJO2tjtJ1pmGhfSAAeiqU1rUxWO-yfcOQdZFEGVmzobQQaKzHhNN8WaP1HctCEhBQ4QOmYQxfvFcZuh0w62f2GhQeMcFgKA_VM-pFAPiq2knJkTQ1sw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Escalante's Mexican Restaurant",
    "Address": "Two Hughes Landing, 1900 Hughes Landing Blvd #100, The Woodlands, TX 77380",
    "Lat": "30.1709619",
    "Long": "-95.4712845",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Containers for left overs or take out, The bottom part of the take-out container was \"compostable in commercial facilities only.\" The top (lid) was single use plastic.",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAJX_Lt1l9T_U0k1hWOu5LDi8lDbPuU2qrkZjMVQSd4JlR7IkMhiE2of7i1rjFF1S2UqOaUwZyawimjC_9fJVUFSQzpyeGWE8GyslNBCvS6i-pVRwki1DCn2dWnNcxIfQDEhD4wFozJVcOcN5ctlWcOv0hGhQzverjci5-jdDYH-AYfXN039WPwg&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Pei Wei",
    "Address": "14008 Memorial Dr Suite A, Houston, TX 77079",
    "Lat": "29.7714944",
    "Long": "-95.590547",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRZAAAA9z4cL01v0AtAFhgemmQHim4cGbOyTFbJXGnUQGPLR4QHy6tNT9zCsUtTr7XjtpP9DlTezovDO3zk0oz2xj_iFHAbc6FO1HODkk26GE-fQ8iiGLyJKY0qouzmx1bqhQiuEhBRFA8HLHON4HQyH4CgCuQpGhQ1_ckWKUoxKoKjaeoIMM7ZB4WS_w&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Café Caspian",
    "Address": "12126 Westheimer Rd # 100, Houston, TX 77077",
    "Lat": "29.7371961",
    "Long": "-95.5945934",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Hopdoddy Burger Bar",
    "Address": "5510 Morningside Dr #100, Houston, TX 77005",
    "Lat": "29.7156773",
    "Long": "-95.415351",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAylunyRZwZqzZPf3N9N4FsHq_LMMolpSnpSSF4YKmzNdmoAN7pDCy4ZH-A2oKTLI1cbEnaqjSatmo24m-MYR4tXvgjMxzUs5_6rISJs4bLrhW-vO58jsDy7BNGamfuurKEhDqUA2XmtdN7kiMlkQcyri8GhS8GCZy9CQAwBsSYW5P7KtJ_HiBmA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Goode Company Seafood",
    "Address": "2621 Westpark Dr, Houston, TX 77098",
    "Lat": "29.728285",
    "Long": "-95.4203423",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAXCnR_jZlKRPAmgNHjWI3c-UoUsVo4o750VI36vcTSOzcuoSvD-m-TJha-UR-OaMT9RwXhX4Qs-_t5cjDkN7ZgK6HDqYBrWM5tqxNsLQ3TyuYgRiKuUCixzUPcht9n4e-EhARu2wYUESn9-46nDH9nwDsGhR8xctvd4D7FYLIH0OCJ4aCPoZMqQ&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Saltgrass Steak House",
    "Address": "215 Kipp Ave, Kemah, TX 77565",
    "Lat": "29.5472695",
    "Long": "-95.0200347",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA8rxScqRDKTuSxks_kxXs6hQqkRaW4OXejArnHd-r3RZr8WPSUr88gM_mWS5X-4bagAEwPzbuIECh5YzVlb7SSwj08NH-Iu4xk8MJZj_opoERYzTftMFDvkPtP8CAL486EhD6LEcHuZaeekofRoLfvSzDGhThynDBP8sYBVgpqE4SQJFRlXmjcg&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Miss Saigon Cafe",
    "Address": "1421 Richmond Ave, Houston, TX 77006",
    "Lat": "29.7340676",
    "Long": "-95.3984287",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Containers for left overs or take out, Bags for left overs or take out, condiment container for take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRZAAAAaBg3KkXAwAXDW8P0UfMkQaziBjpdeEYg3BtlK6M6ifpWbDRYIZE8nqlZeqpkdlWnNMxTCKEQKHuO3rjw4Bn8o0E_jYPz5KW0-qvVwVcAm92QUaTnA0teCpj8zT5FeniNEhCAEN_1z6uw-2OZqzwOn_QRGhTpEUKiyvrdJvbG_3wLs98st4rjcA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Starbucks",
    "Address": "13914 Galveston Rd #100, Webster, TX 77598",
    "Lat": "29.5783152",
    "Long": "-95.1570745",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Stirrers, green cup stirrers and cup lids!!",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA-dz5f3mr0g4e_omDKV0uRRMpwACxuu2j5uCDiNd65dNMLkwyFuaM4Q3vbghg6P4-TG_0PmURRGAZUQLPNhs1ydWD3Hfu3H6VMaT-sTk7SLLl6skR7nMW1iGZpMbUT2-dEhCq0jlsbRn5OkhN_cQaIqUcGhTZmQUDFhT0RabUuqA1Gw-DYMHvMQ&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Tai Li Chinese Restaurant",
    "Address": "7948 FM 1960, Humble, TX 77346",
    "Lat": "30.0022178",
    "Long": "-95.1533663",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Sides containers, Condiments containers, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA3Wp5LdjlwZWrmCCw14YuS3mD-FQ3OCmQ3bK9IxdHgpEk0ITwQwr7RVW01OCGnS9ObDYqOmmXUNvNZQP54MMReQdn2UgLghNfRkWcEq7EcFmNWHgLYUG_Kz_KAvGJ0SBtEhAmRn0n9HC-QaapG4WzfwNQGhSY0Gu4YYPuLcOwHy_nAlaeuFxutw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Fix Coffeebar",
    "Address": "415 Westheimer Rd #101, Houston, TX 77006",
    "Lat": "29.7442412",
    "Long": "-95.3868592",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAkplwO_qNwouA7CJ8jR8Q2GIMxlwYHyAYDrGw4ujZiLuGU41wjY7fTk2HvrbmwoSnCubVqyipiRh6U4fPCmduzOkr1xKNesrHB4sYYkUQM5CNCEJjLkWbqi2DKGcy7QgqEhBSW1kvdUU_mDlJBOyrOFw_GhR5y4SDkS7keKGZHuSb07LI6f0SyQ&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Hyunh Restaurant",
    "Address": "912 St Emanuel St, Houston, TX 77003",
    "Lat": "29.7516754",
    "Long": "-95.3556297",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAHl_BRcHIhh9qL4A8CZpp9UKi8M0ujZF48QFJXW5rCtXqBsXysjhB3UaVca3y2uql2ygal9zq9eTbznLOCveycmy47O8K1rivwsaEN-ESCEuLtNrRuXPdiEMZMFA9TLSIEhBPy6WdX8FEFuc0w_G--EGVGhScrD2_iWwpjeHbtEES8XR5VTafYA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Presidio",
    "Address": "911 W 11th St, Houston, TX 77008",
    "Lat": "29.7907294",
    "Long": "-95.406688",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAbh0LH003WCVJYEbr__4AoMj_l8WcqfbTB_Nx88Ry_woG8RkX2f-PEGUZ-tqCr0NjPeLL6Y0nPjmvkmtwwXA38kMWDzWphgCw5e7jZJidYHn5-aRuDZjuZSZPlQ9WtjghEhCqaohtdecxRyLtR8ivaDuQGhQCDLV-cALgqzcKznm5S64OhWULFg&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Tarka Indian Kitchen",
    "Address": "721 W 19th St #7, Houston, TX 77008",
    "Lat": "29.8030045",
    "Long": "-95.4111157",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAqGOkO705k2_W48k1TvItWlmXkxexd_UThel8kyTbyDy-F2qfirSJ4VEVFYKhGTS5bSEoipkDu1l7RKlD5pQovYK8l5erZ1_Y70N2w1Zjla8s0J79H_YGPUDlukFA4W_EEhDqZF-YkaFlvNHvrNwD1QIRGhQQOhfDAx7_q9Db38W1tSJkMxv1DA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Niko Niko's",
    "Address": "2520 Montrose Blvd, Houston, TX 77006",
    "Lat": "29.7464826",
    "Long": "-95.3921964",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Utensils, Condiments containers",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAgYsL50s8sw5qk-iAULzjwNu3lNLIyfN3Qz4wpCan_rO1hGO3cf2SmIc9zhYVekQofKjefpaEwvBD_cUk9QC9z4hDhYa6y79sFftorelJCSfgrcKP0cYeDi0Qcnd8rcJtEhCaSeUG-4wHG6u-OSL8j66uGhQgLIHFHLJhj7ijAwrZqd3oUE3V9Q&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Cavo Coffee",
    "Address": "3773 Richmond Ave #1F, Houston, TX 77046",
    "Lat": "29.7324177",
    "Long": "-95.4372501",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Utensils",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAw3JxSsMFuQkuYT-q4CKi-SeSnKRVfzipdt0sVHxdKuaakT8-Ir5eeXfwt8ss4_UyxD9yBWyXYxGLSmM8eUv2WEgRWXJoFBBDF4cL405p2M9ZUJusC0PhCfCIA1zH4vzmEhCZu220WafaKBIyQmCt6rGmGhT2aGawtMPrv8YoU1yzrz9XrusoIg&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Edison & Patton",
    "Address": "4203 Edison St, Houston, TX 77009",
    "Lat": "29.7984211",
    "Long": "-95.3630626",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Containers for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAdxGuFAr_lQ-Bc7FhHl_Vu3f1mXgob8k2jVid0bXV83H9932oOH_NlZ3qv7FMYsBhPZPHw3F7ccFLsj6DtB2Za6deO1vgFhvZmimLPc2mN_f-oiP6iXlzwJXNfoRjdrwyEhBV5A97FVfefdte2-MqZewHGhTfaFaNLHGv3RbSmW_gpsxrXb7B0Q&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Spanish Flowers Mexican Restaurant",
    "Address": "4410, 4701 N Main St, Houston, TX 77009",
    "Lat": "29.7970923",
    "Long": "-95.3819315",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Containers for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAexroXYB1pVSFwKdYMQBRUY4OoNnz7K6E4pMODrgqvUoCEmU8HO0ux2-rJ6DEEENq3mS9pp2PuEzk_bRe0f2x8HPSQquIpNkIvBD0UJbqD6Z4s7Erja6rvlNOJ8mm3PvsEhCiwynFhW5yyaUv3eNYCiPYGhS9DbwItlxKV3_ef4DJgKfoWY-6Tw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Red Robin",
    "Address": "18800 Gulf Fwy, Friendswood, TX 77546",
    "Lat": "29.5471536",
    "Long": "-95.1495489",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Condiments containers, Containers for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAgGBlzd1tOM-PTx9uChppPaZwLO75dWG0wJkXKuVLrrDApeWjAfM5L8F7ERz_iT-jeKuVrYukF9BNQd1rCJcV8k_u2cgo2eBkbUZbH84L4uv8TzdtwE3CpL3JpVdsxLHeEhCKiEhWGrLEXg0t0weK4j6eGhQS7tlg_E_0RiSo2RXEX-6USD5sKw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "A 2nd Cup",
    "Address": "1111 E 11th St, Houston, TX 77009",
    "Lat": "29.7910813",
    "Long": "-95.3867161",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAhfDwovzn88ZOI6jIIsiL7B4WVsM-bg1JVyipRIZi545CpsYopHGrIEmnfSoCV_1D2JpDv0ctSROOD5Y_sbNNDsxkCytmTeKF9v8e6NdfO4A8pu4yagBuJM4UANwSDd9XEhCiT3937IX6RAEalZDrnOsKGhQwbKC8-PSqB46aP1oobVI_OZ_8hw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Blue Nile Ethiopian",
    "Address": "3030 Audley St, Houston, TX 77098",
    "Lat": "29.7375934",
    "Long": "-95.4265625",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAvYtauzfLSNqwGBTkS1Sr5FNl-8Rj6btTVOS1kasFxeBTXPT6ZllOOAuI0-cuW-Z1vKT_tk001rnShPJt5fPnw-252O177Huv4D6ndMZNiYqQCP4l9k5dmLyZXAtiehyMEhClYoeqYHm5bBF4RrVzW1h-GhQ5DFzKAshNMS5DZp2O2Ore_S9jBQ&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Corner Bakery Cafe",
    "Address": "107 Yale St Ste. 100, Houston, TX 77007",
    "Lat": "29.7726382",
    "Long": "-95.3989044",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Plates or serving containers, Utensils, Sides containers",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRZAAAAn5Lcj5F2-rmQrt2gQZstWkK03fMvIA_BeN3I6nO7Ob_XrPcG7-VT7x71-U7eCzkYpv7Pi_og3oZ4YQ48XeylHXpv_SLm7SZiCmD8-DCG1Iqby0GtR3Cd1SZhwkmYd3GjEhD5qWmhM450shmqVMDlIumkGhTITh-N9hOKefdld366YVmNRsMJDQ&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Beet Box Blend Bar",
    "Address": "1909 W Gray St B, Houston, TX 77019",
    "Lat": "29.752679",
    "Long": "-95.4031279",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Plates or serving containers",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA9b_FGRxsaq2U55F0AGSZ9P8lSWQPEiVpgzYxAFJ6Xqk7u9uHF_IFV5pwxlSxaNQI2teSqaE0oK-ynIWt0lTiLs9tCzRMmO1s14dN_Y_5fz77wPlFFUbJe8n1Y1HIqoq3EhDcJkIMpNCABnpiBYjZJO-kGhS1synY6oif2jAYYvvlgtzcfCljKw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Boston Market",
    "Address": "1915 W Gray St, Houston, TX 77019",
    "Lat": "29.7526756",
    "Long": "-95.4032745",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Condiments containers, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAHNoxKjTCp5YdV_rnqUI8VpVRzSe3dE3qUvth0v_Z1PrrtyoFmArsIx5wXw62pjGILQlk0y6wMGjPTI9KUFyfEvAY9lKCaxQf-L2Mtip6gTX7DvzgOF26obPZOO5GXnEsEhC1kpOYgC2xjgDdq7fLRR68GhQeUO1doRRBeP_Co52n3OwdvhChfw&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Panera Bread",
    "Address": "1705 W Gray St, Houston, TX 77019",
    "Lat": "29.7529705",
    "Long": "-95.4012793",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Containers for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRZAAAAZxd5LGZBt_djf6c8dt_QWBvSz7k11tqnHTMCMuTbMcXTlSO-_dBffi8kDLe67dv73I-kUxtsMhPHu0VStjMAq2vvPgiuW_WlxTLo_nBF8UHhEZGQEOdGxlSEZXr0sgWlEhC6r2wIVDztmwcvUuFbCApYGhRn0foqoQzZMaKTm1SKBNTGAbcm2w&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Smashburger",
    "Address": "174 Yale St, Houston, TX 77007",
    "Lat": "29.773657",
    "Long": "-95.3982499",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAdRTeS9MXSg_cr9dw8uPZ82D3LdM280adPZv9hNmJmktM3bmB9V3xoRe8Rk_62TCJlPOhgt6FfyZOjbzF1ydAejijJO_f8AzmHag57zRM8KcxZMgXAf_7nsB1p2m5DXK7EhDPwI-_V2p-LgILj86OyohIGhShtnUuK1GM3wzvlWeinJV0zNxXnQ&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Time for Thai- TMC",
    "Address": "6550 Bertner Ave, Houston, TX 77030",
    "Lat": "29.7095071",
    "Long": "-95.3976386",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Plates or serving containers, Utensils, Sides containers, Condiments containers, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAA2_Qcy0x2sVl6fjRPzG4MpsQx8A2so5uePhAoqHTXv05CXVboSigI23AWblgx4nByWsuLOe_JljLlMAkUeL-qU1i0VK3r2tnBPJSVHFGkXyo9rQnBmTNg2bqjAD1fdsH-EhB-YhDco8Ni05S4nim0h-NVGhSZe-yF8sbFrDZ5S70qrpUtYEd4hQ&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Mint Thai Kitchen",
    "Address": "540 Waugh Dr A, Houston, TX 77019",
    "Lat": "29.7601874",
    "Long": "-95.3986191",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Containers for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAnxxvp4g13cLMV6kIImQWDx8hvSmOEFeQr-qyonZdYbUT-h1GDtfj4GTvivdR6ky0w24B0wIPYOfI8q2IiY5aPT3BMslAvjMyj2at0hbSeaztZQakr1IqCkRP_kCBUiJdEhD42ccO7hTyp8iaQZMq-YBQGhTStjkvWFC5oTR5z_U36MUEyQYN1g&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Snooze, an A.M. Eatery",
    "Address": "3217 Montrose Blvd #100, Houston, TX 77006",
    "Lat": "29.7440024",
    "Long": "-95.3909796",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRZAAAAmEZ2P5XMRoA3_aWxLRH5RMXEew5N_Gr8BeJoI04RxvC4dhh7YFTbNwCKbzdNuzH1GdfVpe7KdU-76z-DaGnhzPwJ5BcP6dcGzEk7ptuo1oBCM0OIygq1NAFHbG17Ue7VEhBt_Zz6jMaZnqZur6gy2-fmGhS8lnH1TyiuX2xLmQUDrkMTeHcqRg&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Fadi´s Mediterranean Grill",
    "Address": "12360 Westheimer Rd suite a, Houston, TX 77077",
    "Lat": "29.736676",
    "Long": "-95.6005037",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Life Café",
    "Address": "815 Town & Country Ln, Houston, TX 77024",
    "Lat": "29.781014",
    "Long": "-95.560046",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Plates or serving containers, Utensils, Sides containers, Condiments containers, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out, Everything! Even the decoration",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Seiwa Market",
    "Address": "1801 S Dairy Ashford Rd #116, Houston, TX 77077",
    "Lat": "29.7469039",
    "Long": "-95.6049779",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Plates or serving containers, Sides containers, Containers for left overs or take out, Bags for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAACCqz_hxOiyn9jSmLklhGX-RnQlrlqSgZ_7tCYDPZNkTcmaUTuvVPFN-VNpE6D4qGxUL4D9gn-vr_vs4ssenUVNq20Vm4SmblfKCNJzwsISbOUZVqx9yfRJi47sH3N9ogEhAd70R_va490ovo3LoN9dVyGhRitOseoC1O6ruXSOZtpF7nXe7X6A&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Hibachi Grill & Buffet",
    "Address": "12183 Katy Fwy H, Houston, TX 77079",
    "Lat": "29.7831128",
    "Long": "-95.6016941",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, but only when asked for",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAoPQ3sUp4IUw5UquRwXIVK7HErkdcEKmOgBsdGgkVDqJblkPI3wZotX6nTlOcs9kfPkwXGE3c0fuMdVF3ZCPCdsXAksFnSoO3PolrlcsokQv3l4aKT9DLyOHVYUAmo_TZEhCQ36RmAtVMIEgVIK7lX5IYGhQ15KgQuX0RIQJOVdwcG8i__0vr1g&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Burger-chan",
    "Address": "5 Greenway Plaza C-630, Houston, TX 77046",
    "Lat": "29.7306564",
    "Long": "-95.4318419",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Beverage containers, Straws, Plates or serving containers, Utensils, Sides containers, Condiments containers, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRZAAAAyI8-5w323LwqJxzTpPpwZ5gXYOu-WTruLo5_5WTuEqxRT06NqZqoQVcGyPVkFvRZ4qEytoJdulLuToMBtXI3dI-ONc_TQaonTPrmw_WSdC3wnegvAtUWzmXhamko8RNqEhCrO7-r3y6Kmc_3tKZZRiEgGhQVsjun1qmKTaOpfcjg6kCi1GwE2g&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Luna Pizzeria",
    "Address": "3435 Kirby Dr, Houston, TX 77098",
    "Lat": "29.7351193",
    "Long": "-95.4177819",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Sides containers, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAnsI7M1CIeiH2wTNP68-BsFHbqlBk3tHpvSacPuSke5hFHhNTlM8Z4LCaVqTWg4fdnxZXQzn0begXJ5JlQV5idcsqXCpeQJmGrtq2I5zU4u1RpDSPmi1QhaOV-Frkef4sEhByhnTRO_RE_8FbZBhqYpZcGhQklPLkW8xK0tmIi7V8iI717vRBPA&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  },
  {
    "Name": "Calliope's",
    "Address": "7590 W Bellfort St, Houston, TX 77071",
    "Lat": "29.6564126",
    "Long": "-95.5106341",
    "Styrofoam": "TRUE",
    "Plastic": "TRUE",
    "Condiments": "TRUE",
    "Compostable": "TRUE",
    "field9": "Straws, Plates or serving containers, Utensils, Sides containers, Condiments containers, Containers for left overs or take out, Bags for left overs or take out, Utensils for left overs or take out",
    "Image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAsz8vmb9HWec973LGCgAH-GtWcXn-HPZxwd2K4TSGt9zzMvgWPqsWwBN0-o4HCZ_w1T7fD4s4Tfx5lcHxqguXJdCp6SM9ePfeQtrBuRPCbLd-mwJyC9RmTOWOVVMGdKo3EhB8t6ZJ2QS2Qx0Jm6AjtvmPGhRH1ZyHjYAzUj5lvYJUf0Nri4sVEg&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA"
  }
]
  
// Easily setup/seed database
const eraseDatabaseOnSync = true;
const port = process.env.PORT || 3000;

const wait = time => new Promise(resolve => setTimeout(resolve, time))

// Synchronize database and start Express server
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {

    // seedData();
    seedData.reduce(async (acc, row) => {
      await acc;
      Place.create({
        name: row.Name,
        imageUrl: row.Image,
        address: row.Address,
        lat: row.Lat,
        long: row.Long,
        styrofoam: row.Styrofoam,
        plastic: row.Plastic,
        icondiments: row.Condiments,
        compostable: row.Compostable
      });
      return wait(1000);
    }, Promise.resolve())

    // seedData.forEach(function(row) {
    //   console.log('Creating ' + row.Name);
    //   Place.create({
    //     name: row.Name,
    //     imageUrl: row.Image,
    //     address: row.Address,
    //     lat: row.Lat,
    //     long: row.Long,
    //     styrofoam: row.Styrofoam,
    //     plastic: row.Plastic,
    //     icondiments: row.Condiments,
    //     compostable: row.Compostable
    //   });
    // });
  }

  app.listen(port, () =>
    console.log(`Destroyer of straws server listening on port ${port}!`)
  );
});
