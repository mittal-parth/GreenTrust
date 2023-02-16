import { useState, useEffect, useContext } from "react";
import { contractCall } from "@/utils";
import { useAuth } from "@arcana/auth-react";
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";
import FarmerDashboard from "@/components/FarmerDashboard";

export default function Dashboard() {
  const auth = useAuth();
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
  const { loading, setLoading } = useContext(LoaderContext);

  const [userType, setUserType] = useState(null);
  const [farms, setFarms] = useState(null);
  const [stakes, setStakes] = useState(null);

  const fetchDashboardDetails = async () => {
    setLoading(true);
    const res = await contractCall(auth, "fetchUserType");
    if (res.status == 200) {
      setUserType(res.data);
      if (res.data == "farmer") {
        const profileRes = await contractCall(auth, "fetchFarmerProfile");
        if (profileRes.status == 200) {
          const farmsRes = await contractCall(auth, "fetchFarmerFarms", [
            profileRes.data.id,
          ]);
          if (farmsRes.status == 200) {
            setFarms(farmsRes.data);
          } else {
            console.log(farmsRes.error, "Fetch failed");
            setSnackbarInfo({
              ...snackbarInfo,
              open: true,
              message: `Error ${farmsRes.status}: Failed to fetch farms`,
            });
          }
          const stakesRes = await contractCall(auth, "fetchFarmerStakes");
          if (stakesRes.status == 200) {
            let stakes = [];
            for (let i = 0; i < stakesRes.data.length; i++) {
              const stake = stakesRes.data[i];
              const cropRes = await contractCall(auth, "fetchCropDetails", [
                stake.cropId,
              ]);
              if (cropRes.status == 200) {
                stakes.push({
                  ...stake,
                  crop: cropRes.data,
                });
              } else {
                console.log(cropRes.error, "Fetch failed");
                setSnackbarInfo({
                  ...snackbarInfo,
                  open: true,
                  message: `Error ${cropRes.status}: Failed to fetch crop details`,
                });
              }
            }

          } else {
            console.log(stakesRes.error, "Fetch failed");
            setSnackbarInfo({
              ...snackbarInfo,
              open: true,
              message: `Error ${stakesRes.status}: Failed to fetch stakes`,
            });
          }
        } else {
          console.log(profileRes.error, "Fetch failed");
          setSnackbarInfo({
            ...snackbarInfo,
            open: true,
            message: `Error ${profileRes.status}: Failed to fetch farmer profile`,
          });
        }
      }
    } else {
      console.log(res.error, "Fetch failed");
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: `Error ${res.status}: Fetch failed`,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (auth.user) {
      fetchDashboardDetails();
    }
  }, [auth?.user]);

  if (userType == "farmer") {
    return <FarmerDashboard farms={farms} stakes={stakes} />;
  }

  return <></>;
}
