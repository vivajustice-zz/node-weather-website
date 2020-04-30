const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1Ijoidml2YWp1c3RpY2UiLCJhIjoiY2s5aWoxM3VnMDNqMDNldnk4M2d4bzlwciJ9.umd0Lw6omA8kFA_pg0xPtQ'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to map services. Please check your internet connectivity', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, please try again', undefined)
        } else {
            callback(undefined, {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name
               
            })
        }

    })

}

module.exports = geocode