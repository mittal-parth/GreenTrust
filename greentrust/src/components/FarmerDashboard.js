// For Dashboard
import FarmCard from "@/components/FarmCard";
import CropDetailCard from "@/components/CropDetailCard";
import { AiFillPlusCircle } from "@react-icons/all-files/ai/AiFillPlusCircle";

import classes from "@/style";

const FarmerDashboard = ({ farms, stakes }) => {
  return (
    <div>
      <h2 className={`${classes.title} mt-12`}>
        My Farms <AiFillPlusCircle className="inline mb-1 text-darkGray" />
      </h2>
      <div className="flex mt-6 flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8 p-6">
        {farms?.map((farm) => (
          <FarmCard 
            image={"images/farm.png"}
            name={farm.name}
            location={farm.location}
          />
        ))}
      </div>

      <h2 className={`${classes.title} mt-12`}>Staked Crops</h2>

      <div className="flex mt-6 flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-12 p-6">
        <CropDetailCard
          cropName={"Barley"}
          farmName={"Sila's State Farm"}
          stakeAmount={"5000"}
          date={"Feb 13th, 2020"}
          timeToMature={"13 Months"}
          location={"Assam, India"}
        />
        <CropDetailCard
          cropName={"Apple"}
          farmName={"Pranav's Farm"}
          stakeAmount={"6000"}
          date={"Sept 22nd, 2021"}
          timeToMature={"10 Months"}
          location={"Mangaluru, India"}
        />
        <CropDetailCard
          cropName={"Wheat"}
          farmName={"Mehul's Farm"}
          stakeAmount={"500"}
          date={"Feb 13th, 2021"}
          timeToMature={"11 Months"}
          location={"Bengaluru, India"}
        />
      </div>
    </div>
  );
};

export default FarmerDashboard;
