import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { BiRupee } from "@react-icons/all-files/bi/BiRupee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faChartPie,
    faQrcode,
    faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@arcana/auth-react";

import SensorCard from "@/components/SensorCard";
import FarmerCard from "@/components/FarmerInfoCard";
import Button from "@/components/Button";
import PendingChallenge from "@/components/pendingChallenge";
import classes from "@/style";
import { contractCall } from "@/utils";
import Spinner from "@/components/Spinner";
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";


const Crop = () => {
    const router = useRouter();

    const { farmId, cropId } = router.query;

    const auth = useAuth();

    const [data, setData] = useState(null);

    const [farm, setFarm] = useState(null);

    const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

    const { loading, setLoading } = useContext(LoaderContext);

    async function getCropDetails() {
        setLoading(true);

        const data = {};

        let res = await contractCall(auth, 'fetchCropDetails', [cropId]);
        if (res.status == 200) {
            data.crop = JSON.parse(res.data.details);
            data.farmId = Number(res.data.farmId);
        }
        else {
            setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${res.status}: ${res.error.message}` })
        }

        // res = await contractCall(auth, 'fetchFarmDetails', [data.farmId]);
        // if (res.status == 200) {
        //     data.farm = res.data.farm;
            
        //     data.farmerProfile = res.data.farmer.profile;
        //     console.log(data.farmerProfile);
        // }
        // else {
        //     setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${res.status}: ${res.error.message}` })
        // }

        // // setData(data);
        // console.log(data);

        setLoading(false);
    }

    useEffect(() => {
        if (auth.user) {
            getCropDetails();
        }
    }, [auth.user, auth.loading])

    var stateAmount = 100;
    var sensorDetails = new Map([
        ["sensorName", "NPK"],
        ["sensorId", "j12o3asdasdj12i3"],
    ]);
    var area = 100;
    var location = "Assam";
    var sensorDetailsList = Array(10).fill(sensorDetails);
    var stakedHolders = Array(10).fill(
        <img src="/images/jonathan.png" className="rounded-full mr-2"></img>
    );
    var element = sensorDetailsList.map((sensorDetails) => {
        return <SensorCard sensorDetails={sensorDetails} />;
    });

    var sensorList = <div className="grid grid-cols-4  w-fit ">{element}</div>;
    var location = "Assam";
    var area = "100";
    return (<>{data && (
        <div>
            <div className="mt-10 ">
                <p className="font-comfortaa font-bold text-[2.625rem] text-darkPrimary pb-15 ">
                    Crop Info
                </p>
                <div className="flex mb-10">
                    <div className="">
                        <img
                            src="/images/plant.png"
                            className="mr-10 my-auto object-none"
                        ></img>
                    </div>
                    <div>
                        <div>
                            <div className="flex justify-between items-center pt-4">
                                <div className="flex items-center">
                                    <p className="w-fit mx-3 font-bold text-4xl text-center text-primary font-comfortaa   ">
                                        {data.crop.name}
                                    </p>
                                    <FontAwesomeIcon
                                        icon={faQrcode}
                                        style={{ color: "darkGray" }}
                                        size="2x"
                                    />
                                </div>
                                <div>
                                    <Button
                                        text="Challenge"
                                        icon={faCircleXmark}
                                        color={"bg-red-600"}
                                    />
                                </div>
                            </div>
                            <div className="flex my-5">
                                <div className="flex items-center mx-3">
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        style={{ color: "brown" }}
                                    />
                                    <p className="text-darkGray font-comfortaa px-3 ">
                                        {data.farm.location}
                                    </p>
                                </div>
                                <div className="flex items-center mx-3">
                                    <FontAwesomeIcon
                                        icon={faChartPie}
                                        style={{ color: "grey" }}
                                    />
                                    <p className="text-darkGray font-comfortaa px-3 ">
                                        {data.crop.size} Acres
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="my-20">
                            <FarmerCard
                                profile={data.farmerProfile}
                            />
                        </div>
                        <p className="w-fit mx-3 font-bold text-2xl text-center text-primary font-comfortaa pt-4  ">
                            Sensor
                        </p>
                        {sensorList}
                        <p className="w-fit mx-3 mt-10 font-bold text-2xl text-center text-primary font-comfortaa pt-4  ">
                            Stakeholders
                        </p>
                        <div className="flex mt-2 items-center  ">
                            <BiRupee className="text-primary" />
                            &nbsp;
                            <p className={`${classes.paragraph}`}>{stateAmount} </p>
                        </div>
                        <div>
                            <div className="flex my-3">{stakedHolders}</div>
                            <div className="flex mt-10 space-x-10">
                                <Button
                                    text="Stake"
                                    icon={faCircleXmark}
                                    color={"bg-primary"}
                                />
                                <Button
                                    text="Request Stakes"
                                    icon={faCircleXmark}
                                    color={"bg-primary"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="font-comfortaa font-bold text-[2.625rem] text-darkPrimary pb-15 ">
                        Pending Challenges
                    </p>
                    <PendingChallenge />
                </div>
            </div>
        </div>
    )}</>);
};

export default Crop;
