const data = require('./data');
const fs = require('fs-extra');
const axios = require('axios');
const API_KEY = 'AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA'

// function getPhotos() {
//     let newPhotos = []

//     axios
//         .get(this.cleanUrl)
//         .then(response => (this.photoRef = response.candidates[0].photos[0].photo_reference))
// }

function getCleanURL(place) {
    const cleanName = place.Name.split(' ').join('%20')
    const cleanLatLong = place.Lat + ',' + place.Long
    const cleanURL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + cleanName + '&inputtype=textquery&fields=photos&locationbias=circle:2000@' + cleanLatLong + '&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA'
    return cleanURL;
}
async function getPhotoReference(cleanUrl) {
    const response = await axios.get(cleanUrl).then(({ data }) => data).catch(e => '')
    let reference = '';
    if (response && response.candidates) {
        reference = response.candidates[0].photos[0].photo_reference;
    }
    return reference;
}

function getImageUrl(reference) {
    const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=${API_KEY}`
    return url;
}

; (async function () {
    const responses = await Promise.all(data.map(async place => {
        const cleanUrl = getCleanURL(place);
        const reference = await getPhotoReference(cleanUrl);
        return {...place, Image: getImageUrl(reference)}
    }))
    fs.writeFileSync('./data-with-images.json', JSON.stringify(responses, null, 2));
})()