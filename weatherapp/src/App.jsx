import Widget from './Widget'
import WeatherAPI from "./Api";
import "./App.css";

function App() {
  let data = 0;
  let arrayData = [];
  for (i = 0; i < 5; i++) {
    arrayData.push(i);
  }

  return (
    <>
      <WeatherAPI />
      <Widget data={data} />

      {arrayData.map((item, index) => {
        <dayWidget key={index} data={item} />;
      })}
    </>
  );
}

export default App
