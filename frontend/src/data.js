import rawData from './data.json';

const data = rawData.map(place => {
  place.Latitude = parseFloat(place.Latitude);
  place.Longitude = parseFloat(place.Longitude);
  return place;
})

export default data;