import Info from "@/components/Info";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


const FarmCard = ({ farm }) => {
  let documents = JSON.parse(farm.documents);

  return (
    <Link href={`/farm/${farm.id}`} >
      <div className="w-full !max-w-[280px] bg-white rounded-xl shadow-lg overflow-clip hover:scale-[101%] aspect-[350/409] mr-8">
        <div className="h-[70%]">
          <img className="object-cover h-full w-full" src={documents.farmImage == null ?"images/farm.png" : "https://ipfs.io/ipfs/" + documents.farmImage} alt="avatar" />
        </div>
        <div className="px-6 flex flex-col justify-center items-center h-[30%]">
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
