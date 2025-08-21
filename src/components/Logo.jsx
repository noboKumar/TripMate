import React from "react";
import Icon from "../assets/take-off_5219511.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img className="w-8 h-8" src={Icon} alt="icon" />
      <h1 className="font-bold text-2xl">
        <span className="text-sky-600">Trip</span>
        <span className="text-amber-600">Mate</span>
      </h1>
    </div>
  );
};

export default Logo;
