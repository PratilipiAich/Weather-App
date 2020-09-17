import React, { useState } from "react";
import "weather-icons/css/weather-icons.css";

const api = {
  key: "b34b0ccf907c9655450d3ad093fc001e",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
          get_WeatherIcon(weatherIcon, result.weather[0].id);
        });
    }
  };

  let today = new Date().toDateString();

  let weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog",
  };

  function get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        setIcon(icons.Thunderstorm);
        break;
      case rangeId >= 300 && rangeId <= 321:
        setIcon(icons.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 521:
        setIcon(icons.Rain);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon(icons.Snow);
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon(icons.Atmosphere);
        break;
      case rangeId === 800:
        setIcon(icons.Clear);
        break;
      case rangeId >= 801 && rangeId <= 804:
        setIcon(icons.Clouds);
        break;
      default:
        setIcon(icons.Clouds);
    }
    return icon;
  }
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 20
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search.."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              {/* <div className="date">{dateBuilder(new Date())}</div> */}
              <div className="date">{today}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                <div className="icons">
                  <i className={`wi ${icon}`}></i>
                </div>
                <div className="temp-value">
                  {Math.round(weather.main.temp)}&deg;c
                </div>
                <div className="min-max">
                  <span>{Math.round(weather.main.temp_min)}&deg;c</span>
                  <span style={{ marginLeft: "150px" }}>
                    {Math.round(weather.main.temp_min)}&deg;c
                  </span>
                </div>

                {/* <div className="desc">Humidity: {weather.main.humidity}%</div> */}
              </div>
              <div className="weather">
                {weather.weather[0].description.charAt(0).toUpperCase() +
                  weather.weather[0].description.slice(1)}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default Weather;
