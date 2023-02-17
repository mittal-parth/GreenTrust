// For Dashboard
import FarmCard from "@/components/FarmCard";
import CropDetailCard from "@/components/CropDetailCard";
import Link from "next/link";
import classes from "@/style";
import IconButton from "./IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { SnackbarContext } from "@/context/snackbarContext";
import { useContext } from "react";
import { contractCall } from "@/utils";


export default function FarmerDashboard({ auth }) {
  const [farms, setFarms] = useState([]);
  const [stakes, setStakes] = useState([]);

  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

  async function fetchDashboardDetails() {
    try {
      const farmerIdRes = await contractCall(auth, "addressToFarmerIds", [
        auth.user.address,
      ]);
      const farmsRes = await contractCall(auth, "fetchFarmerFarms", [
        farmerIdRes.data,
      ]);
      setFarms(farmsRes.data);

      const stakesRes = await contractCall(auth, "fetchFarmerStakes", [farmerIdRes.data]);
      let farmerStakes = [];
      for (let i = 0; i < stakesRes.data.length; i++) {
        const stake = stakesRes.data[i];
        const cropRes = await contractCall(auth, "crops", [stake.cropId]);
        const farmRes = await contractCall(auth, "farms", [cropRes.data.farmId])
        farmerStakes.push({
          ...stake,
          crop: cropRes.data,
          farm: farmRes.data
        });
      }
      setStakes(farmerStakes);
    }
    catch (err) {
      setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${err.code}: ${err.message}` })
    }
  }

  useEffect(() => {
    fetchDashboardDetails();
  }, []);

  return (
    <div>
      <div className="flex flex-row gap-10">
        <h1>
          My Farms 
        </h1>
        <IconButton icon={faPlus} />
      </div>
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
            <CropDetailCard stake={stake} />
          </Link>
        ))}
      </div>
    </div>
  );
};
