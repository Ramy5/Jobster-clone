"use client";

import Image from "next/image";
import NotFoundImg from "../assets/images/not-found.svg";
import Link from "next/link";
import styled from "styled-components";

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <div>
        <Image
          src={NotFoundImg}
          alt="Not Fount"
          className="img"
          width={400}
          height={400}
        />
        <h3>Ohh! page not fount</h3>
        <p>{`We can't seem to find the page you're looking for`}</p>
        <div>
          <Link href={"/landing"} className="btn">
            Back Home
          </Link>
        </div>
      </div>
    </NotFoundWrapper>
  );
};

const NotFoundWrapper = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
`;

export default NotFound;
