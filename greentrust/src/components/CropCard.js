 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faSeedling } from "@fortawesome/free-solid-svg-icons";

export default function CropCard({ cropDetails }) {
  return (
    <div className="rounded-[20px]  shadow-xl flex justify-center items-center w-fit mx-3 px-3">
      <div className=" my-6 space-y-3 ">
        <div className="flex flex-row items-center">
        <FontAwesomeIcon icon={faSeedling}  style={{ color: "brown" }}/>
          <p className="font-comfortaa font-bold text-xl text-darkGray ml-3">
            {cropDetails.get("cropName")}
          </p>
        </div>
        <div className="flex flex-row">
          <FontAwesomeIcon icon={faCalendarDays} style={{ color: "black" }}/>
          <p className="font-comfortaa font-bold  text-sm text-darkGray ml-3">
            {cropDetails.get("sowingDate")}
          </p>
        </div>
      </div>
    </div>
  );
}
