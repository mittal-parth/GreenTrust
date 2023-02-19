import Link from "next/link";

import { faPagelines } from "@fortawesome/free-brands-svg-icons";
import { faCalendarDays, faDollarSign, faLocationDot, faStopwatch20 } from "@fortawesome/free-solid-svg-icons";

import { STAKE_DURATION } from "@/config";
import Info from "@/components/Info";


const CropDetailCard = ({ stake, full=true }) => {
  let cropDetails = JSON.parse(stake.crop.details);
  let sowedOn = new Date(cropDetails.sowedOn * 1000)
  let sowedOnDate = sowedOn.toLocaleDateString();

  let timeToMature = (parseInt(sowedOn.getMonth()) + parseInt(cropDetails.duration) + STAKE_DURATION);

  return (
    <Link href={`/farm/${stake.farm.id}/crop/${stake.cropId}`} >
      <div className="p-6 w-full max-w-72 flex-none bg-white rounded-xl shadow-lg mr-6 hover:scale-[101%]">
        <div className="flex flex-col justify-evenly">
          {full && <div className="flex justify-between">
            <p className="text-xl font-bold text-gray-800 font-comfortaa whitespace-nowrap text-ellipsis overflow-hidden" title={stake.farm.name}>
              {stake.farm.name}
            </p>
          </div>}
          {full && <hr className="my-2" />}
          <section className="flex flex-col gap-1 font-medium">
            <Info text={cropDetails.name} icon={faPagelines} style="text-brown" />
            {full && <Info text={`${parseInt(stake.crop.stakeAmount._hex)}/- staked`} icon={faDollarSign} style="text-primary" textStyle="text-primary" />
            }<Info text={sowedOnDate} icon={faCalendarDays} />
            <Info text={`${timeToMature}M (to mature)`} icon={faStopwatch20} />
            <Info text={stake.farm.location} icon={faLocationDot} style="text-red" />
          </section>
        </div>
      </div>
    </Link>
  );
};

export default CropDetailCard;
