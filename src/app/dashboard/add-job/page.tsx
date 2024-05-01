// Import React and other required libraries
import React, { useEffect } from "react";
import Wrapper from "@/assets/wrappers/DashboardFormPage";
import { BaseInput } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearValues,
  createJob,
  editJob,
  handleChange,
} from "@/features/job/jobSlice";
import Select from "react-select";

interface RootState {
  job: {
    isLoading: boolean;
    position: string;
    company: string;
    jobLocation: string;
    jobTypeOptions: any[];
    jobType: any;
    statusOptions: any[];
    status: any;
    isEditing: boolean;
    editJobId: string;
  };
  user: {
    location: string;
  };
}

// Define the type for the props (if any) passed to your component
interface PageProps {}

// Define the Page component
const page: React.FC<PageProps> = () => {
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
  } = useSelector((store: RootState) => store.job);
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.user);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all values!");
      return;
    }

    const jobData = {
      position,
      company,
      jobLocation,
      jobType,
      status,
    };

    if (isEditing) {
      dispatch(editJob({ jobId: editJobId, job: jobData }));
      return;
    }

    dispatch(createJob(jobData));
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(handleChange({ name: "jobLocation", value: user.location }));
    }
  }, []);

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-center">
          <BaseInput
            name="position"
            value={position}
            onChange={handleChanges}
          />
          <BaseInput name="company" value={company} onChange={handleChanges} />
          <BaseInput
            name="jobLocation"
            labelText="Job Location"
            value={jobLocation}
            onChange={handleChanges}
          />
          <div>
            <label className="form-label" htmlFor="jobType">
              Job Type
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
              Status
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
              Clear
            </button>
            <button
              className="btn btn-block submit-btn"
              type="submit"
              disabled={isLoading}
            >
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default page;
