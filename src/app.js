const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir to servw
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'The Fishermans Weather App',
        name: 'Sam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About the crew',
        name: 'Sam',
    })
})

//const locationRequest

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Docs',
        message: 'Help Docs Below',
        content: 'Commodo aliqua et eu voluptate qui esse magna adipisicing nulla amet voluptate. Eu nisi aute cupidatat cillum. Exercitation dolor ex elit sint laboris enim tempor est ipsum ut enim ipsum.',
        name: 'Sam'
    })
})








app.get('/weather', (req, res,) => {
const locationRequest = req.query.address

if (!locationRequest) {
    return res.send({
        error: 'Please provide location for forecast'
    })
} 
        geocode(locationRequest, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                
        res.send({
            title: 'Weather Forecast',
            location,
            forecast: forecastData,
            address: locationRequest
                })
        })
    })
})





// if (!locationRequest) {
//     console.log('please provide location request')
// } else {
//         geocode(locationRequest, (error, { latitude, longitude, location } = {}) => {
//             if (error) {
//                 return(error)
//             }
//             forecast(latitude, longitude, (error, forecastData) => {
//                 if (error) {
//                     return(error)
//                 }
                
//                 console.log(location)
//                 console.log(forecastData)
                
//         })
//     })
// }




app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Sam',
        errorMessage: 'Article not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Sam',
        errorMessage: 'Page not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port :3000')
})

