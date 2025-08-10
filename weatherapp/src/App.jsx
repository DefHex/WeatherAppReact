import CurrentWeatherWidget from "./Widget/CurrentWeatherWidget";
import HourlyWeatherWidget from "./Widget/HourlyWeatherWidget";
import DailyWeatherWidget from "./Widget/DailyWeatherWidget";

import WeatherApi from "./apis/WeatherApi"

function App() {
  let weatherData= WeatherApi("Essen");
  return (
    <div>
      <CurrentWeatherWidget />
      <HourlyWeatherWidget />
      <DailyWeatherWidget />
    </div>
  );
}

export default App;