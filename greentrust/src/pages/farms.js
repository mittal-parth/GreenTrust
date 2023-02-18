import { useState, useEffect, useContext } from "react";
import { contractCall } from "@/utils";
import { useAuth } from "@/auth/useAuth";
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";
import FarmerDashboard from "@/components/FarmerDashboard";
import FarmCard from "@/components/FarmCard";
import classes from "../style";
import Link from "next/link";

export default function Farms() {
    const auth = useAuth();

    const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
    const { loading, setLoading } = useContext(LoaderContext);

    const [farms, setFarms] = useState(null);

    useEffect(() => {
        if(auth.user){
            fetchFarms();
        } 
    },[auth?.user]);

    
    const fetchFarms = async () => {
        setLoading(true);

        try {
            const res = await contractCall(auth, 'fetchAllFarms', []);
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
            console.log(farms, "farms")
        }
    }, [auth?.user]);

    return (
    <>
    <div>
         <h2 className={`${classes.title} mt-12`}>Registered Farms</h2>
         <div className="flex flex-wrap space-x-0 space-y-0">
            {farms && farms.length > 0 ? farms.map((farm, index) => {
                return <div className=" mb-3"><Link href={`/farm/${farm.id}`}> <FarmCard key={index} farm={farm} /></Link></div>
            }) : <h3 className="text-center font-comfortaa text-darkGray">No farms registered yet</h3>
        }
        </div>
    </div>



    </>);
}
