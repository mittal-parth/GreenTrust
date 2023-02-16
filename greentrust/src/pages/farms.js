import { useState, useEffect, useContext } from "react";
import { contractCall } from "@/utils";
import { useAuth } from "@arcana/auth-react";
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";
import FarmerDashboard from "@/components/FarmerDashboard";

export default function Farms() {
    const auth = useAuth();

    const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
    const { loading, setLoading } = useContext(LoaderContext);

    const [farms, setFarms] = useState(null);

    const fetchFarms = async () => {
        setLoading(true);

        try {
            const res = await contractCall(auth, 'farms', []);
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

    return (<>
        <h1>Our Farms</h1>
    </>);
}
