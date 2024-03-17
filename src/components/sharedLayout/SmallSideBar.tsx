"use client";

import React from "react";
import Wrapper from "@/assets/wrappers/SmallSidebar";
import { Logo } from "..";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/features/useSlice";
import NavLinks from "../UI/NavLinks";

const SmallSideBar = () => {
  const { isSidebarOpen } = useSelector((store: any) => store.user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container"
            : "sidebar-container  show-sidebar"
        }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <Link href={"/"}>
              <Logo />
            </Link>
          </header>

          <NavLinks toggleSidebar={() => dispatch(toggleSidebar())} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
