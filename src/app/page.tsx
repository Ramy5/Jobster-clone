"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import MainImg from "../assets/images/main.svg";
import { Logo } from "@/components";

const page = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

// STYLE WITH STYLED COMPONENT
const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    height: var(--nav-height);
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  .page {
    height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
  }

  h1 {
    font-weight: 700;

    span {
      color: var(--primary-500);
    }
  }

  p {
    color: var(--grey-600);
  }

  .main-img {
    display: none;
  }

  @media only screen and (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }

    .main-img {
      display: block;
    }
  }
`;

export default page;
