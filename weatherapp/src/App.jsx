import { useEffect, useState, useMemo } from "react";
import { getWeatherInfoFromCityName } from "./API";
import "./App.css";

function App() {
  const [data, setData] = useState(null);   // weather data
  const [error, setError] = useState(null); // error message
  const city = "Berlin";

  useEffect(() => {
    setData(null);
    setError(null);
    getWeatherInfoFromCityName(city)
      .then(setData)
      .catch(e => setError(e.message));
  }, []);

  // Build derived data OUTSIDE JSX so it’s reusable/visualizable later
  const hourlyList = useMemo(() => {
    if (!data) return [];
    return data.hourly.time.map((time, i) => ({
      time,
      temp: data.hourly.temperature_2m[i],
      humidity: data.hourly.relative_humidity_2m?.[i],
      precip: data.hourly.precipitation?.[i],
    }));
  }, [data]);

  const dailyList = useMemo(() => {
    if (!data) return [];
    return data.daily.time.map((date, i) => ({
      date,
      max: data.daily.temp_max[i],
      min: data.daily.temp_min[i],
      sunrise: data.daily.sunrise[i],
      sunset: data.daily.sunset[i],
    }));
  }, [data]);

  // If you specifically want Map structures for later lookups:
  const hourlyMap = useMemo(() => {
    const m = new Map();
    for (const row of hourlyList) m.set(row.time, row);
    return m;
  }, [hourlyList]);

  const dailyMap = useMemo(() => {
    const m = new Map();
    for (const row of dailyList) m.set(row.date, row);
    return m;
  }, [dailyList]);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading weather for {city}…</div>;

  return (
    <div className="app">
      <h2>Weather in {city}</h2>

      {/* Current */}
      <p>Temp: {data.current.temperature_2m}°C</p>
      <p>Wind: {data.current.wind_speed_10m} km/h</p>
      <p>Humidity: {data.current.relative_humidity_2m}%</p>

      {/* Daily summary for today */}
      <h3>Today’s highs/lows</h3>
      <p>
        Max: {dailyList[0].max}°C · Min: {dailyList[0].min}°C
      </p>

      {/* Hourly preview (first 5 rows) */}
      <h3>Next Hours</h3>
      <ul>
        {hourlyList.slice(0, 5).map((h) => (
          <li key={h.time}>
            {h.time}: {h.temp}°C, {h.humidity ?? "-"}% RH, {h.precip ?? 0} mm
          </li>
        ))}
      </ul>

      {/* Daily preview */}
      <h3>Daily Forecast</h3>
      <ul>
        {dailyList.map((d) => (
          <li key={d.date}>
            {d.date}: Max {d.max}°C / Min {d.min}°C (Sunrise {d.sunrise}, Sunset {d.sunset})
          </li>
        ))}
      </ul>

      {/* You now also have hourlyMap and dailyMap available for lookups */}
      {/* Example lookup (not rendered): hourlyMap.get("2025-08-10T14:00") */}
    </div>
  );
}

export default App;
