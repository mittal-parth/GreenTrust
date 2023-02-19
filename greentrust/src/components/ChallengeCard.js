import { useContext, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import {
  contractCall,
  getChallengeStatus,
  getChallengeStatusCode,
  getStatusColor,
} from "@/utils";
import { useContext, useEffect } from "react";
import { LoaderContext } from "@/context/loaderContext";
import Info from "@/components/Info";
import Popover from "@mui/material/Popover";
import { faFolder, faInfo, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

import { contractCall, getChallengeStatus, getChallengeStatusCode, getStatusColor } from "@/utils";
import { SnackbarContext } from "@/context/snackbarContext";
import Modal from "@/components/Modal";
import Info from "@/components/Info";
import CropDetailCard from "@/components/CropDetailCard";
import IconButton from "@/components/IconButton";
import Button from "@/components/Button";
import { data } from "autoprefixer";
import SupportDocument from "./SupportDocument";

export default function ChallengeCard({ challenge, status, auth, full = true }) {
  console.log("challenge", challenge)
  const { loading, setLoading } = useContext(LoaderContext);
  const { snackbarInfo, setSnackbarInfo } = useContext(SnackbarContext);

  const [cropData, setCropData] = useState(null);

  const [stake, setStake] = useState(null);

  const handleOnClick = async (action) => {
    setLoading(true)

    try {
      let res;
      if (action == 1) {
        res = await contractCall(auth, 'claimChallenge', [challenge.id])
      } else if (action == 2) {
        res = await contractCall(auth, 'giveVerdict', [challenge.id, getChallengeStatusCode("SUCCESSFUL")])
      } else {
        res = await contractCall(auth, 'giveVerdict', [challenge.id, getChallengeStatusCode("REJECTED")])
      }
    } catch (err) {
      setSnackbarInfo({
        ...snackbarInfo,
        open: true,
        message: "Failure",
      });
    }
    setLoading(false)
  }

  async function getCropData() {
    const data = {};

    let res = await contractCall(auth, "crops", [parseInt(challenge?.challenged?._hex)]);
    data.crop = res.data;

    res = await contractCall(auth, "farms", [parseInt(res.data.id._hex)]);
    data.farm = res.data;

    setStake(data);
  }

  useEffect(() => {
    if(full) {
      getCropData();
    }
  }, [])

  return (<div>
    <div className={`flex-none bg-white rounded-lg shadow-lg mr-6 p-4 w-full border-l-4 ${getStatusColor(challenge.status)}`}>
      <div className="flex flex-col justify-evenly py-2 px-2">
        {full && <div className="flex justify-between mb-4 items-center">
          {stake && <p className="text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">{stake.farm.name}</p>}
          <Modal anchor={<div className="right-4 top-4"><IconButton icon={faInfo} styles="!bg-yellow !w-6 !h-6" /></div>} popover={<CropDetailCard stake={stake} full={false} />} ></Modal>
        </div>}
        <div className={`flex justify-between border-${full ? 'y' : 'b' }-[1.5px] border-darkGray mb-5`}>
          <p className="text-md font-bold text-gray/80 font-comfortaa text-justify py-2.5 h-24 overflow-hidden">
            {challenge.description}
          </p>
        </div>
        <a>
          <Modal anchor={<Info text="Supporting Documents" icon={faFolder} style="text-blue" textStyle="!text-blue" />} popover={<SupportDocument documents={challenge.documents ? JSON.parse(challenge.documents).proofs : ""}/>} />
        </a>
        <div className={`${full ? "mt-4" : ""} flex-row flex gap-2`}>
          {status == 0 && <Button text="Accept" styles="text-sm px-6 py-2" onClick={() => handleOnClick(1)} />}
          {status == 1 && <>
            <IconButton icon={faCheck} styles="!bg-primary" onClick={() => handleOnClick(2)} />
            <IconButton icon={faXmark} styles="!bg-red" onClick={() => handleOnClick(3)} />
          </>}
        </div>
      </div>
    </div>
  </div>);
}
