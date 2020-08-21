const request = require('request')

const geocode = (address, callback) => {
    const latlongurl =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWttYWxoYWtpbSIsImEiOiJja2UwMDhsdmoya2YzMnRtcGRka3ZoNW0wIn0.oDTsc804XILm2a_8A6Hndg&limit=1";
      request({url:latlongurl,json:true},(error,{body})=>{
          if(error){
              callback('Unable to connect to location services',undefined)
          }else if(body.features.length === 0){
              callback('Unable to find location. Try another search',undefined)
          }
          
          else{
              callback(undefined, {
                   lat : body.features[0].center[1],
                   long : body.features[0].center[0],
                   location: body.features[0].place_name
  
              })
          }
      })
  };

  module.exports = geocode