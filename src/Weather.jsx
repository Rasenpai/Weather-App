import React from "react";
import { useState, useEffect, useRef } from "react";
import TypeIt from "typeit-react";
import ClearIcon from "./assets/clear.png";
import CloudIcon from "./assets/cloud.png";
import MistIcon from "./assets/mist.png";
import RainIcon from "./assets/rain.png";
import SnowIcon from "./assets/snow.png";

const Weather = () => {
  const [name, setName] = useState("");

  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const allIcon = {
    "01d": ClearIcon,
    "01n": ClearIcon,
    "02d": CloudIcon,
    "02n": CloudIcon,
    "03d": CloudIcon,
    "03n": CloudIcon,
    "04d": CloudIcon,
    "04n": CloudIcon,
    "09d": RainIcon,
    "09n": RainIcon,
    "10d": RainIcon,
    "10n": RainIcon,
    "11d": RainIcon,
    "11n": RainIcon,
    "13d": SnowIcon,
    "13n": SnowIcon,
    "50d": MistIcon,
    "50n": MistIcon,
  };

  useEffect(() => {
    const userName = window.prompt("Masukan nama anda: ");
    if (userName) setName(userName)
  }, []);

  const search = async (city) => {
    if (city === "") {
      alert("Masukan nama kota");
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcon[data.weather[0].icon] || ClearIcon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        status: data.weather[0].main,
        icon: icon,
      });
    } catch (error) {
      console.error(error);
      alert("Masukan nama kota yang benar");
    }
  };

  useEffect(() => {
    search("jakarta");
  }, []);

  function keyHandle(e) {
    if (e.key === "Enter") {
      search(e.target.value);
    }
  }

  return (
    <>
      <h1 className="text-white text-center mt-5 text-2xl font-bold">
        <TypeIt
          options={{
            speed: 50,
            loop: true,
          }}
          getBeforeInit={(instance) => {
            instance
              .type(`Selamat datang ${name}`)
              .pause(750)
              .delete()
              .pause(500)
              .type("Dibuat oleh Rasena!");

            // Remember to return it!
            return instance;
          }}
        />
      </h1>
      <div className="container relative flex justify-center items-center h-screen m-auto ">
        <div className="box  md:h-[600px] md:w-96 w-[350px] h-[500px] rounded-xl bg-[rgba(255,255,255,.1)] backdrop-blur-sm drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)]">
          <div className="search-bar flex justify-center items-center p-5  text-white">
            <div className="wrapper flex  md:gap-5 gap-3 border border-slate-200 p-3 rounded w-full ">
              <i className="ri-map-pin-fill text-2xl mx-3"></i>
              <input
                ref={inputRef}
                onKeyDown={keyHandle}
                type="text"
                placeholder="Search City"
                className="placeholder-white outline-0"
              />
              <i
                className="ri-search-line text-2xl cursor-pointer"
                onClick={() => search(inputRef.current.value)}
              ></i>
            </div>
          </div>

          <div className="weather">
            <img
              src={weatherData.icon}
              alt=""
              className="md:w-52 w-38 mx-auto p-3 "
            />
            <p className="text-white text-center text-5xl p-3 font-bold">
              {weatherData.temperature}°<sup>c</sup>
            </p>
            <p className="text-white text-center text-2xl p-3 font-bold">
              {weatherData.status}
            </p>
            <p className="location text-white text-center text-2xl font-bold absolute w-full">
              {weatherData.location}
            </p>
          </div>

          <div className="weather-detail relative flex text-white text-2xl p-5 m-5 font-bold w-full mx-5">
            <div className="humidity mr-5 m-5">
              <i className="ri-water-percent-fill absolute left-0 md:top-[75px] md:text-3xl top-[50px] text-2xl"></i>
              <div className="humidity-info absolute md:top-16 md:ml-5 top-8 ml-1">
                <span className="text-2xl">{weatherData.humidity}%</span>
              </div>
              <p className="absolute md:top-24 md:ml-5 top-18 text-sm">
                Humidity
              </p>
            </div>
            <div className="humidity mr-5 absolute md:left-14 ml-38 md:top-0 -top-7 w-full">
              <i className="ri-windy-line absolute -left-5 top-[75px] text-3xl"></i>
              <div className="humidity-info absolute top-16 ml-5">
                <span className="text-2xl">{weatherData.windSpeed}Km/h</span>
              </div>
              <p className="absolute top-24 text-sm ml-5 text-center">
                Wind speed
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
