export const weatherOptions = [
  // Day
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day/fog.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/snow.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "storm",
    url: new URL("../assets/day/storm.png", import.meta.url).href,
  },

  // Night
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear_night.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/cloudy_night.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night/fog_night.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/rain_night.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/snow_night.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "storm",
    url: new URL("../assets/night/storm_night.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/blank.png", import.meta.url).href,
    day: true,
    condition: "default",
  },
  night: {
    url: new URL("../assets/night/blank_night.png", import.meta.url).href,
    day: false,
    condition: "default",
  },
};

export const coordinates = {
  latitude: 40.743992,
  longitude: -74.032364,
};

export const apiKey = "e593f3b96320e27c4566ab99df51b7c3";
