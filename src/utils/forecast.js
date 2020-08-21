const request = require('request')

const forecast = (lat,long,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=dc27d2ab4d941522f3997a367ede1106&query=${lat},${long}`
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect',undefined)
        } else if (response.body.error){
            callback('Unable to find location')
        }else{
            callback(undefined,`It is currently ${response.body.current.temperature} degrees`)
        }
    })
}

module.exports = forecast