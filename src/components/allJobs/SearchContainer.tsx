"use client";

import Wrapper from "@/assets/wrappers/SearchContainer";
import React from "react";
import BaseInput from "../UI/BaseInput";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { clearFilters, handleChange } from "@/features/allJobs/allJobsSlice";

const SearchContainer = () => {
  const dispatch = useDispatch();
  const { sortOption, sort, searchType, searchStatus, search } = useSelector(
    (store: any) => store.allJobs
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e?.target ? e?.target?.name : e?.name;
    const value = e?.target ? e?.target?.value : e?.value;

    dispatch(handleChange({ name, value }));
  };

  const handleClearValues = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearFilters());
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
            <label className="form-label" htmlFor="searchStatus">
              status
            </label>

            <Select
              isClearable={true}
              isSearchable={true}
              name="searchStatus"
              id="searchStatus"
              defaultValue={searchStatus}
              options={[
                { value: "all", label: "all", name: "searchStatus" },
                { value: "pending", label: "pending", name: "searchStatus" },
                { value: "declined", label: "declined", name: "searchStatus" },
                {
                  value: "interview",
                  label: "interview",
                  name: "searchStatus",
                },
              ]}
              onChange={handleSearchChange}
            />
          </div>

          {/* SEARCH BY TYPE */}
          <div>
            <label className="form-label" htmlFor="searchType">
              type
            </label>

            <Select
              defaultValue={searchType}
              isClearable={true}
              isSearchable={true}
              name="searchType"
              id="searchType"
              options={[
                { value: "all", label: "all", name: "searchType" },
                { value: "remote", label: "remote", name: "searchType" },
                { value: "full-time", label: "full-time", name: "searchType" },
                { value: "part-time", label: "part-time", name: "searchType" },
                {
                  value: "internship",
                  label: "internship",
                  name: "searchType",
                },
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

          <button type="submit" className="btn btn-block btn-danger">
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
