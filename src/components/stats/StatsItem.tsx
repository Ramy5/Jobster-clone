import Wrapper from "@/assets/wrappers/StatItem";
import React from "react";
import { defaultStats_TP } from "./StatsContainer";

const StatsItem = ({ title, count, color, bcg, icon }: defaultStats_TP) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>

      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};

export default StatsItem;
