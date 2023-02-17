import { useState, useEffect, useContext } from "react";
import { contractCall } from "@/utils";
import { useAuth } from "@arcana/auth-react";
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";
import FarmerDashboard from "@/components/FarmerDashboard";
import FarmCard from "@/components/FarmCard";
import classes from "../style";

export default function Farms() {
    const auth = useAuth();

    const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
    const { loading, setLoading } = useContext(LoaderContext);

    const [farms, setFarms] = useState(null);

    useEffect(() => {
         fetchFarms();
    }, );

    
    const fetchFarms = async () => {
        setLoading(true);

        try {
            const res = await contractCall(auth, 'farms', []);
            console.log(res.data, "farms data")
            setFarms(res.data);
        } catch (err) {
            console.log(err);
            setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${err.code}: ${err.message}` })
        }

        setLoading(false);
    };

    useEffect(() => {
        if (auth.user) {
            fetchFarms();
        }
    }, [auth?.user]);

    return (
    <>
    <div>
         <h2 className={`${classes.title} mt-12`}>Registered Farms</h2>
         {farms && farms.length > 0 ? farms.map((farm, index) => {
            return <FarmCard key={index} farm={farm} />
        }) : <h3 className="text-center">No farms registered yet</h3>
         }
    </div>



    </>);
}
