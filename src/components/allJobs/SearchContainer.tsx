"use client";

import Wrapper from "@/assets/wrappers/SearchContainer";
import React from "react";
import BaseInput from "../UI/BaseInput";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { clearValues, handleChange } from "@/features/job/jobSlice";

const SearchContainer = () => {
  const dispatch = useDispatch();
  const { sortOption, sort, searchType, searchStatus, search } = useSelector(
    (store: any) => store.allJobs
  );
  const { statusOptions, jobTypeOptions } = useSelector(
    (store: any) => store.job
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target ? e.target.name : e.name;
    const value = e.target ? e.target.value : e.value;

    dispatch(handleChange({ name, value }));
  };

  const handleClearValues = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearValues());
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleClearValues}>
        <h4>search form</h4>

        <div className="form-center">
          {/* SEARCH BY WORD */}
          <BaseInput
            name="search"
            value={search}
            onChange={handleSearchChange}
          />

          {/* SEARCH BY STATUS */}
          <div>
            <label className="form-label" htmlFor="status">
              status
            </label>

            <Select
              defaultValue={searchStatus}
              isClearable={true}
              isSearchable={true}
              name="status"
              id="status"
              options={[
                { value: "all", label: "all", name: "status" },
                ,
                ...statusOptions,
              ]}
              onChange={handleSearchChange}
            />
          </div>

          {/* SEARCH BY TYPE */}
          <div>
            <label className="form-label" htmlFor="jobType">
              type
            </label>

            <Select
              defaultValue={searchType}
              isClearable={true}
              isSearchable={true}
              name="jobType"
              id="jobType"
              options={[
                { value: "all", label: "all", name: "jobType" },
                ...jobTypeOptions,
              ]}
              onChange={handleSearchChange}
            />
          </div>

          {/* SEARCH BY SORT */}
          <div>
            <label className="form-label" htmlFor="sort">
              sort
            </label>

            <Select
              defaultValue={sort}
              isClearable={true}
              isSearchable={true}
              name="sort"
              id="sort"
              options={sortOption}
              onChange={handleSearchChange}
            />
          </div>

          <button className="btn btn-block btn-danger">clear filters</button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
