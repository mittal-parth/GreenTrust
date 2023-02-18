import { useState, useEffect, useContext } from "react";
import { contractCall } from "@/utils";
import { useAuth } from "@/auth/useAuth";
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";
import VerifierDashboard from "@/components/VerifierDashboard";
import FarmerDashboard from "@/components/FarmerDashboard";
import Button from "@/components/Button";


export default function Dashboard() {
  const { loading, setLoading } = useContext(LoaderContext);

  const [type, setType] = useState(null);

  useEffect(() => {
    setLoading(true);
  }, [])

  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      console.log('debug:', auth.user);
      setLoading(false);

      contractCall(auth, "fetchUserType")
        .then((res) => setType(res.data));
    }
  }, [auth?.user]);
console.log(userType, "user type")
  if (userType == "farmer") {
    return <FarmerDashboard farms={farms} stakes={stakes} />;
  }
  else if(userType == "verifier"){
    return <VerifierDashboard />;
  }
  return <></>;
}
