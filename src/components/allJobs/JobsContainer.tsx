"use client";

import Wrapper from "@/assets/wrappers/JobsContainer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import { Loading } from "..";

const JobsContainer = () => {
  const { isLoading, jobs } = useSelector((store: any) => store.allJobs);
  const dispatch = useDispatch();

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>jobs info</h5>

      <div className="jobs">
        {jobs?.map((job: any) => {
          console.log("🚀 ~ {jobs?.map ~ job:", job);
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
