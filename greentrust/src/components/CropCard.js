import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faSeedling } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Info from "./Info";

export default function CropCard({ cropDetails }) {
  console.log(cropDetails, "This is crop details")
  let details = JSON.parse(cropDetails.details);
  const sowedOn = new Date(details.sowedOn * 1000).toLocaleDateString();
  return (
    <Link href={`/farm/${cropDetails.farmId}/crop/${cropDetails.id}`}>
      <div className="flex flex-col gap-2.5 py-6 px-5 shadow-lg rounded-2xl w-full hover:scale-105">
        <Info icon={faSeedling} text={details.name} style="text-brown !w-[32px] !h-[32px]" textStyle="font-semibold text-xl" />
        <Info icon={faCalendarDays} text={sowedOn} style="text-gray !w-[18px] !h-[18px]" iconDivStyle="w-[32px]" textStyle="!text-gray font-bold" />
      </div>
    </Link>
  );
}
