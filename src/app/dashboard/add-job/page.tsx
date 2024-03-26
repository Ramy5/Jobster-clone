"use client";

import React from "react";
import Wrapper from "@/assets/wrappers/DashboardFormPage";
import { BaseInput } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearValues, handleChange } from "@/features/job/jobSlice";
import Select from "react-select";

const page = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store: any) => store.job);
  const dispatch = useDispatch();

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("🚀 ~ handleChanges ~ name:", e);
    const name = e.target ? e.target.name : e.label;
    console.log("🚀 ~ handleChanges ~ name:", name);
    const value = e.target ? e.target.value : e.value;
    console.log("🚀 ~ handleChanges ~ value:", value);

    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error("please fill out all values!");
      return;
    }

    console.log(
      isLoading,
      position,
      company,
      jobLocation,
      jobTypeOptions,
      jobType,
      statusOptions,
      status,
      isEditing,
      editJobId
    );
  };

  return (
    <Wrapper>
      <form action="" className="form" onSubmit={handleSubmit}>
        <div className="form-center">
          <BaseInput
            name="position"
            value={position}
            onChange={handleChanges}
          />
          <BaseInput name="company" value={company} onChange={handleChanges} />
          <BaseInput
            name="jobLocation"
            labelText="job location"
            value={jobLocation}
            onChange={handleChanges}
          />
          <div>
            <label className="form-label" htmlFor="jobType">
              jobType
            </label>

            <Select
              defaultValue={jobType}
              isClearable={true}
              isSearchable={true}
              name="jobType"
              id="jobType"
              options={jobTypeOptions}
              onChange={handleChanges}
            />
          </div>

          <div>
            <label className="form-label" htmlFor="status">
              status
            </label>

            <Select
              defaultValue={status}
              isClearable={true}
              isSearchable={true}
              name="status"
              id="status"
              options={statusOptions}
              onChange={handleChanges}
            />
          </div>

          <div className="btn-container">
            <button
              className="btn btn-block clear-btn"
              type="button"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              className="btn btn-block submit-btn"
              type="submit"
              disabled={isLoading}
            >
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default page;
