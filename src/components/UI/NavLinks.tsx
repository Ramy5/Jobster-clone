import sidebarLinks from "@/utils/sidebarLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinks_TP {
  toggleSidebar?: () => void;
}

const NavLinks: React.FC<NavLinks_TP> = ({ toggleSidebar }) => {
  const pathName = usePathname();

  return (
    <div className="nav-links">
      {sidebarLinks.map((link) => {
        const { id, icon, text, path } = link;

        return (
          <Link
            onClick={toggleSidebar}
            className={`nav-link ${pathName === path ? "active" : ""} `}
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
