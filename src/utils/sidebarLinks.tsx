import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";

interface SidebarLinks_TP {
  id: number;
  text: string;
  icon: JSX.Element;
  path: string;
}

const sidebarLinks: SidebarLinks_TP[] = [
  { id: 1, text: "stats", icon: <IoBarChartSharp />, path: "/dashboard" },
  {
    id: 2,
    text: "all jobs",
    icon: <MdQueryStats />,
    path: "/dashboard/all-jobs",
  },
  { id: 3, text: "add job", icon: <FaWpforms />, path: "/dashboard/add-job" },
  { id: 4, text: "profile", icon: <ImProfile />, path: "/dashboard/profile" },
];

export default sidebarLinks;
