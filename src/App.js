import React, { useState, useEffect } from "react";

//import axios
import axios from "axios";

//import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

//API key
const APIkey = "164190171d18ca25d91eb11ecbfea162";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Datça");
  const [inputValue, setInputValue] = useState("");

  const textChangeHandler = (e) => {
    setInputValue(e.target.value);
  };
  console.log(inputValue);
  //fetch Data
  //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios.get(url).then((response) => setData(response.data));
  }, [location]);

  //If data is not exist show spinner
  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner8 className="text-5xl animate-spin" />
        </div>
      </div>
    );
  }

  //Set icon according to weather type
  let icon;
  console.log(data);

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rainy":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunder":
      icon = <IoMdThunderstorm />;
      break;
  }
  //date object
  const date = new Date();
  return (
    <div
      className="w-full h-screen bg-gradient-to-r from-indigo-600 to-blue-200 
    flex flex-col items-center justify-center px-4 lg:px-0"
    >
      {/* form */}
      <form
        className="max-w-[450px] w-full bg-black/20 h-16 rounded-full 
      backdrop-blur-[32px] mb-8"
      >
        <div
          className="relative h-full flex items-center justify-between
        p-2 "
        >
          <input
            className="flex-1 bg-transparent outline-none text-white
            placeholder:text-white text-[15px] font-light p-6 h-full"
            type="text"
            placeholder="Search by city or country"
            onChange={textChangeHandler}
          />
          <button
            className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full 
          flex justify-center items-center transition"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/* card */}
      <div
        className="w-full max-w-[450px] bg-black/20 min-h-[500px] text-white 
      rounded-[32px] py-12 px-6"
      >
        <div>
          {/* card top */}
          <div className="flex items-center gap-x-5">
            <div className="text-[80px]">{icon}</div>
            <div>
              <div className="text-2xl font-semibold">
                {data.name},{data.sys.country}
              </div>
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>

          {/* card body */}
          <div className="my-20">
            <div className="flex justify-center items-center">
              <div className="text-[100px] font-light leading-none">
                {data.main.temp.toFixed(0)}
              </div>
              <div className="text-4xl">
                <TbTemperatureCelsius />
              </div>
            </div>
            <div className="capitalize text-center">
              {data.weather[0].description}
            </div>
          </div>

          {/* card bottom */}
          <div className="max-w-[400px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsEye />
                </div>
                <div>
                  Visibility
                  <span className="ml-2">{data.visibility / 1000} km</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsThermometer />
                </div>
                <div className="flex">
                  Feels Like
                  <span className="flex ml-2">
                    {data.main.feels_like.toFixed(0)}
                    <TbTemperatureCelsius />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsWater />
                </div>
                <div>
                  Humidity
                  <span className="ml-2">{data.main.humidity} %</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsWind />
                </div>
                <div>
                  Wind <span className="ml-2">{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
