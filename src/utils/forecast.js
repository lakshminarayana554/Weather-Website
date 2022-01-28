// const url = 'http://api.weatherstack.com/current?access_key=a6af70734db6bf46ad2379876c3d8665&query=16.8073,81.5316&units=f'

const request = require("request")



const forecast =(latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=167802fe6c287a564d7d2da1465fe9a1&query='+latitude+','+longitude+'&units=f'
    
    request({url, json:true},(error,{body} = {})=>{

        if(error){
            callback('low level error',undefined)
        } else if(body.error) {
            callback('coordinate error',undefined)
        }else {
            
            callback(undefined,
                body.current.weather_descriptions[0] + ' . it is currently ' + body.current.temperature + ' degress out.it feels like ' + body.current.feelslike + ' degrees out.' 
        )
    }
})



}

module.exports = forecast