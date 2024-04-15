"use client";

import Wrapper from "@/assets/wrappers/Job";
import Link from "next/link";
import React from "react";
import JobInfo from "./JobInfo";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteJob, setEditJob } from "@/features/job/jobSlice";

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
  const dispatch = useDispatch();
  const { company, createdAt, jobLocation, jobType, position, status, _id } =
    props;

  const date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>

        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>

        <footer>
          <div className="actions">
            <Link href={"/dashboard/add-job"}>
              <button
                className="btn edit-btn"
                onClick={() =>
                  dispatch(
                    setEditJob({
                      editJobId: _id,
                      company,
                      jobLocation,
                      status,
                      jobType,
                      position,
                    })
                  )
                }
              >
                edit
              </button>
            </Link>

            <button
              className="btn delete-btn"
              onClick={() => dispatch(deleteJob(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
