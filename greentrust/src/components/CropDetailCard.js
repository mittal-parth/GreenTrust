import classes from "../style";

import { IoAlertCircleSharp } from "@react-icons/all-files/io5/IoAlertCircleSharp";
import { RiPlantLine } from "@react-icons/all-files/ri/RiPlantLine";
import { BiRupee } from "@react-icons/all-files/bi/BiRupee";
import { BiCalendar } from "@react-icons/all-files/bi/BiCalendar";
import { AiOutlineHistory } from "@react-icons/all-files/ai/AiOutlineHistory";
import { HiLocationMarker } from "@react-icons/all-files/hi/HiLocationMarker";
import { STAKE_DURATION } from "@/config";

const CropDetailCard = ({stake}) => {
  let cropDetails = JSON.parse(stake.crop.details);
  let sowedOn = new Date(cropDetails.sowedOn * 1000)
  let sowedOnDate = sowedOn.toLocaleDateString();
  console.log("debug",sowedOn, "Sowed oin")

  let timeToMature = (parseInt(sowedOn.getMonth()) + parseInt(cropDetails.duration) + STAKE_DURATION);
  console.log(stake)
  return (
    <div className="w-72 flex-none bg-white rounded-lg shadow-lg mr-6 p-4">
      <div className="flex flex-col justify-evenly">
        <div className="flex justify-between">
          <p className="text-xl font-bold text-gray-800 font-comfortaa">
            {stake.farm.name}
          </p>
          <IoAlertCircleSharp className="text-red-600"/>
        </div>
        <hr className="mt-2"/>
        <div className="flex mt-2">
          <RiPlantLine className="text-yellow-900" />&nbsp;
          <p className={`${classes.heading2}`}>{cropDetails.name}</p>
        </div>
        <div className="flex mt-2">
          <BiRupee className="text-primary" />&nbsp;
          <p className={`${classes.paragraph}`}>{parseInt(stake.crop.stakeAmount._hex)} </p>
        </div>
        <div className="flex mt-2">
          <BiCalendar className="text-darkGray" />&nbsp;
          <p className={`${classes.paragraph}`}>{sowedOnDate}</p>
        </div>
        <div className="flex mt-2">
          <AiOutlineHistory className="text-darkGray" />&nbsp;
          <p className={`${classes.paragraph}`}>{timeToMature}</p>
        </div>
        <div className="flex mt-2">
          <HiLocationMarker className="text-red-600" />&nbsp;
          <p className={`${classes.paragraph}`}>{stake.farm.location}</p>
        </div>
      </div>
    </div>
  );
};

export default CropDetailCard;
