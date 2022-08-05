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
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const textChangeHandler = (e) => {
    setInputValue(e.target.value);
  };
  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log(inputValue);
    //if input value is not empty:
    if (inputValue !== "") {
      setLocation(inputValue);
      setErrorMsg("");
    }
    //if input value empty:
    if (inputValue === "") {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    setInputValue("");
  };

  //fetch Data
  //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  useEffect(() => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios
      .get(url)
      .then((response) => {
        setTimeout(() => {
          setData(response.data);
          setLoading(false);
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMsg(error);
      });
  }, [location]);

  //error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return clearTimeout(timer);
  }, []);

  //If data is not exist show spinner
  if (!data) {
    return (
      <div
        className="w-full h-screen bg-gradient-to-r from-indigo-600 to-blue-200
      flex flex-col items-center justify-center"
      >
        <div>
          <ImSpinner8 className="text-5xl animate-spin text-white" />
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
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
    default:
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
  }
  //date object
  const date = new Date();
  return (
    <div
      className="relative w-full h-screen bg-gradient-to-r from-indigo-600 to-blue-200 
    flex flex-col items-center justify-center px-4 lg:px-0"
    >
      {errorMsg && (
        <div
          className="w-full max-w-[90vw] lg:max-w-[450px]
        bg-[#ff208c] text-white absolute top-2 lg:top-12
        p-2 capitalize rounded-md"
        >{`${errorMsg.response.data.message}`}</div>
      )}
      {/* form */}
      <form
        onSubmit={submitFormHandler}
        className="max-w-[450px] w-full bg-black/20 h-12 rounded-full 
      backdrop-blur-[32px] mb-8"
      >
        <div
          className="relative h-full flex items-center justify-between
        p-2 "
        >
          <input
            className={`${
              animate ? "animate-shake" : "animate - none"
            } flex-1 bg-transparent outline-none text-white
            placeholder:text-white text-[15px] font-light p-6 h-full`}
            type="text"
            placeholder="Search by city or country"
            onChange={textChangeHandler}
            value={inputValue}
          />
          <button
            className="bg-[#1ab8ed] hover:bg-[#15abdd] w-12 h-8 rounded-full 
          flex justify-center items-center transition"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/* card */}

      <div
        className="w-full max-w-[450px] bg-black/20 h-auto text-white 
      rounded-[32px] py-12 px-12"
      >
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
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
            <div className="mt-5 mb-8 ">
              <div className="flex justify-center items-center">
                <div className="text-5xl font-semibold text-white ">
                  {data.main.temp.toFixed(0)}
                </div>
                <div className="text-2xl">
                  <TbTemperatureCelsius />
                </div>
                <div className="capitalize text-center ml-4 text-slate-300">
                  {data.weather[0].description}
                </div>
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
        )}
      </div>
    </div>
  );
};

export default App;
