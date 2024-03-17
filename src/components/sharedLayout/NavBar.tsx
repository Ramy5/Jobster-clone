"use client";

import React, { useState } from "react";
import Wrapper from "@/assets/wrappers/Navbar";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { Logo } from "..";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, toggleSidebar } from "@/features/useSlice";
import Link from "next/link";

const NavBar = () => {
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const { user } = useSelector((store: any) => store.user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>

        <Link href={"/"}>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </Link>

        <div className="btn-container">
          <button
            onClick={() => setShowLogout((prev) => !prev)}
            type="button"
            className="btn"
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={`dropdown ${showLogout ? "show-dropdown" : ""}`}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(logoutUser())}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;
