import CropCard from "@/components/CropCard";
import FarmerDefaultCard from "@/components/FarmerInfoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faChartPie } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import { contractCall } from "@/utils";
import { useAuth } from "@arcana/auth-react";
import { useRouter } from 'next/router'
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";

export default function FarmInfo() {
  const auth = useAuth();
  const router = useRouter()
  const { farmId } = router.query
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
  const { loading, setLoading } = useContext(LoaderContext);

  const [farmInfo, setFarmInfo] = useState(null);
  const [crops, setCrops] = useState([]);
  const [farmer, setFarmer] = useState(null);

  const fetchFarmInfo = async () => {
    setLoading(true);
    const res = await contractCall(auth, 'fetchFarmDetails', [farmId]);
    if (res.status == 200) {
      console.log(res.data, "test")
      setFarmInfo(res.data);
      const cropsRes = await contractCall(auth, 'fetchFarmCrops', [farmId]);
      if (cropsRes.status == 200) {
        setCrops(cropsRes.data);
      } else {
        setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${cropsRes.status}: Fetch failed` })
      }
      const farmerRes = await contractCall(auth, 'fetchFarmerDetails', [res.data.farmerId]);
      if (farmerRes.status == 200) {
        setFarmer(farmerRes.data);
      } else {
        setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${farmerRes.status}: Fetch failed` })
      }
    }
    else {
        setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${res.status}: Fetch failed` })
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
  var cropList = <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3">{element}</div>;

  console.log(crops, "test")

  if (!farmInfo) {
    return <></>
  }

  return (
    <div>
      <div className="mt-10 ">
        <p className="font-comfortaa font-bold text-4xl text-darkPrimary pb-15">
          Farm Info
        </p>
        <div className="flex flex-col md:flex-row mb-10 justify-around">
          <div className="hidden md:block">
            <img
              src="../images/farmer.png"
              className="mr-10 my-auto object-none"
            ></img>
          </div>
          <div>
            <div>
              <p className="w-fit font-bold text-3xl text-center text-primary font-comfortaa pt-6">
                {farmInfo.name ?? "Serene Farm"}
              </p>
              <div className="flex my-5">
                <div className="flex items-center px-2">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: "brown" }}
                  />
                  <p className="text-darkGray font-comfortaa px-3 ">
                    {farmInfo?.location}
                  </p>
                </div>
                <div className="flex items-center mx-3">
                  <FontAwesomeIcon
                    icon={faChartPie}
                    style={{ color: "grey" }}
                  />
                  <p className="text-darkGray font-comfortaa px-3 ">
                    {farmInfo?.size} Acres
                  </p>
                </div>
              </div>
            </div>
            <div className="my-10">
              {farmer && <FarmerDefaultCard
                profile={farmer.profile}
              />}
            </div>
            {crops?.length > 0 && <p className="w-fit font-bold text-2xl text-center text-primary font-comfortaa">
              Crops
            </p>}
            {cropList}
          </div>
        </div>
      </div>
    </div>
  );
}
