import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, } from "@fortawesome/free-solid-svg-icons";

export default function PendingChallenge() {
  return (
    <div>
      <div className="w-80 flex-none bg-white rounded-lg shadow-lg mr-6 p-4">
        <div className="flex flex-col justify-evenly">
          <div className="flex justify-between">
            <p className="text-base font-normal text-gray-800 font-comfortaa">
              Lörem ipsum trav sohyvis är dung respektive prerade. Diapänat den.
              Ahet speck. Doning trenar mavis. Osk stereoform innan rär suvis
              liksom krovis. Brattig smygflyga. Bioränat labårar att vuhojas
              dehönining.
            </p>
          </div>
          <hr className="my-5" />
          <div className="flex justify-center">
            <a className="text-base text-semibold text-center font-comfortaa text-blue-800">
              <FontAwesomeIcon
              icon={faFolder}
              style={{ color: "blue-100" }}
              className="mr-4"
            />

              Supporting Documents
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
