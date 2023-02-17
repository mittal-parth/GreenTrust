import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

import Info from "@/components/Info";


export default function ChallengeCard({ challenge }) {
  return (
    <div>
      <div className="flex-none bg-white rounded-lg shadow-lg mr-6 p-4 w-full">
        <div className="flex flex-col justify-evenly py-4 px-10">
          <div className="flex justify-between border-b-[1.5px] border-darkGray mb-5">
            <p className="text-xl font-bold text-gray/80 font-comfortaa text-justify py-2.5">
              {challenge.desc}
            </p>
          </div>
          <a className="" href="">
            <Info text="Supporting Documents" icon={faFolder} style="text-blue" textStyle="!text-blue" />
          </a>
        </div>
      </div>
    </div>
  );
}
