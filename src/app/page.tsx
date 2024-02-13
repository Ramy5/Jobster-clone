import Image from "next/image";
import LogoImg from "../assets/images/logo.svg";
import MainImg from "../assets/images/main.svg";

export default function Home() {
  return (
    <main>
      <nav>
        <Image src={LogoImg} alt="Jobster Logo" width={180} height={50} />
      </nav>

      <div className="container page" style={{ display: "flex" }}>
        {/* INFO */}
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>{`I'm baby paleo mukbang chia live-edge. Poke salvia ascot plaid. Lo-fi microdosing normcore narwhal. Big mood kitsch jianbing four dollar toast organic post-ironic gluten-free, pop-up cliche same kogi austin.`}</p>
          <button className="btn btn-hero">Login/Register</button>
        </div>

        <Image
          className="img main-img"
          src={MainImg}
          width={400}
          height={350}
          alt="Job Hunt"
        />
      </div>
    </main>
  );
}
