import React from "react";
import Wrapper from "@/assets/wrappers/SmallSidebar";
import { Logo } from "..";
import sidebarLinks from "@/utils/sidebarLinks";
import Link from "next/link";

const SmallSideBar = () => {
  return (
    <Wrapper>
      <div className="sidebar-container show-sidebar">
        <div className="content">
          <button type="button" className="close-btn">
            X
          </button>
          <header>
            <Logo />
          </header>

          <div className="nav-links">
            {sidebarLinks.map((li) => {
              const { id, icon, text, link } = li;

              return (
                <Link className="nav-link" href={link} key={id}>
                  {icon} {text}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
