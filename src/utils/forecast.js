const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=552f5a7a92e405effad88c7ad2518230&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body } ) => {
        if (error) {
            callback('Unable to connect to weather services. Please check your internet connectivity', undefined)
        } else if (body.error) {
            callback('Unable to find weather report for that location, try again', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +'. It is currently ' + body.current.temperature + ' out. There is a ' + body.current.precip + '% chance of rain. The wind is blowing ' + body.current.wind_dir + ' at a speed of ' + body.current.wind_speed + 'mph. Pressure currently is ' + body.current.pressure + ' bar' )
            
            }
    })
}

module.exports = forecast