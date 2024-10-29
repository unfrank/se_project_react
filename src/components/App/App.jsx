import { useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  // const [count, setCount] = useState(0);

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
