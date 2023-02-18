import { useRouter } from "next/router";
import { useAuth } from "@/auth/useAuth";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";

import LandingNavbar from "@/components/LandingNavbar";
import Button from "@/components/Button";
import { contractCall } from "@/utils";


const Landing = () => {

  const router = useRouter();
  const auth = useAuth();

  const onLogin = async () => {
    try {
      await auth.connect();
      console.log("test", auth.user)
    } catch (e) {
      console.log(e);
    }
  };

  const checkUser = async () => {
    try {
      const res = await contractCall(auth, "fetchUserType");
      console.log(res.data, "Response");
      if (res.data === "farmer" || res.data === "verifier") {
        router.push("/dashboard");
      } else {
        router.push("/farms");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!auth?.loading && auth?.isLoggedIn) {
      checkUser();
    }
  }, [auth?.loading, auth?.isLoggedIn]);

  return (
    <>
    {auth.loading ? (
      <Spinner></Spinner>
    ) :
    (<div className="bg-white w-full overflow-hidden flex">
      <div className="md:w-2/3 w-full">
        <LandingNavbar /> 
        <div
          id="home"
          className="flex flex-col items-center h-full md:pt-[160px] py-[40px]"
        >
          <div className="flex md:hidden">
            <img src="/images/farmer.png" alt="landing" className="w-full"/>
          </div>

          <div className="px-[10%] md:px-0 w-fit">
            <div>
              <p className="font-comfortaa font-bold ss:text-[44px] text-[40px] text-darkGray">
                Register with
              </p>
              <h1 className="font-poppins ss:text-[68px] text-[52px] text-primary leading-[120%] w-full">
                <span className="text-primary font-extrabold">Green </span>
                <span className="text-gray font-medium">TRUST</span>
              </h1>
              <p className="flex-1 font-comfortaa font-semibold ss:text-[44px] text-[40px] text-darkGray">
                today!
              </p>
            </div>
            
            <p
              className={`text-3xl text-gray font-bold font-comfortaa max-w-[470px] mt-5`}
            >
              Secure <span className="text-red">seamless</span>, <span className="text-red">hassle-free</span> and <span className="text-red">trusted</span> certification for your <span className="text-primary">organic produce</span>.
            </p>

            <div className="mt-6">
              <Button text={"Get Started"} styles={"!py-2 text-2xl"} onClick={onLogin} />
            </div>

          </div>
        </div>
      </div>

      <div className="w-1/3 hidden md:flex ">
        <img src="./images/landing.svg" alt="landing" className="object-cover w-full h-screen"/>
      </div>
    </div>)}
    </>
  );
};

export default Landing;