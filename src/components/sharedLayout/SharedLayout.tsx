"use client";

import React, { ReactNode } from "react";
import Wrapper from "@/assets/wrappers/SharedLayout";
import SmallSideBar from "./SmallSideBar";
import BigSideBar from "./BigSideBar";
import NavBar from "./NavBar";

interface sharedLayout_TP {
  children?: ReactNode;
}

const SharedLayout: React.FC<sharedLayout_TP> = ({ children }) => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSideBar />
        <BigSideBar />
        <div>
          <NavBar />
          <div className="dashboard-page">{children}</div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
