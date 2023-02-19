// For Dashboard
import Link from "next/link";
import { useEffect, useState, useContext } from "react";

import FarmCard from "@/components/FarmCard";
import CropDetailCard from "@/components/CropDetailCard";
import classes from "@/style";
import IconButton from "@/components/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SnackbarContext } from "@/context/snackbarContext";
import { contractCall } from "@/utils";
import CustomCarousel from "@/components/CustomCarousel";
import Empty from "./Empty";


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

  const farmerCardsResponsive = {
    lg: {
      breakpoint: { max: 3000, min: 1300 },
      items: 4,
    },
    md: {
      breakpoint: { max: 1300, min: 800 },
      items: 3,
    },
    sm: {
      breakpoint: { max: 800, min: 520 },
      items: 2,
    },
    xs: {
      breakpoint: { max: 520, min: 0 },
      items: 1,
    }
  };

  const cropCardsResponsive = {
    lg: {
      breakpoint: { max: 3000, min: 1500 },
      items: 4,
    },
    md: {
      breakpoint: { max: 1500, min: 1200 },
      items: 3,
    },
    sm: {
      breakpoint: { max: 1200, min: 720 },
      items: 2,
    },
    xs: {
      breakpoint: { max: 720, min: 0 },
      items: 1,
    }
  };

  return (
    <div>
      <section className="mb-10">
        <div className="flex flex-row gap-10">
          <h1>
            My Farms
          </h1>
          <Link href="/farm/add"><IconButton icon={faPlus} /></Link>
        </div>
        <div className="static">
          {farms.length > 0 ? <CustomCarousel responsive={farmerCardsResponsive} >
            {farms?.map((farm) => (
              <FarmCard
                farm={farm}
                key={farm.id}
              />
            ))}
          </CustomCarousel> : <Empty text="No farms registered yet!" />}
        </div>
      </section>

      <section>
        <h2>Staked Crops</h2>

        <div className="static">
          {stakes.length > 0 ? <CustomCarousel responsive={cropCardsResponsive} >
            {stakes?.map((stake) => (
                <CropDetailCard stake={stake} />
            ))}
          </CustomCarousel> : <Empty text="You haven't sponsored any farms yet" />}
        </div>
      </section>
    </div>
  );
};
