"use client";

import Wrapper from "@/assets/wrappers/ChartsContainer";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import BarChartsComponent from "./BarCharts";
import AreaChartComponent from "./AreaChart";

const ChartsContainer = () => {
  const [isBarChart, setIsBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector(
    (store: any) => store.allJobs
  );

  return (
    <Wrapper>
      <h4>monthly applications</h4>
      <button onClick={() => setIsBarChart((prev) => !prev)}>
        {isBarChart ? "area chart" : "bar chart"}
      </button>

      {isBarChart ? (
        <BarChartsComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
