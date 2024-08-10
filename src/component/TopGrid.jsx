import { useEffect, useState } from "react";

const TopGrid = ({ data, ConvertDateToDay, SearchName }) => {
  const [condition, setCondition] = useState({
    area: "city",
    country: "Country",
    mintempC: 0,
    maxtempC: 0,
    description: "normal",
    date: "0000-00-00 00-00 AM",
    day: "Sunday",
  });

  useEffect(() => {
    if (data) {
      if (SearchName) {
        setCondition({
          area: "Babuyan Island",
          country: data.nearest_area[0].country[0].value,
          mintempC: data.weather[0].mintempC,
          maxtempC: data.weather[0].maxtempC,
          description: data.current_condition[0].weatherDesc[0].value,
          date: data.current_condition[0].localObsDateTime,
          day: ConvertDateToDay(data.weather[0].date),
        });
      } else {
        setCondition({
          area: data.nearest_area[0].areaName[0].value,
          country: data.nearest_area[0].country[0].value,
          mintempC: data.weather[0].mintempC,
          maxtempC: data.weather[0].maxtempC,
          description: data.current_condition[0].weatherDesc[0].value,
          date: data.current_condition[0].localObsDateTime,
          day: ConvertDateToDay(data.weather[0].date),
        });
      }
    }
  }, [data]);

  return (
    <div className="top-grid-layout">
      <h1 className="country">
        {condition.area}, {condition.country}
      </h1>
      <div className="condition">
        <div className="left">
          <span>
            <h1 className="temp">{condition.mintempC}&deg;</h1>
            <p className="desc">{condition.description}</p>
          </span>
        </div>
        <div className="right">
          <p className="degree-C">
            {condition.day}
            <span className="real">{condition.mintempC}&deg;</span>
            <span className="feels">{condition.maxtempC}&deg;</span>
          </p>
          <p className="date-and-time">{condition.date}</p>
        </div>
      </div>
    </div>
  );
};

export default TopGrid;
