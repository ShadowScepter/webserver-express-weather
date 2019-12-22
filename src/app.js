const path = require('path')
const express = require('express') // install using npm i express
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // install hbs for express using npm i hbs
app.set('views', viewsPath) // setting custom location for views
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Sidharth Sreekumar'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Sidharth Sreekumar'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide location'
    })
  } else {
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (!error) {
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error
            })
          } else {
            return res.send({
              location,
              forecastData,
              address: req.query.address
            })
          }
        })
      } else {
        return res.send({
          error
        })
      }
    })
  }
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  return res.send({
    products: [],
    search: req.query.search
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'We\'re here to help you',
    name: 'Sidharth Sreekumar'
  })
})

app.get('/help/*', (req, res) => {
  res.render('errorpage', {
    title: '404',
    message: 'Help article that you are looking for is not found',
    name: 'Sidharth Sreekumar'
  })
})

app.get('*', (req, res) => {
  res.render('errorpage', {
    title: '404',
    message: 'The page you are looking for is not found',
    name: 'Sidharth Sreekumar'
  })
})

app.listen(port, () => {
// console.log(`Server is up on port ${port}.`)
})
