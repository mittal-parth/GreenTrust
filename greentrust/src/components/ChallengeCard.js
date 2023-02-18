import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import {contractCall, getChallengeStatus, getChallengeStatusCode, getStatusColor} from "@/utils";
import { useContext, useEffect } from "react";
import { LoaderContext } from "@/context/loaderContext";
import Info from "@/components/Info";
import Popover from '@mui/material/Popover';
import { SnackbarContext } from "@/context/snackbarContext";
import CropDetailModal from "./CropDetailModal";


export default function ChallengeCard({ challenge, type , auth }) {
  const { loading, setLoading } = useContext(LoaderContext);
  const [cropData, setCropData] = React.useState(null);
  
  
  
 

  
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

  const colour = getChallengeStatus(challenge.status) == "Open" ? "bg-yellow" : "bg-red";
  console.log("debug200",(challenge))
  return (
    
    <div>
      <div className={"  relative flex-none bg-white border-l-4 rounded-lg shadow-lg mr-6 p-4 w-full "+ getStatusColor(challenge.status)}>
        <div className="absolute top-2 right-2">
          <CropDetailModal cropId={parseInt(challenge.challenged._hex)} />
          
          </div>
      
        <div className="flex flex-col justify-evenly py-4 px-10">
          <div className="flex justify-between border-b-[1.5px] border-darkGray mb-5">
            <p className="text-xl font-bold text-gray/80 font-comfortaa text-justify py-2.5">
              {challenge.description || "Crop is unhealthy"}
            </p>
          </div>
          <div className="flex flex-col justify-between">
          <a className="" href="">
           
      <div>
     
        <Info text="Supporting Documents" icon={faFolder} style="text-blue" textStyle="!text-blue"  />
      
      
    </div>  
          </a>
          
          {(type == 1)&&<button className="bg-blue bg-darkPrimary text-white font-comfortaa w-fit font-bold py-2 px-4 rounded" onClick={async () => {await handleOnClick(1)}}>Accept</button>}
          {(type == 0)&&
          <div className="flex space-x-2">
            <button className="bg-darkPrimary text-white font-comfortaa font-bold py-2 px-4 w-fit rounded" onClick={async () => await  handleOnClick(2)}>Approve</button>
            <button className="bg-red text-white font-comfortaa font-bold py-2 px-6 w-fit rounded" onClick={async () => await  handleOnClick(3)}>Reject</button>
          </div>}
          
          </div>
        </div>
      </div>
    </div>
  );
}

