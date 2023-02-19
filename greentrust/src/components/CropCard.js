import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faSeedling } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Info from "./Info";
import { getStatusCode } from "@/utils";
import StatusCard from "./StatusCard";

const CHALLENGE_STATUS_COLOR_MAP = {
  0: 'bg-primary',
  1: 'bg-yellow',
  2: 'bg-blue'
}

export default function CropCard({ cropDetails }) {
  console.log(cropDetails, "This is crop details")
  let details = JSON.parse(cropDetails.details);
  details.status = cropDetails.status;

  const sowedOn = new Date(details.sowedOn * 1000).toLocaleDateString();
  console.log("debug1902" , details)
  return (
    <Link href={`/farm/${cropDetails.farmId}/crop/${cropDetails.id}`}>
      <div className="relative flex flex-col gap-2.5 py-6 px-5 shadow-lg rounded-2xl w-full hover:scale-105">
        <div className="flex flex-row justify-between items-center">
          <Info icon={faSeedling} text={details.name} style="text-brown !w-[32px] !h-[32px]" textStyle="font-semibold text-xl overflow-hidden whitespace-nowrap" />
          <StatusCard text={getStatusCode(details.status)} color={CHALLENGE_STATUS_COLOR_MAP[details.status]} />
        </div>
        <Info icon={faCalendarDays} text={sowedOn} style="text-gray !w-[18px] !h-[18px]" iconDivStyle="w-[32px]" textStyle="!text-gray font-bold" />
      </div>
    </Link>
  );
}
