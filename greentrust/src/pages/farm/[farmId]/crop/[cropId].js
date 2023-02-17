import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AiFillPlusCircle } from "@react-icons/all-files/ai/AiFillPlusCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faChartPie,
    faQrcode,
    faCircleXmark,
    faMoneyBillWave,
    faCoins,
    faUnlock,
    faHandHoldingDollar,
    faShare
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@arcana/auth-react";

import SensorCard from "@/components/SensorCard";
import FarmerCard from "@/components/FarmerInfoCard";
import Button from "@/components/Button";
import { contractCall } from "@/utils";
import { SnackbarContext } from "@/context/snackbarContext";
import { LoaderContext } from "@/context/loaderContext";
import Info from "@/components/Info";
import ChallengeCard from "@/components/ChallengeCard";


const Crop = () => {
    const router = useRouter();

    const { farmId, cropId } = router.query;

    const auth = useAuth();

    const [data, setData] = useState(null);

    const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

    const { loading, setLoading } = useContext(LoaderContext);
    const [isFarmer, setIsFarmer] = useState(false);
    const [farmerId, setFarmerId] = useState("");
    const [userType, setUserType] = useState(null);
    async function getCropDetails() {
        setLoading(true);

        const data = {};

        let res;
        
        
        try {
             res = await contractCall(auth, "fetchUserType");
            setUserType(res.data);
            if (res.data == "farmer") {
                console.log(res.data, "User type")
                setIsFarmer(true);
                
                const farmerIdRes = await contractCall(auth, "addressToFarmerIds", [
                    auth.user.address,
                ]);
                console.log(parseInt(farmerIdRes.data._hex), "Farmer Id")
                
                setFarmerId(parseInt(farmerIdRes.data._hex));
            }

            res = await contractCall(auth, 'crops', [cropId]);
            data.crop = JSON.parse(res.data.details);

            data.farmId = Number(res.data.farmId);
            
            res = await contractCall(auth, 'fetchCropStakes', [cropId]);
            
            res = await contractCall(auth, 'farms', [data.farmId]);
            data.farm = res.data;
            
            res = await contractCall(auth, 'farmers', [data.farm.farmerId]);
            data.farmerProfile = res.data.profile;
            
            console.log(parseInt(data.farm.farmerId), "Farmer Id Data")
            res = await contractCall(auth, 'fetchCropSensors', [cropId]);
            data.sensors = res.data;

            res = await contractCall(auth, 'fetchCropStakes', [cropId]);
            data.stakes = res.data;

            data.stakeholders = [];
            for (let stake of data.stakes) {
                res = await contractCall(auth, 'addressToFarmerIds', [stake.stakeholder])
                const farmerId = parseInt(res.data._hex);

                res = await contractCall(auth, 'farmers', [farmerId]);
                data.stakeholders.push(res.data);
            }

            setData(data);
        }
        catch (err) {
            setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${err.code}: ${err.message}` })
        }

        setLoading(false);
    }

    useEffect(() => {
        if (auth.user) {
            getCropDetails();
        }
    }, [auth.user, auth.loading])

    return (<>{data && (
        <div>
            <div>
                <a href={'/farm/' + data.farmId}>
                    <h1>
                        {data.farm.name}
                    </h1>
                </a>
                <div className="flex mb-10">
                    <div className="shrink hidden md:flex">
                        <img
                            src="/images/plant.png"
                            className="mr-10 my-auto object-fill"
                        ></img>
                    </div>
                    <div className="grow">
                        <div>
                            <div className="flex justify-between items-start xl:items-center pt-4 flex-col xl:flex-row">
                                <div className="flex justify-center gap-6 flex-col">
                                    <div className="flex flex-row justify-between">
                                        <h2 className="mb-0">
                                            {data.crop.name}
                                        </h2>
                                        <FontAwesomeIcon
                                            icon={faQrcode}
                                            className="text-gray w-[32px] h-[32px]"
                                        />
                                    </div>
                                    <div className="flex flex-row gap-10">
                                        <Info icon={faLocationDot} text={data.farm.location} style="text-red" />
                                        <Info icon={faChartPie} text={`${data.crop.size} Acre`} style="text-gray" />
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        text="Challenge"
                                        icon={faCircleXmark}
                                        styles="bg-red !px-8 !justify-between !py-2 !gap-3 mt-4 xl:mt-0"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="my-20">
                            <FarmerCard
                                profile={data.farmerProfile}
                            />
                        </div>
                        <h3>
                            Sensors <Link href={`/farm/${farmId}/crop/${cropId}/sensor/add`}><AiFillPlusCircle className="inline mb-1 text-darkGray" /></Link>
                        </h3>
                        <div className="grid grid-cols-1: sm:grid-cols-2 gap-10">
                            {data.sensors.map((sensor) => <>
                                <SensorCard details={sensor} />
                            </>)}
                        </div>
                        <h3 className="mt-10 mb-0">
                            Stakeholders
                        </h3>
                        <div className="flex mt-2 items-center  ">
                            <FontAwesomeIcon
                                icon={faMoneyBillWave}
                                className="text-gray w-[26px] h-[26px] mr-4"
                            />
                            &nbsp;
                            <p className=""><span className="text-primary font-semibold">{data.crop.stakeAmount}/-</span> each</p>
                        </div>
                        <div>
                            <div className="flex my-3">{data.stakeholders.map((stakeholder) => (
                                <FarmerCard profile={stakeholder.profile} onlyPic={true} />
                            ))}</div>
                            <div className="flex mt-10 flex-wrap justify-start items-start gap-x-2">
                                
                                {isFarmer && farmerId != parseInt(data.farm.farmerId)?
                                <Button
                                text="Sponsor"
                                icon={faCoins}
                                styles="!px-8 !justify-between !py-2 !gap-3 mt-4 xl:mt-0"
                                onClick={async () => {
                                    setLoading(true);

                                    try {
                                        await contractCall(auth, 'AddStake', [cropId])
                                    }
                                    catch (err) {
                                        setSnackbarInfo({ ...snackbarInfo, open: true, message: `Error ${err.code}: ${err.message}` })
                                    }

                                    setLoading(false);
                                }}
                            />
                                :<div></div>}
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>
                        Pending Challenges
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        <ChallengeCard challenge={{
                            desc: "Lörem ipsum trav sohyvis är dung respektive prerade. Diapänat den. Ahet speck. Doning trenar mavis. Osk stereoform innan rär suvis liksom krovis. Brattig smygflyga. Bioränat labårar att vuhojas dehönining. "
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )}</>);
};

export default Crop;
