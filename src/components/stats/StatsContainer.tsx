"use client";

import Wrapper from "@/assets/wrappers/StatsContainer";
import React from "react";
import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import { useSelector } from "react-redux";
import StatsItem from "./StatsItem";

export interface defaultStats_TP {
  title: string;
  count: number;
  icon: JSX.Element;
  color: string;
  bcg: string;
}

const StatsContainer = () => {
  const { stats } = useSelector((state: any) => state.allJobs);

  const defaultStats: defaultStats_TP[] = [
    {
      title: "pending applications",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((stat: defaultStats_TP, index: number) => {
        return <StatsItem key={index} {...stat} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
