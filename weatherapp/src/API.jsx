import { useEffect } from "react";

// function to return long, lat from a given city name
const getCoordinatesFromCityName= (city)=> {
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