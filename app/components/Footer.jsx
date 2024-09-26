import Image from "next/image";
import githubIcon from "../../public/icons/github-142-svgrepo-com.svg";
import instagramIcon from "../../public/icons/instagram-svgrepo-com.svg";
import linkedInIcon from "../../public/icons/linkedin-rounded-svgrepo-com.svg";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 text-lg">
      <div className="flex gap-4">
        <a
          rel="noreferrer"
          target="_blank"
          href="https://github.com/BrettEastman/listeningRouletteNext"
        >
          View source code
        </a>
        <a href="https://github.com/BrettEastman">
          <Image
            src={githubIcon.src}
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          ></Image>
        </a>
        <a href="https://www.linkedin.com/in/brett-austin-eastman/">
          <Image
            src={linkedInIcon.src}
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          ></Image>
        </a>
        <a href="https://www.instagram.com/brettaustineastman/">
          <Image
            src={instagramIcon.src}
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          ></Image>
        </a>
      </div>
      <p>Designed and developed by Brett Austin Eastman</p>
      <p>{`©${new Date().getFullYear()} Lost Lanes Publishing`}</p>
    </footer>
  );
}
