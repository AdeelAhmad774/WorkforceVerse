import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export const LeaveChart = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Inflation",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6],
        color: "rgb(170, 137, 137)",
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
          columnWidth: "40%",
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
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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
    },
  });

  return (
    <div>
      <div style={{ margin: "0 2% 2%", paddingTop: "20px" }}>
        <h5>Leave Stats</h5>
      </div>
      <div style={{ textAlign: "center" }}>
        {/* ApexCharts Component */}

        <div style={{ marginLeft: "10%" }} id="chart">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={450}
            width="86%"
          />
        </div>

        {/* Custom Title Section below the chart */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "18px",
              height: "18px",
              backgroundColor: "rgb(170, 137, 137)",
              marginTop: "4px",
              borderRadius: "10px",
            }}
          ></span>
          <h6>Remaining Leaves</h6>
          <span
            style={{
              display: "inline-block",
              width: "18px",
              height: "18px",
              backgroundColor: "rgb(142, 218, 192)", // Color for Remaining Leaves (red)
              marginTop: "4px",
              borderRadius: "10px",
            }}
          ></span>
          <h6>Taken Leaves</h6>
        </div>
      </div>
    </div>
  );
};
