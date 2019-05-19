import axiosRaw from 'axios';

let API_URL = process.env.VUE_APP_API_URL
const axios = axiosRaw.create({
  baseURL: API_URL
});

export async function getAllPlaces() {
  const places = axios.get('places').then(({ data }) => data);
  return places;
}
