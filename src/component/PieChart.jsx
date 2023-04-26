import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";

function PieChart(props) {
  const { chartData } = props;

  return (
    <div>
      <div style={{ height: "100%" }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
}

export default PieChart;
