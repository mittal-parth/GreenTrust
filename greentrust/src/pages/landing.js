import classes from "../style";
import LandingNavbar from "@/components/LandingNavbar";
import Button from "@/components/Button";

const Landing = () => {
  return (
    <div className="bg-white w-full overflow-hidden flex h-screen">
      <div className="w-2/3">
        <LandingNavbar />

        <div
          id="home"
          className={`flex md:flex-row flex-col ${classes.paddingY} ${classes.paddingX} `}
        >
          <div
            className={`flex ${classes.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
          >
            {/* Hero text */}
            <div className="flex flex-row justify-between items-center w-full text-primary">
              <h1 className="flex-1 font-comfortaa font-semibold ss:text-[50px] text-[40px] text-darkGray ss:leading-[80px] leading-[80px]">
                Register with
              </h1>
            </div>

            <h1 className="font-comfortaa font-semibold ss:text-[68px] text-[52px] text-primary ss:leading-[80px] leading-[80px] w-full">
              <span className="text-primary font-900 ">Green </span>{" "}
              <span className="text-darkGray font-poppins">TRUST</span>
            </h1>
            <h1 className="flex-1 font-comfortaa font-semibold ss:text-[50px] text-[40px] text-darkGray ss:leading-[80px] leading-[80px]">
              today!
            </h1>
            <p
              className={`text-2xl text-gray-800 font-normal font-comfortaa max-w-[470px] mt-5`}
            >
              Secure <span className="text-red-500">seamless</span>,{" "}
              <span className="text-red-500">hassle-free</span> and{" "}
              <span className="text-red-500">trusted</span> certification for
              your organic produce.
            </p>

            <div className="mt-6">
                <Button text={"Get Started"} color={"bg-primary"}/>
            </div>

          </div>
        </div>
      </div>

      <div className="w-1/3 hidden md:block ">
        <img src="./images/landing.svg" alt="landing" className="object-cover h-screen"/>
      </div>
    </div>
  );
};

export default Landing;
