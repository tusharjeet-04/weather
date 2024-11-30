import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setcity] = useState("");
  const [Weather, setWeather] = useState(null);
  const [error, seterror] = useState(null);

  const API_KEY = "a007034885346be8b8bafd9a2d9cb169";
  const getWeather = async (e) => {
    e.preventDefault();
    seterror(null);
    if (!city) {
      seterror("Please enter a City...");
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod == 200) {
        setWeather(data);
      } else {
        seterror(data.message);
      }
    } catch (error) {
      seterror("error in fetching data");
    }
  };

  return (
    <>
      <div className="mainPardiv">
        <h1 className="WeatherHead">Weather App</h1>
        <form onSubmit={getWeather} className="WeatherForm">
          <input
            className="CityInput"
            type="text"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            placeholder="Enter City"
          />
          <button className="SearchButton">Search</button>
        </form>

        {error && <p style={{ color: "red" }} className="error">{error}</p>}

        {Weather && (
          <div className="WeatherResult">
            <div className="ParWeatherInfo Parcity">
              <div className="Cityimg"></div>
              <p className="ResultCityName">
                City: {Weather.name}, {Weather.sys.country}
              </p>
            </div>

            <div className="ParWeatherInfo">
              <div className="TempImg"></div>
              <p>Temperature: {Weather.main.temp}°C</p>
            </div>

            <div className="ParWeatherInfo">
              <div className="descritionimg"></div>
              <p>Description: {Weather.weather[0].description}</p>
            </div>

            <div className="ParWeatherInfo">
              <div className="Humidityimg"></div>
              <p>Humidity: {Weather.main.humidity}</p>
            </div>

            <div className="ParWeatherInfo">
              <div className="Windimg"></div>
              <p>Wind Speed: {Weather.wind.speed}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;