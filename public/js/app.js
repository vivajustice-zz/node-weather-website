const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value
        
        messageOne.textContent = 'loading...'
        messageTwo.textContent = ''
        
        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast 
                   
                }
            })
        })
})