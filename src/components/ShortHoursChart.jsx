import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export const ShortHours = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Inflation",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8],
        color: "rgb(241, 4, 4)",
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false, // Disable the menu (three dots)
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
          columnWidth: "60%",
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          },
        },
      },
      title: {
        text: "Short Hours",
        floating: true,
        offsetY: 430,

        align: "center",
        style: {
          color: "#444",
        },
      },
    },
  });

  return (
    <div>
      <div style={{ margin: "0 2% 2%", paddingTop: "20px" }}>
        <h5> Short Hours </h5>
      </div>
      <div style={{ marginLeft: "12%" }} id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={450}
          width="85%"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};
