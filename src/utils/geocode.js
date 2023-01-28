const     fs = require('fs')
const needle = require('needle') 

const read_app_config = type => {
    const raw_data = fs.readFileSync('./src/utils/weather.json')
    const config_data = JSON.parse(raw_data)
    const config = config_data.filter(obj => Object.keys(obj)[0] === type)
    
    if(config.length) return config[0][type]
    return {}
}

const create_geo_url = (config,location) => config.url+"q="+encodeURIComponent(location)+"&key="+config.apikey+"&language="+config.lang+"&pretty=1"

const geo_code =  (location, callback) => {
    setTimeout(()=>{
        const loc_config = read_app_config('geocoding')
        let   geo_url    = ""
        if(loc_config != {}){
            geo_url = create_geo_url(loc_config,location)
        }
        else{
            console.log("app location configuration error")
        }

        needle.get(geo_url,(error,response)=>{
            if(!error && response.body.total_results == 0){
                callback("unable to find location, try another search",undefined)
            }

            else if(!error && response.statusCode == 200){
                const place = response.body.results[0]
                
                callback(undefined,{
                    latitude : place.geometry.lat,
                    longitude: place.geometry.lng,
                    location : place.formatted
                })
            }

            else{
                callback("network: unable to connect to location services",undefined)
            }
        })

    },2000)
}


module.exports = geo_code