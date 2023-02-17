import { useRouter } from "next/router";

import RoleCard from "@/components/RoleCard";


export default function RoleChoice({}) {
  const router = useRouter();

  return (
    <>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center mt-24 lg:mt-36">
          <h2 className="text-6xl">
            Get<br />Verified
          </h2>
          <div className="flex flex-col md:flex-row gap-16">
            {/* <a href="/farmer/register"> */}
              <RoleCard name={"Farmer"} imagePath={"/farmer-woman.png"} path={'/profile/register?type=farmer'} />
            {/* </a> */}
            {/* <a href="/verifier/register"> */}
              <RoleCard name={"Licensed Verifier"} imagePath={"/sheriff.png"} path={'/profile/register?type=verifier'} />
            {/* </a> */}
          </div>
        </div>
      
    </>
  );
}
