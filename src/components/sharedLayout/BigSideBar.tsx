"use client";

import React from "react";
import Wrapper from "@/assets/wrappers/BigSidebar";
import { useSelector } from "react-redux";
import { Logo } from "..";
import NavLinks from "../UI/NavLinks";
import Link from "next/link";

const BigSideBar = () => {
  const { isSidebarOpen } = useSelector((store: any) => store.user);

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Link href={"/"}>
              <Logo />
            </Link>
          </header>

          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
