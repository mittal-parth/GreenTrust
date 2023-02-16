import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faSeedling } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function CropCard({ cropDetails }) {
  let details = JSON.parse(cropDetails.details);
  return (
    <Link href={`/farm/${cropDetails.farmId}/crop/${cropDetails.id}`}>
      <div className="rounded-[10px] shadow-xl flex justify-center items-center w-fit mx-3 px-3">
        <div className=" my-6 space-y-3 ">
          <div className="flex flex-row items-center">
            <FontAwesomeIcon icon={faSeedling} style={{ color: "brown" }} />
            <p className="font-comfortaa font-bold text-xl text-darkGray ml-3">
              {details.name}
            </p>
          </div>
          <div className="flex flex-row">
            <FontAwesomeIcon icon={faCalendarDays} style={{ color: "black" }} />
            <p className="font-comfortaa font-bold  text-sm text-darkGray ml-3">
              {details.sowedOn}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
