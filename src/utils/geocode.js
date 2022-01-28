const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FtbHVjeSIsImEiOiJja3lud3h0cTUwYnJiMm9veXBhajRiZTZhIn0.ZzLXzsc7mJBLhfi0xBeERw&limit=1'

    request({url, json: true},(error,{body} = {})=> {
        
        if (error){
                callback({
                    Error:'Unable to connect to location services'
                })
        }else if (body.features.length === 0){
            callback({
                Error:'cannot access geolocation'
            })
        }else {
            callback(undefined,{
                 latitude : body.features[0].center[1],
                 longitude :body.features[0].center[0],
                 location : body.features[0].place_name

            })
        }
    })



}

module.exports = geocode