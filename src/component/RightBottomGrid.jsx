import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(...registerables);
Chart.register(ChartDataLabels);

const RightBottomGrid = ({ data, ConvertDateToDay, ConvertTimeToHours }) => {
  // Chart data
  const [chartData, setchartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Highest Temp",
        data: [],
        borderColor: "#FF6666",
        backgroundColor: "#FF6666",
        pointBackgroundColor: "#FF6666",
        pointHoverBorderColor: "#FF6666",
        borderWidth: 4,
      },
      {
        label: "Lowest Temp",
        data: [],
        borderColor: "#66B2FF",
        backgroundColor: "#66B2FF",
        pointBackgroundColor: "#66B2FF",
        pointHoverBorderColor: "#66B2FF",
        borderWidth: 4,
      },
    ],
  });

  // Chart options
  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      datalabels: {
        align: "start",
        backgroundColor: "transparent",
        color: "#fff",
        formatter: function (value, _context) {
          return value + "°C";
        },
      },
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",
          font: {
            weight: "light",
            size: 16,
          },
        },
        position: "top",

        grid: { display: false },
        border: { display: false },
        display: true,
      },
      y: {
        display: false,
      },
    },
  });

  // today data
  const [times, setTime] = useState(null);

  useEffect(() => {
    if (data) {
      const label = data.weather.map((list) => {
        return {
          maxTemp: list.maxtempC,
          minTemp: list.mintempC,
          date: ConvertDateToDay(list.date),
        };
      });

      const arrTime = data.weather[0].hourly.map((list) => {
        return {
          time: ConvertTimeToHours(list.time),
          temp: list.tempC,
          desc: list.weatherDesc[0].value,
        };
      });
      setTime(arrTime);

      const highestlabel = label.reduce((max, list) => {
        return list.maxTemp > max ? list.maxTemp : max;
      }, label[0].maxTemp);
      const lowestLabel = label.reduce((max, list) => {
        return list.minTemp < max ? list.minTemp : max;
      }, label[0].minTemp);

      setchartData({
        labels: ["Today", label[1].date, label[2].date],
        datasets: [
          {
            label: "Highest Temp",
            data: [label[0].maxTemp, label[1].maxTemp, label[2].maxTemp],
            borderColor: "#FF6666",
            backgroundColor: "#FF6666",
            pointBackgroundColor: "#FF6666",
            pointHoverBorderColor: "#FF6666",
            borderWidth: 4,
          },
          {
            label: "Lowest Temp",
            data: [label[0].minTemp, label[1].minTemp, label[2].minTemp],
            borderColor: "#66B2FF",
            backgroundColor: "#66B2FF",
            pointBackgroundColor: "#66B2FF",
            pointHoverBorderColor: "#66B2FF",
            borderWidth: 4,
          },
        ],
      });

      setOptions({
        responsive: true,
        plugins: {
          datalabels: {
            align: "start",
            backgroundColor: "transparent",
            color: "#fff",
            formatter: function (value, _context) {
              return value + "°C";
            },
          },
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: {
            ticks: {
              color: "#fff",
              font: {
                weight: "light",
                size: 16,
              },
            },
            position: "top",

            grid: { display: false },
            border: { display: false },
            display: true,
          },
          y: {
            min: parseInt(lowestLabel) - 5,
            max: parseInt(highestlabel) + 5,
            display: false,
          },
        },
      });
    }
  }, [data]);

  return (
    <div className="forecast-container">
      <Line data={chartData} options={options} className="canvas" />
      <div className="today-forecast">
        {times &&
          times.map(({ time, temp, desc }, index) => {
            return (
              <div key={index} className="card">
                <p className="title">{time}</p>
                <p>{temp}°C</p>
                <p>{desc}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RightBottomGrid;
