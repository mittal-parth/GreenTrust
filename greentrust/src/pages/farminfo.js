import CropCard from "@/components/CropCard";
import FarmerDefaultCard from "@/components/FarmerInfoCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot ,faChartPie} from "@fortawesome/free-solid-svg-icons";

export default function FarmInfo({ farmName, StakedDetails }) {
  var cropDetails = new Map([
    ["cropName", "Barley"],
    ["sowingDate", "Feb 13th, 2020"],
  ]);
  var area = 100;
  var location="Assam"
  var cropDetailsList = [
    cropDetails,
    cropDetails,
    cropDetails,
    cropDetails,
    cropDetails,
    cropDetails,
    cropDetails,
    cropDetails,cropDetails,
    cropDetails,
    cropDetails,
    cropDetails,cropDetails,
    cropDetails,
    cropDetails,
    cropDetails,
  ];

  var element = cropDetailsList.map((cropDetails) => {
    return <CropCard cropDetails={cropDetails} />;
  });
  var cropList = (
    <div className="grid grid-cols-4  w-fit ">{element}</div>
  );

  return (
    <div >
      <div className="mt-10 mx-[13%]">
            <p className="font-comfortaa font-bold text-[2.625rem] text-darkPrimary pb-15 ">
                Farm Info
            </p>
        <div className="flex mb-10">
            <div className="">
            <img src="./images/farmer.png" className="mr-10 my-auto object-none"></img>

            </div>
            <div>
                <div>
                    <div>
                    <p className="w-fit mx-3 font-bold text-4xl text-center text-primary font-comfortaa pt-4  ">Serene Farm</p>

                    </div>
                    <div className="flex my-5">
                        <div className="flex items-center mx-3">
                        <FontAwesomeIcon icon={faLocationDot}  style={{ color: "brown" }}/>
                        <p className="text-darkGray font-comfortaa px-3 ">{location}</p>
                        </div>
                        <div className="flex items-center mx-3">
                        <FontAwesomeIcon icon={faChartPie}  style={{ color: "grey" }}/>
                        <p className="text-darkGray font-comfortaa px-3 ">{area} Acres</p>
                        </div>
                    </div>
                </div>
                <div className="my-20">

                <FarmerDefaultCard farmerName={"Dibyam Kumar"} farmerEmail={"Dibyam999@gmail.com"} />
                </div>
                <p className="w-fit mx-3 font-bold text-2xl text-center text-primary font-comfortaa pt-4  ">Crops</p>
                {cropList}
            </div>
        </div>
        </div>
    </div>
  );
}
