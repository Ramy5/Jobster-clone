"use client";

import Wrapper from "@/assets/wrappers/JobsContainer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import { Loading } from "..";
import { getAllJobs } from "@/features/allJobs/allJobsSlice";

const JobsContainer = () => {
  const { isLoading, jobs } = useSelector((store: any) => store.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

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
      <h5>{jobs.length} jobs found</h5>

      <div className="jobs">
        {jobs?.map((job: any) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
