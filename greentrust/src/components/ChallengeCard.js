import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import {callContract, getChallengeStatus, getChallengeStatusCode} from "@/utils";

import Info from "@/components/Info";


export default function ChallengeCard({ challenge, type ,auth=null }) {
  return (
    <div>
      <div className="flex-none bg-white rounded-lg shadow-lg mr-6 p-4 w-full">
        <div className="flex flex-col justify-evenly py-4 px-10">
          <div className="flex justify-between border-b-[1.5px] border-darkGray mb-5">
            <p className="text-xl font-bold text-gray/80 font-comfortaa text-justify py-2.5">
              {challenge.desc}
            </p>
          </div>
          <div className="flex justify-between">
          <a className="" href="">
            <Info text="Supporting Documents" icon={faFolder} style="text-blue" textStyle="!text-blue" />
          </a>
          {type}?<p className="text-darkGray font-comforta">getChallengeStatus(challenge.status)</p>:<div></div>
          {(type == 1)}?<button className="bg-blue text-white font-comfortaa font-bold py-2 px-4 rounded" onClick={() => callContract('claimChallenge', [challenge.id], auth)}>Accept</button>:<div></div>
          {(type == 0)}?
          <div className="flex ">
            <button className="bg-blue text-white font-comfortaa font-bold py-2 px-4 rounded" onClick={() => callContract('giveVerdict', [challenge.id, getChallengeStatusCode("ACCEPTED")], auth)}>Accept</button>
            <button className="bg-blue text-white font-comfortaa font-bold py-2 px-4 rounded" onClick={() => callContract('giveVerdict', [challenge.id,  getChallengeStatusCode("REJECTED")], auth)}>Reject</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
