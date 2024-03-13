import { ReactHTML } from "react";
import { FaAlignLeft } from "react-icons/fa";

interface SidebarLinks_TP {
  id: number;
  text: string;
  icon: JSX.Element;
  link: string;
}

const sidebarLinks: SidebarLinks_TP[] = [
  { id: 1, text: "stats", icon: <FaAlignLeft />, link: "/" },
  { id: 2, text: "all jobs", icon: <FaAlignLeft />, link: "/all-jobs" },
  { id: 3, text: "add job", icon: <FaAlignLeft />, link: "/add-job" },
  { id: 4, text: "profile", icon: <FaAlignLeft />, link: "/profile" },
];

export default sidebarLinks;
