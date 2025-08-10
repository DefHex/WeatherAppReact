import './App.css'

function CurrentWeatherWidget(props) {
  return (
    <div className="mainDiv">
      <p>Temp: {props.data.relative_humidity_2m}°C</p>
      <p>Wind: {props.data.wind_speed_10m} km/h</p>
      <p>Humidity: {props.data.relative_humidity_2m}%</p>
    </div>
  );
}

export default CurrentWeatherWidget;