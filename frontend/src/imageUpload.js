function() {
    let newPhotos = []
    const cleanName = this.place.name.split(' ').join('%20')
    const cleanLatLong = this.place.lat + ',' + this.place.long
    const cleanURL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + cleanName + '&inputtype=textquery&fields=photos&locationbias=circle:2000@' + cleanLatLong + '&key=AIzaSyBCaefNSg4gDcMabTmH8-1qAsl7lRPE1lA'

    axios
    .get(this.cleanUrl)
    .then(response => (this.photoRef = response.candidates[0].photos[0].photo_reference))
}