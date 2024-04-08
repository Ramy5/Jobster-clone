"use client";

import Wrapper from "@/assets/wrappers/Job";
import React from "react";

interface JobProps_TP {
  company: string;
  createdAt: string;
  jobLocation: string;
  jobType: string;
  position: string;
  status: string;
  _id: string;
}

const Job: React.FC<JobProps_TP> = (props) => {
  const { company, createdAt, jobLocation, jobType, position, status, _id } =
    props;

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>

        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
    </Wrapper>
  );
};

export default Job;
