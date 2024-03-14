import { toggleSidebar } from "@/features/useSlice";
import sidebarLinks from "@/utils/sidebarLinks";
import Link from "next/link";
import React from "react";

interface NavLinks_TP {
  toggleSidebar?: () => void;
}

const NavLinks: React.FC<NavLinks_TP> = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {sidebarLinks.map((link) => {
        const { id, icon, text, path } = link;

        return (
          <Link
            onClick={toggleSidebar}
            className="nav-link"
            href={path}
            key={id}
          >
            <span className="icon">{icon}</span> {text}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
