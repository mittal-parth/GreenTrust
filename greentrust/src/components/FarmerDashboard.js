// For Dashboard
import FarmCard from "@/components/FarmCard";
import CropDetailCard from "@/components/CropDetailCard";
import { AiFillPlusCircle } from "@react-icons/all-files/ai/AiFillPlusCircle";
import Link from "next/link";
import classes from "@/style";

const FarmerDashboard = ({ farms, stakes }) => {
  return (
    <div>
      <h2 className={`${classes.title} mt-12`}>
        My Farms <Link href={"/farm/add"}><AiFillPlusCircle className="inline mb-1 text-darkGray" /></Link>
      </h2>
      <div className="flex mt-6 flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8 p-6">
        {farms?.map((farm) => (
          <Link href={`/farm/${farm.id}`} >
            <FarmCard 
              farm={farm}
            />
          </Link>
        ))}
      </div>

      <h2 className={`${classes.title} mt-12`}>Staked Crops</h2>

      <div className="flex mt-6 flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-12 p-6">
        {stakes?.map((stake) => (
          <Link href={`/farm/${stake.farm.id}/crop/${stake.cropId}`} >
            <CropDetailCard stake={stake}/>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FarmerDashboard;
