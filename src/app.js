const express  = require('express')
const path     = require('path')
const hbs      = require('hbs')
const geocode  = require("./utils/geocode")
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewPath      = path.join(__dirname,'../templates/views')
const partialsPath  = path.join(__dirname,'../templates/partials')

//setup handlerbars engine and view locations
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{
        title: "Weather app",
        name: "Daniel Moddle" 
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: "About me",
        name: "Daniel woogly"
    })
})

app.get('/help',(req,res) => {
    res.render("help",{
        helptext: "Some helpful insight",
        title: "Help page ",
        name:"Daniel woobly"
    })
})

app.get('/weather',({query},res)=>{
    if(!query.address){
        return res.send({
            error: "No address provided"
        })
    }

    geocode(query.address,(error,{longitude,latitude,location}={}) =>{
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(longitude,latitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address : query.address
            })
        })
    })
})

app.get('/products',(req,res) => {
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        product: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render("404",{
        title: "Error 404 ",
        message: "Help article not found",
        name: " Daniel molowysk"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: "Error 404 ",
        message: " Page not found ",
        name: "James Kowasky"
    })
})

app.listen(port,() => {
    console.log('Server is up on port 3000.')
})