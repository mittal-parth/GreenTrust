import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder} from "@fortawesome/free-solid-svg-icons";

export default function PendingChallenge() {
  return (
    <div>
      <div className="w-80 flex-none bg-white rounded-lg shadow-lg mr-6 p-4">
        <div className="flex flex-col justify-evenly">
          <div className="flex justify-between">
            <p className="text-xl font-bold text-gray-800 font-comfortaa">
            Lörem ipsum trav sohyvis är dung respektive prerade. Diapänat den. Ahet speck. Doning trenar mavis. Osk stereoform innan rär suvis liksom krovis. Brattig smygflyga. Bioränat labårar att vuhojas dehönining. 
            </p>
          </div>
          <hr className="mt-5 h-10" />
          <div className="flex items-center ">
          <FontAwesomeIcon
            icon={faFolder}
            style={{ color: "blue-100" }}
            className="mr-4"
          />
            <p className="text-[1rem] font-comfortaa text-blue-800">
                Supporting Documents
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
