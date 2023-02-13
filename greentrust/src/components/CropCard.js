import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default function CropCard({ cropDetails }) {
  return (
    <div className="rounded-[20px]  shadow-xl flex justify-center items-center w-fit">
      <div className="px-7 py-5 space-y-3">
        <div className="flex flex-row ">
          <img src="./images/mdi_plant-outline.png" className="mr-5"></img>
          {/* <FontAwesomeIcon icon="fa-solid fa-calendar-days" /> */}
          {/* <i className="fa-solid fa-seedling"></i> */}
          <p className="font-comfortaa font-bold text-xl text-darkGray ">
            {cropDetails.get("cropName")}
          </p>
        </div>
        <div className="flex flex-row">
          <img src="./images/mdi_plant-outline.png" className=" mr-5"></img>
          <p className="font-comfortaa font-bold  text-sm text-darkGray ">
            {cropDetails.get("sowingDate")}
          </p>
        </div>
      </div>
    </div>
  );
}
