import React, { useContext, useState } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider--F"
            : "switch__slider switch__slider--C"
        }
      ></span>
      <p
        className={`switch__temp--C ${
          currentTemperatureUnit === "C" && "switch__temp--active"
        }`}
      >
        C
      </p>
      <p
        className={`switch__temp--F ${
          currentTemperatureUnit === "F" && "switch__temp--active"
        }`}
      >
        F
      </p>
    </label>
  );
};

export default ToggleSwitch;
