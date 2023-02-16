import RoleCard from "@/components/RoleCard";


export default function RoleChoice({}) {
  return (
    <>
        <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center mt-24 lg:mt-36">
          <h2 className="text-6xl">
            Get<br />Verified
          </h2>
          <div className="flex flex-col md:flex-row gap-16">
            <RoleCard name={"Farmer"} imagePath={"/farmer-woman.png"} />
            <RoleCard name={"Licensed Inspector"} imagePath={"/sheriff.png"} />
          </div>
        </div>
      
    </>
  );
}
