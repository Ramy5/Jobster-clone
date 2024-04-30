"use client";

import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

const AreaChartComponent = ({ data }: any) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartConfig = {
      type: "line",
      data: {
        labels: data.map((row: any) => row.date),
        datasets: [
          {
            label: "Jobs created by year",
            data: data.map((row: any) => row.count),
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
    };

    if (chartRef.current) chartRef.current.destroy();

    const ctx = document.getElementById("acquisitions").getContext("2d");
    chartRef.current = new Chart(ctx, chartConfig);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <canvas id="acquisitions"></canvas>
    </div>
  );
};

export default AreaChartComponent;
