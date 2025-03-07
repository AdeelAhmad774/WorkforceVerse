import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export const ApexChart = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Present",
        data: [0, 2, 4, 8, 10, 10, 12],
        color: "#6610f2",
      },
      {
        name: "Absent",
        data: [0, 1, 3, 5, 7, 9, 10],
        color: "rgb(93, 197, 112)",
      },
      {
        name: "Leave",
        data: [2, 8, 8, 6, 6, 4, 4],
        color: "rgb(64, 100, 71)",
      },
    ],
    options: {
      chart: {
        height: 400,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false, // Disable the menu (three dots)
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 3,
      },

      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        title: {
          text: "Days",
        },
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yaxis: {
        title: {
          text: "Counts",
        },
      },
    },
  });

  return (
    <div>
      <div style={{ margin: "0% 0% 0% 2% ", paddingTop: "20px" }}>
        <h5>Weekly Stats </h5>
      </div>
      <div
        style={{
          margin: "0", // Removes any margin around the chart
          padding: "0", // Removes padding inside the chart container
        }}
      >
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={500}
          width="100%"
        />
      </div>
    </div>
  );
};
