import React, { useState, useEffect } from "react";
//import components
import SearchForm from "./components/SearchForm";
import CardTop from "./components/CardTop";
import CardBody from "./components/CardBody";
import CardBottom from "./components/CardBottom";

//import axios
import axios from "axios";

//import icons
import { ImSpinner8 } from "react-icons/im";

//API key
const APIkey = "164190171d18ca25d91eb11ecbfea162";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Datça");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
        }, 1000);
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

  return (
    <div
      className="relative w-full h-screen bg-gradient-to-r from-indigo-600 to-blue-200 
    flex flex-col items-center justify-center px-4 lg:px-0"
    >
      {errorMsg && (
        <div
          className="w-full max-w-[90vw] md:max-w-[450px]
        bg-[#ff208c] text-white absolute top-10 lg:top-12
        p-2 capitalize rounded-md"
        >{`${errorMsg.response.data.message}`}</div>
      )}

      <SearchForm onSetLocation={setLocation} onSetErrorMsg={setErrorMsg} />

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
            <CardTop data={data} />
            <CardBody data={data} />
            <CardBottom data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
