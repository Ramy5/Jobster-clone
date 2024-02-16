import React from "react";
import "./loading.css";
import Image from "next/image";
import LoadingImg from "../assets/images/loading.svg";

const loading = () => {
  return <Image src={LoadingImg} alt="loading" width={500} height={500} />;
};

export default loading;
