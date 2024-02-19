import Image from "next/image";
import React from "react";
import LogoImg from "../../assets/images/logo.svg";

const Logo = () => {
  return (
    <Image
      className="logo"
      src={LogoImg}
      alt="Jobster Logo"
      width={180}
      height={50}
    />
  );
};

export default Logo;
