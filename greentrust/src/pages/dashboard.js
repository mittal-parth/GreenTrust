import { useState, useEffect, useContext } from "react";

import { useAuth } from "@arcana/auth-react";

import { contractCall } from "@/utils";
import { LoaderContext } from "@/context/loaderContext";
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

  return <>{type && type == "farmer" ? <FarmerDashboard auth={auth} /> : <></>}</>
}
