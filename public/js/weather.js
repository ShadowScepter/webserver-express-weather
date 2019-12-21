fetch('http://localhost:3000/weather?address=Meenadom').then((response) => {
  response.json().then((data) => {
    console.log(data)
  })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  msg1.textContent = 'Loading...'
  const location = search.value
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg1.textContent = data.error
        msg2.textContent = ''
      } else {
        msg2.textContent = data.forecastData
        msg1.textContent = data.location
      }
    })
  })
})
