import React from "react";
import { TbTemperatureCelsius } from "react-icons/tb";
const CardBody = ({ data }) => {
  return (
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
  );
};

export default CardBody;
