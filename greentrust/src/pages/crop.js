import SensorCard from "@/components/SensorCard";
import FarmerDefaultCard from "@/components/FarmerInfoCard";

import classes from "../style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faChartPie,
  faQrcode,
  faCircleXmark,
  faHandshake,
  faPrayingHands,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import PendingChallenge from "@/components/pendingChallenge";
import StakeHolders from "@/components/StakeHolders";

const Crop = () => {
  var stateAmount = 100;
  var sensorDetails = new Map([
    ["sensorName", "NPK"],
    ["sensorId", "j12o3asdasdj12i3"],
  ]);
  var area = 100;
  var location = "Assam";
  var sensorDetailsList = Array(8).fill(sensorDetails);

  var element = sensorDetailsList.map((sensorDetails) => {
    return <SensorCard sensorDetails={sensorDetails} />;
  });

  var sensorList = (
    <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3">
      {element}
    </div>
  );
  var location = "Assam";
  var area = "100";
  return (
    <div>
      <div className="mt-10">
        <p className="font-comfortaa font-bold text-4xl text-darkPrimary pb-15">
          Crop Info
        </p>
        <div className="flex flex-col md:flex-row mb-10 justify-around">
          <img
            src="./images/plant.png"
            className="mr-10 my-auto object-none hidden md:block"
          ></img>

          <div className="mt-4">
            <div>
              <div className="flex justify-between items-center pt-4">
                <div className="flex items-center">
                  <p className=" font-bold text-3xl text-center text-primary font-comfortaa">
                    Barley &nbsp;
                  </p>
                  <FontAwesomeIcon
                    icon={faQrcode}
                    style={{ color: "black" }}
                    size="2x"
                  />
                </div>
                <div>
                  <Button
                    text="Challenge"
                    icon={faCircleXmark}
                    color={"bg-red-600"}
                  />
                </div>
              </div>
              <div className="flex my-5">
                <div className="flex items-center mx-3">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: "brown" }}
                  />
                  <p className="text-darkGray font-comfortaa px-3">
                    {location}
                  </p>
                </div>
                <div className="flex items-center mx-3">
                  <FontAwesomeIcon
                    icon={faChartPie}
                    style={{ color: "grey" }}
                  />
                  <p className="text-darkGray font-comfortaa px-3">
                    {area} Acres
                  </p>
                </div>
              </div>
            </div>
            <div className="my-10">
              <FarmerDefaultCard
                farmerName={"Dibyam Kumar"}
                farmerEmail={"Dibyam999@gmail.com"}
              />
            </div>
            <p className="w-fit mx-3 font-bold text-2xl text-center text-primary font-comfortaa pt-4  ">
              Crops
            </p>
            {sensorList}
            <StakeHolders />
            <div className="mx-3">
              <div className="flex mt-10">
                <Button text="Stake" icon={faHandshake} color={"bg-primary"} />
                <Button
                  text="Request Stakes"
                  icon={faPrayingHands}
                  color={"bg-primary"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8 mt-16">
          <p className="font-comfortaa font-bold text-3xl text-darkPrimary pb-15 my-10">
            Pending Challenges
          </p>
          <PendingChallenge />
        </div>
      </div>
    </div>
  );
};

export default Crop;
