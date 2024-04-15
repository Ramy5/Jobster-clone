"use client"

import Wrapper from "@/assets/wrappers/JobInfo";
import React from "react";

interface JobInfo_TP {
  icon: JSX.Element;
  text: string;
}

const JobInfo: React.FC<JobInfo_TP> = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
