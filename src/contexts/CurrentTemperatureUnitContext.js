import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "", // Changed to camelCase
  handleToggleSwitchChange: () => {},
});

export { CurrentTemperatureUnitContext };
