import axiosRaw from 'axios';

let API_URL = process.env.VUE_APP_API_URL;
const axios = axiosRaw.create({
  baseURL: API_URL
});

export function getAllPlaces() {
  return axios.get('places').then(({ data }) => data);
}

export async function getPlace(placeId) {
  return axios.get(`places/${placeId}`).then(({ data }) => data);
}
