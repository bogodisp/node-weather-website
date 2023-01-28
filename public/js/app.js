console.log('Client side javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data)=>{
        console.log(data)
    })
}) 

// fetch('http://localhost:3000/weather?address=!').then((response =>{
//     response.json().then(({error="",forecast,location,address}) => {
//         if(error){
//             return console.log(error)
//         }

//         console.log(forecast)
//         console.log(location)
//         console.log(address)
//     })
// })) 

const weatherform = document.querySelector('form')
const search      = document.querySelector('input')
const messageOne  = document.querySelector('#message-one')
const messageTwo  = document.querySelector('#message-two')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const q_address = search.value   
    
    messageOne.textContent ="Loading..."
    messageTwo.textContent = ""
    fetch('http://localhost:3000/weather?address='+q_address).then((response) =>{
        response.json().then(({error="",forecast,location,address}) => {
            if(error){
                // console.log(error)
                messageOne.textContent =""
                messageTwo.textContent = error
            }
            else{
                messageOne.textContent = location
                messageTwo.textContent = forecast
                // console.log(forecast)
                // console.log(location)
                // console.log(address)
            }
        })
    })

})