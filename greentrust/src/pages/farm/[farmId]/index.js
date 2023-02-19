import CropCard from "@/components/CropCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faChartPie, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { contractCall } from "@/utils";
import { useAuth } from "@/auth/useAuth";
import { useRouter } from 'next/router'
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";
import Info from "@/components/Info";
import Link from "next/link";
import { AiFillPlusCircle } from "@react-icons/all-files/ai/AiFillPlusCircle";
import IconButton from "@/components/IconButton";
import Lottie from 'react-lottie-player'
import farm from '../../../../public/lotties/farm.json'
import Empty from "@/components/Empty";
import FarmerCard from "@/components/FarmerInfoCard";

export default function FarmInfo() {
  const auth = useAuth();
  const router = useRouter()
  const { farmId } = router.query
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
  const { loading, setLoading } = useContext(LoaderContext);

  const [farmInfo, setFarmInfo] = useState(null);
  const [crops, setCrops] = useState([]);
  const [farmer, setFarmer] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [farmerId, setFarmerId] = useState("");
  const fetchFarmInfo = async () => {
    setLoading(true);

    try {
      const farmRes = await contractCall(auth, 'farms', [farmId]);
      setFarmInfo(farmRes.data);
      console.log('farmRes debug:', farmRes.data);

      const cropsRes = await contractCall(auth, 'fetchFarmCrops', [farmId]);
      setCrops(cropsRes.data);
      const farmerRes = await contractCall(auth, 'farmers', [parseInt(farmRes.data.farmerId._hex)]);

      const res = await contractCall(auth, "fetchUserType");
      if (res.data == "farmer") {
        const farmerIdRes = await contractCall(auth, "addressToFarmerIds", [
          auth.user.address,
        ]);
        if (parseInt(farmRes.data.farmerId._hex) == parseInt(farmerIdRes.data._hex)) {
          setHasAccess(true);
        }
      }
      setFarmer(farmerRes.data);
      console.log('farmer debug:', farmRes.data.profile)

    }
    catch (err) {
      setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${err.code}: ${err.message}` })
    }

    setLoading(false);
  }

  useEffect(() => {
    if (auth.user) {
      fetchFarmInfo();
    }
  }, [auth?.user])

  var element = crops?.map((cropDetails) => {
    return <CropCard cropDetails={cropDetails} />;
  });
  var cropList = <div className={`grid grid-cols-1: md:grid-cols-2 gap-10`}>{element}</div>;

  if (!farmInfo) {
    return <></>
  }

  return (
    <div>
      <div className="mt-10">
        <div className="flex flex-col md:flex-row mb-10 justify-around">
          <div className="shrink-0 grow">
            <h1>
              {farmInfo.name ?? "Serene Farm"}
            </h1>
            <div className="flex flex-row gap-10">
              <Info icon={faLocationDot} text={farmInfo?.location} style="text-red" />
              <Info icon={faChartPie} text={`${farmInfo?.size} Acre`} style="text-gray" />
            </div>
            <div className="my-10">
              {/* {farmer && <FarmerCard
                profile={farmer.profile}
              />} */}
            </div>
            <div className="flex flex-row gap-10 items-center mb-2">
              <h2 className="mb-0">
                Crops
              </h2>
              {hasAccess && <Link href={`/farm/${farmId}/crop/add`}><IconButton icon={faPlus} styles="!w-6 !h-6" /></Link>}
            </div>
            {crops?.length > 0 ? cropList : <Empty text="No crops registered " />}

          </div>
          <div className="hidden lg:flex shrink min-w-[400px]">
            <Lottie
              loop
              animationData={farm}
              play
              className="my-auto object-fill" />
          </div>
        </div>
      </div>
    </div>
  );
}
