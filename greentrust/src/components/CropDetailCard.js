import classes from "../style";

import { IoAlertCircleSharp } from "@react-icons/all-files/io5/IoAlertCircleSharp";
import { RiPlantLine } from "@react-icons/all-files/ri/RiPlantLine";
import { BiRupee } from "@react-icons/all-files/bi/BiRupee";
import { BiCalendar } from "@react-icons/all-files/bi/BiCalendar";
import { AiOutlineHistory } from "@react-icons/all-files/ai/AiOutlineHistory";
import { HiLocationMarker } from "@react-icons/all-files/hi/HiLocationMarker";

const CropDetailCard = ({
  cropName,
  farmName,
  stakeAmount,
  date,
  location,
  timeToMature,
}) => {
  return (
    <div className="w-72 flex-none bg-white rounded-lg shadow-lg mr-6 p-4">
      <div className="flex flex-col justify-evenly">
        <div className="flex justify-between">
          <p className="text-xl font-bold text-gray-800 font-comfortaa">
            {farmName}
          </p>
          <IoAlertCircleSharp className="text-red-600"/>
        </div>
        <hr className="mt-2"/>
        <div className="flex mt-2">
          <RiPlantLine className="text-yellow-900" />&nbsp;
          <p className={`${classes.heading2}`}>{cropName}</p>
        </div>
        <div className="flex mt-2">
          <BiRupee className="text-primary" />&nbsp;
          <p className={`${classes.paragraph}`}>{stakeAmount} </p>
        </div>
        <div className="flex mt-2">
          <BiCalendar className="text-darkGray" />&nbsp;
          <p className={`${classes.paragraph}`}>{date}</p>
        </div>
        <div className="flex mt-2">
          <AiOutlineHistory className="text-darkGray" />&nbsp;
          <p className={`${classes.paragraph}`}>{timeToMature}</p>
        </div>
        <div className="flex mt-2">
          <HiLocationMarker className="text-red-600" />&nbsp;
          <p className={`${classes.paragraph}`}>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default CropDetailCard;
