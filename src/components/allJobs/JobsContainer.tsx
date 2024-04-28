"use client";

import Wrapper from "@/assets/wrappers/JobsContainer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import { Loading } from "..";
import { getAllJobs } from "@/features/allJobs/allJobsSlice";
import PaginationBtnContainer from "./PaginationBtnContainer";

const JobsContainer = () => {
  const {
    isLoading,
    jobs,
    page,
    numOfPages,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store: any) => store.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [page, search, searchStatus, searchType, sort]);

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
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>

      <div className="jobs">
        {jobs?.map((job: any) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>

      {numOfPages > 1 && <PaginationBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
