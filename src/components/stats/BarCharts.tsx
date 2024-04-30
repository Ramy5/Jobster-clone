"use client";

import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

const BarChartsComponent = ({ data }: any) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartConfig = {
      type: "bar",
      data: {
        labels: data.map((row: any) => row.date),
        datasets: [
          {
            label: "Jobs created by year",
            data: data.map((row: any) => row.count),
          },
        ],
      },
    };

    if (chartRef.current) {
      chartRef.current.destroy();
    }

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

export default BarChartsComponent;
