import { useEffect } from "react";

// function to return long, lat from a given city name
export const getCoordinatesFromCityName= (city)=> {
    // define fetch link for geocoding api
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    return fetch(url)
    .then(res => {
        if (!res.ok) {
            throw new Error(`Network error: ${res.status}`)
        }
        else {
            return res.json()
        }  
    })  
    .then(jsondata => {
        // if API returns no results or results are empty
        if (!jsondata.results || jsondata.results.length === 0) {
            throw new Error("Error fetching data! City name not found.")
        }
        else {
            const topResult= jsondata.results[0]
            return { 
                latitude: topResult.latitude,
                longitude: topResult.longitude
            }
        }
    })
};

export const getWeatherInfoFromCoordinate= (latitude, longitude)=> {
    // define fetch link for open-mateo 
    const url = "https://api.open-meteo.com/v1/forecast"
  + `?latitude=${latitude}`
  + `&longitude=${longitude}`
  + "&daily=weather_code,sunrise,sunset,temperature_2m_max,temperature_2m_min"
  + "&hourly=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m"
  + "&current=temperature_2m,is_day,relative_humidity_2m,weather_code"
  + "&timezone=auto";

    return fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Network error: ${res.status}`)
            }
            else {
                return res.json()
            }
        })
        .then(jsondata => {
            return {
                current: jsondata.current,
                hourly: jsondata.hourly,
                daily: jsondata.daily
            }
        })
};

export const getWeatherInfoFromCityName= (city)=> {
    return getCoordinatesFromCityName(city)
        .then(response => {
            return getWeatherInfoFromCoordinate(response.latitude, response.longitude)
        })
}

/*
Example API response for Berlin from the Open-Meteo Geocoding API:

{
  "results": [
    {
      "id": 2950159,
      "name": "Berlin",
      "latitude": 52.52437,
      "longitude": 13.41053,
      "country": "Germany"
    }
  ]
}

- results: an array of location objects
- latitude & longitude: used for the weather API
*/