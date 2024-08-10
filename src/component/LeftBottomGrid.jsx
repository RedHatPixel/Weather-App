import { useEffect, useState } from "react";

const LeftBottomGrid = ({ data }) => {
  const [condition, setCondition] = useState({
    FeelsLikeC: 0,
    windDir: "N",
    windMiles: 0,
    humidity: 0,
    uv: 0,
    visibility: 0,
    pressure: 0,
  });

  const [card, setCard] = useState([]);
  useEffect(() => {
    if (data) {
      const newCondition = {
        FeelsLikeC: data.current_condition[0].FeelsLikeC,
        windDir: data.current_condition[0].winddir16Point,
        windMiles: data.current_condition[0].windspeedMiles,
        humidity: data.current_condition[0].humidity,
        uv: data.current_condition[0].uvIndex,
        visibility: data.current_condition[0].visibilityMiles,
        pressure: data.current_condition[0].pressure,
      };

      setCondition(newCondition);

      const newCard = [
        {
          text: "Feels like",
          value: `${newCondition.FeelsLikeC}°`,
        },
        {
          text: `${newCondition.windDir} wind`,
          value: `${newCondition.windMiles} mi/h`,
        },
        {
          text: "Humidity",
          value: `${newCondition.humidity}%`,
        },
        {
          text: "UV",
          value: newCondition.uv,
        },
        {
          text: "Visibility",
          value: `${newCondition.visibility} mi`,
        },
        {
          text: "Pressure",
          value: `${newCondition.pressure} hPa`,
        },
      ];

      setCard(newCard);
    }
  }, [data]);

  return (
    <div className="details-container">
      {card.map(({ text, value }, index) => {
        return (
          <div key={index} className="card">
            <p className="title">{text}</p>
            <p>{value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default LeftBottomGrid;
