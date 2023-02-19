import { useState } from "react";
import Link from "next/link";

import Logo from "@/components/Logo";

const navLinks = [
    {
      id: "features",
      title: "Features",
    },
    {
      id: "steps",
      title: "Steps",
    },
    {
      id: "contact-us",
      title: "Contact Us",
    },
];

const LandingNavbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex sm:justify-between justify-center px-[10%] items-center navbar mt-6">
      <Logo />

      <ul className="list-none sm:flex hidden ml-8 items-center justify-around">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-comfortaa
            font-bold
            cursor-pointer
            text-[16px]
            ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}
            text-darkGray hover:text-darkPrimary`}
          >
            <Link href={`/${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LandingNavbar;
