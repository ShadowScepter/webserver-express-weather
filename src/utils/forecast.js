const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const darkskyKey = '2b150d23d5e4ce734b60bb6628339b02'
  const exclude = 'exclude=minutely,hourly,alerts,flags'
  const units = 'units=si'
  // Siddhachal Housing Society, Pawar Nagar, Thane West, Thane, Maharashtra 400610
  const url = 'https://api.darksky.net/forecast/' + darkskyKey + '/' + latitude + ',' + longitude + '?' + exclude + '&' + units;
  // Refactored by ES6 standards | Check Playground/5-es6-objects.js for reference
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(error, undefined)
    } else if (body.error) {
      callback(body.error, undefined)
    } else {
      const { currently, daily } = body
      callback(undefined, daily.data[0].summary + ' It is currently ' + currently.temperature + ' degrees out. There is a ' + currently.precipProbability + '% chance of rain')
    }
  })
}

module.exports = forecast
