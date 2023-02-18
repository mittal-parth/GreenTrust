import Info from "@/components/Info";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


const FarmCard = ({ farm }) => {
  return (
    <Link href={`/farm/${farm.id}`} >
      <div className="flex-none w-full !max-w-[280px] bg-white rounded-xl shadow-lg overflow-clip hover:scale-[101%] aspect-[350/409] z-0">
        <div className="h-[70%]">
          <img className="object-cover h-full w-full" src={"images/farm.png"} alt="avatar" />
        </div>
        <div className="px-6 flex flex-col justify-center items-center gap-2 h-[30%]">
          <div className="w-full" title={farm.name}>
            <p className="font-darkGray text-lg font-bold whitespace-nowrap text-ellipsis overflow-hidden text-center">
              {farm.name}
            </p>
          </div>
          <Info icon={faLocationDot} text={farm.location} style="text-red" />
        </div>
      </div>
    </Link>
  );
};

export default FarmCard;
