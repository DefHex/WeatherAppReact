// This file uses Open Meteo API to fetch weather data

// function to return long, lat for a city name
export const getCoordinatesFromCityName= async(city)=> {
    // define fetch link for geocoding api
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const res= await fetch(url)
    if (!res.ok) {
        throw new Error(`Network Error! ${res.status}`)
    }
    // changing response to json
    const jsondata= res.json()
    if(!jsondata.resutls || jsondata.resutls.length===0) {
        throw new Error(`Error fetching data! city name (${city}) not found.`)
    }
    // getting the first result from the json: some city names generate more than one result => london => uk, usa, canada
    return { latitude: jsondata[0].latitude, longitude: jsondata[0].longitude}
};

// function to return current, hourly and daily weatherdata for a (lat, long)
export const getWeatherDataFromCoordinate= async(latitude, longitude)=> {
    // define fetch link for open-mateo 
    const url = "https://api.open-meteo.com/v1/forecast"
              + `?latitude=${latitude}`
              + `&longitude=${longitude}`
              + "&daily=weather_code,sunrise,sunset,temperature_2m_max,temperature_2m_min"
              + "&hourly=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m"
              + "&current=temperature_2m,is_day,relative_humidity_2m,weather_code"
              + "&timezone=auto";

    const res= await fetch(url);
    if (!res.ok) {
        throw new Error(`Network Error! ${res.status}`)
    }
    const jsondata= res.json()
    return { curret: jsondata.curret, hourly: jsondata.hourly, daily: jsondata.daily }
};

// function to return weather data for a city name
const WeatherApi= async(city)=> {
    const coordinates= getWeatherInfoFromCoordinate(city)
    const weatherData= getWeatherDataFromCoordinate(coordinates.latitude, coordinates.longitude)
    return weatherData
}

export default WeatherApi;

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

/*
Example Weather API response shape:

{
  current: { temperature_2m: 30.2, is_day: 1, relative_humidity_2m: 32, weather_code: 0 },
  hourly: { time: [...], temperature_2m: [...], weather_code: [...], wind_speed_10m: [...], relative_humidity_2m: [...] },
  daily: {
    time: [...],
    weather_code: [...],
    sunrise: [...],
    sunset: [...],
    temperature_2m_max: [...],
    temperature_2m_min: [...]
  }
}
*/