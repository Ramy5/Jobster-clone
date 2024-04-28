"use client";

import Wrapper from "@/assets/wrappers/PageBtnContainer";
import { changePage } from "@/features/allJobs/allJobsSlice";
import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

const PaginationBtnContainer = () => {
  const { page, numOfPages } = useSelector((store: any) => store.allJobs);
  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const handlePrevPage = () => {
    let newPage: number = page - 1;
    if (newPage < 1) newPage = numOfPages;
    dispatch(changePage(newPage));
  };

  const handleNextPage = () => {
    let newPage: number = page + 1;
    if (newPage > numOfPages) newPage = 1;
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={handlePrevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={page === pageNumber ? "active pageBtn" : "pageBtn"}
              key={pageNumber}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button type="button" className="next-btn" onClick={handleNextPage}>
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};

export default PaginationBtnContainer;
