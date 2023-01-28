const needle = require("needle");

const forecast = (long,lat,callback) =>{
    const lat_long    = encodeURIComponent(lat+','+long)
    const weather_url = 'https://api.weatherapi.com/v1/current.json?key=2114938983734afab92163025232601&q='+lat_long+'&aqi=no'
    needle.get(weather_url,(res_error,{body:{error,current},statusCode}) =>{
        if(error){
            callback("unable to find weather location",undefined)
        }

        else if(!res_error && statusCode == 200){
            callback(undefined,"It's currently "+current.temp_c+" degrees C and it's "+current.condition.text)
        }

        else 
            callback("network: unable to connect to weather forecast service",undefined)
    })
}

module.exports = forecast