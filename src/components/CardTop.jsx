import React from "react";

//import setIcon
import setIcon from "../icons";

//date object
const date = new Date();

const CardTop = ({ data }) => {
  //Set icon according to weather type
  const icon = setIcon(data.weather[0].main);
  return (
    <div className="flex items-center gap-x-5">
      <div className="text-[80px]">{icon}</div>
      <div>
        <div className="text-2xl font-semibold">
          {data.name},{data.sys.country}
        </div>
        <div>
          {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
        </div>
      </div>
    </div>
  );
};

export default CardTop;
