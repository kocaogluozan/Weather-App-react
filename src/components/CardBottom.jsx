import React from "react";

import { BsEye, BsWater, BsThermometer, BsWind } from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";

const CardBottom = ({ data }) => {
  return (
    <div className="max-w-[400px] mx-auto flex flex-col gap-y-6">
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row items-center gap-x-2">
          <div className="text-[30px]">
            <BsEye />
          </div>
          <div>
            Visibility
            <span className="ml-2 ">{data.visibility / 1000} km</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-x-2">
          <div className="text-[30px]">
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
        <div className="flex flex-col md:flex-row items-center gap-x-2">
          <div className="text-[30px]">
            <BsWater />
          </div>
          <div>
            Humidity
            <span className="ml-2">{data.main.humidity} %</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-x-2">
          <div className="text-[30px]">
            <BsWind />
          </div>
          <div>
            Wind <span className="ml-2">{data.wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBottom;
