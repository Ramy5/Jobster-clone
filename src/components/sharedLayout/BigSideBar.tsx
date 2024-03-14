import React from "react";
import Wrapper from "@/assets/wrappers/BigSidebar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/features/useSlice";
import { FaTimes } from "react-icons/fa";
import { Logo } from "..";
import NavLinks from "../UI/NavLinks";
import Link from "next/link";

const BigSideBar = () => {
  const { isSidebarOpen } = useSelector((store: any) => store.user);
  const dispatch = useDispatch();

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
