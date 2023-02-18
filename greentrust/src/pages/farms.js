import Link from "next/link";
import { useState, useEffect, useContext } from "react";

import { contractCall } from "@/utils";
import { useAuth } from "@/auth/useAuth";
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";
import FarmCard from "@/components/FarmCard";
import Empty from "@/components/Empty";


export default function Farms() {
    const auth = useAuth();

    const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
    const { loading, setLoading } = useContext(LoaderContext);

    const [farms, setFarms] = useState(null);

    useEffect(() => {
        if (auth.user) {
            fetchFarms();
        }
    }, [auth?.user]);

    const fetchFarms = async () => {
        setLoading(true);

        try {
            const res = await contractCall(auth, 'fetchAllFarms', []);
            setFarms(res.data);
        } catch (err) {
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
        <div>
            <h1>Registered Farms</h1>
            <div className="grid">
                {farms && farms.length > 0 ? farms.map((farm, index) => {
                    return <div className=" mb-3"><Link href={`/farm/${farm.id}`}> <FarmCard key={index} farm={farm} /></Link></div>
                }) : <Empty text="No farms have been registered yet!" />
                }
            </div>
        </div>
    );
}
