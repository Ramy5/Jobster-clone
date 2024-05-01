import Image from "next/image";
import Link from "next/link";
import React from "react";
import MainImg from "../assets/images/main.svg";
import { Logo } from "@/components";

const page = () => {
  return (
    <main>
      <nav>
        <Logo />
      </nav>

      <div className="container page">
        {/* INFO */}
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>{`I'm baby paleo mukbang chia live-edge. Poke salvia ascot plaid. Lo-fi microdosing normcore narwhal. Big mood kitsch jianbing four dollar toast organic post-ironic gluten-free, pop-up cliche same kogi austin.`}</p>
          <Link href={"/register"} className="btn btn-hero">
            Login/Register
          </Link>
        </div>

        {/* MAIN IMAGE */}
        <Image
          className="img main-img"
          src={MainImg}
          width={500}
          height={500}
          alt="Job Hunt"
        />
      </div>
    </main>
  );
};

export default page;
