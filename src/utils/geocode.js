const request=require("request")


const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoicHJpeWFuc2h1MSIsImEiOiJja3QxYm1hY3AwOG13MnZtbGkyc2U2YjUxIn0.9-i2jn3mHazFFfDL7xpXxw&limit=1https://api.mapbox.com/geocoding/v5/mapbox.places/Agar.json?access_token=pk.eyJ1IjoicHJpeWFuc2h1MSIsImEiOiJja3QxYm1hY3AwOG13MnZtbGkyc2U2YjUxIn0.9-i2jn3mHazFFfDL7xpXxw&limit=1"

    request({url,json:true},(error,{body})=>{
            if(error){
                callback("Unable to connect to location services",undefined)
            }
            else if(body.features.length===0){
                callback("Unable to find location. Try another search.",undefined)
            }
            else{
                callback(undefined,{
                latitude :  body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
        
                })
        }
        })


}

module.exports=geocode