import { useEffect, useState } from "react";
import SearchBar from "./component/SearchBar";
import TopGrid from "./component/TopGrid";
import LeftBottomGrid from "./component/LeftBottomGrid";
import RightBottomGrid from "./component/RightBottomGrid";

function App() {
  const api = "https://wttr.in";
  const [result, setResult] = useState({
    data: null,
    loading: false,
  });

  const handleSubmit = (value) => {
    if (value) setResult(value);
  };

  const ConvertDateToDay = (date) => {
    const week = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return week[new Date(date).getDay()];
  };

  const ConvertTimeToHours = (time) => {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  return (
    <>
      <SearchBar api={api} onEvent={handleSubmit} />
      {result.loading && (
        <div className="loading">
          <div className="circle">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="dot"></div>
            ))}
          </div>
        </div>
      )}
      <section>
        <TopGrid data={result.data} ConvertDateToDay={ConvertDateToDay} />
        <div className="bottomGrid">
          <div className="weather-details">
            <h2>Weather details</h2>
            <LeftBottomGrid data={result.data} />
          </div>
          <div className="weather-forecast">
            <h2>3-day weather forecast</h2>
            <RightBottomGrid
              data={result.data}
              ConvertDateToDay={ConvertDateToDay}
              ConvertTimeToHours={ConvertTimeToHours}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
