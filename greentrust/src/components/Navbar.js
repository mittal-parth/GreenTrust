import { useEffect, useState } from "react";

import { ethers } from "ethers";
import { useAuth } from "@/auth/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import GoogleTranslate from "./GoogleTranslate";

import { ArcanaAuth } from "./Layout";
import Logo from "./Logo";
import NavbarLink from "./NavbarLink";
import { faHouse, faIdCard, faTractor } from "@fortawesome/free-solid-svg-icons";
import { contractCall } from "@/utils";


export default function Navar() {
  const auth = useAuth();


  const [isRegistered, setIsRegistered] = useState(false);

  const checkUser = async () => {
    try {
      const res = await contractCall(auth, "fetchUserType");
      console.log('debug:', res.data);
      if (res.data === "farmer" || res.data === "verifier") {
        setIsRegistered(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(auth.user) {
      checkUser();
    }
  }, [auth?.user])

  return (
    <div className="px-0 md:px-[10%] flex justify-center">
      <nav className="mt-0 md:mt-6 bg-white border-gray-200 px-6 md:px-20 py-3 rounded-none md:rounded-full drop-shadow-2xl w-full max-w-[1400px] flex flex-row items-center justify-between">
        <div className="flex flex-row gap-12 items-center">
          <Logo />
          <section className="flex flex-row gap-4">

            <NavbarLink link="/dashboard" icon={faHouse} />
            <NavbarLink link="/farms" icon={faTractor} />
            {(auth?.user && !isRegistered) && <NavbarLink link="/profile/role-choice" icon={faIdCard} />}
          </section>
        </div>
        <div className="flex flex-row gap-6 items-center">
            <div id="google_translate_element" />
            <GoogleTranslate />
          <ArcanaAuth />
        </div>
      </nav>
    </div>
  );
}
