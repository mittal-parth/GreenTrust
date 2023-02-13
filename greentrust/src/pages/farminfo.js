import CropList from "@/components/CropCard";
import CropCard from "@/components/CropCard";

export default function FarmInfo({ farmName, StakedDetails }) {
  var cropDetails = new Map([
    ["cropName", "Barley"],
    ["sowingDate", "Feb 13th, 2020"],
  ]);

  var cropDetailsList = [cropDetails, cropDetails, cropDetails, cropDetails, cropDetails, cropDetails, cropDetails];
  return (
    <div className="bg-white w-full overflow-hidden h-screen">
      
      <CropList cropDetailsList={cropDetailsList} />
    </div>
  );
}
