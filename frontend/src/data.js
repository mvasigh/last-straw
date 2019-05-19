import rawData from './data.json';

const getRandomBool = () => Math.random() > 0.5;

const data = rawData.map(place => ({
  lat: parseFloat(place.Latitude),
  long: parseFloat(place.Longitude),
  address: place.Address,
  name: place['Restaurant Name'],
  styrofoam: getRandomBool(),
  plastic: getRandomBool(),
  icondiments: getRandomBool(),
  compostable: getRandomBool()
}));

export default data;
