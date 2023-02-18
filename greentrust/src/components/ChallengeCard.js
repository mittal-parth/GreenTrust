import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import {contractCall, getChallengeStatus, getChallengeStatusCode} from "@/utils";
import { useContext } from "react";
import { LoaderContext } from "@/context/loaderContext";
import Info from "@/components/Info";

import { SnackbarContext } from "@/context/snackbarContext";


export default function ChallengeCard({ challenge, type , auth }) {
  const { loading, setLoading } = useContext(LoaderContext);
  console.log("debug 1234" , challenge)
  
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);
  const handleOnClick = async (type) => {
    // console.log("debug", auth.isLoggedIn)
    setLoading(true)
    try{
      let res;
      if(type == 1){
        res = await contractCall(auth , 'claimChallenge', [challenge.id])
      }else if(type == 2){
        res = await contractCall(auth,'giveVerdict', [challenge.id, getChallengeStatusCode("SUCCESSFUL")] )
      }else{
        res = await contractCall(auth,'giveVerdict', [challenge.id,  getChallengeStatusCode("REJECTED")])
      }
      console.log(res);

    }catch(err){
      console.log(err);

      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: "Transaction Failed",
    });

    }
  setLoading(false)
  }
  return (
    <div>
      <div className="flex-none bg-white rounded-lg shadow-lg mr-6 p-4 w-full">
        <div className="flex flex-col justify-evenly py-4 px-10">
          <div className="flex justify-between border-b-[1.5px] border-darkGray mb-5">
            <p className="text-xl font-bold text-gray/80 font-comfortaa text-justify py-2.5">
              {challenge.description}
            </p>
          </div>
          <div className="flex justify-between">
          <a className="" href="">
            <Info text="Supporting Documents" icon={faFolder} style="text-blue" textStyle="!text-blue" />
          </a>
          {type?<p className="text-darkGray font-comforta">{getChallengeStatus(challenge.status)}</p>:<div></div>}
          {(type == 1)&&<button className="bg-blue text-white font-comfortaa font-bold py-2 px-4 rounded" onClick={async () => {await handleOnClick(1)}}>Accept</button>}
          {(type == 0)&&
          <div className="flex space-x-2">
            <button className="bg-blue text-white font-comfortaa font-bold py-2 px-4 rounded" onClick={async () => await  handleOnClick(2)}>Approve</button>
            <button className="bg-blue text-white font-comfortaa font-bold py-2 px-4 rounded" onClick={async () => await  handleOnClick(3)}>Reject</button>
          </div>}
          
          </div>
        </div>
      </div>
    </div>
  );
}
