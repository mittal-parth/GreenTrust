import React from "react";
import { contractCall } from "@/utils";
import { useContext, useEffect } from "react";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import Popover from '@mui/material/Popover';
import CropDetailCard from "./CropDetailCard";
import Info from "@/components/Info";
import { useAuth } from "@/auth/useAuth";

import { LoaderContext } from "@/context/loaderContext";
export default function CropDetailModal(cropId) {
  const auth = useAuth();
  const { loading, setLoading } = useContext(LoaderContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cropData, setCropData] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  const open = Boolean(anchorEl);

  let data = {};
  async function getCropDetails() {

    console.log("debug1", auth.isLoggedIn)
    //   let res = await contractCall(auth, "crops", [parseInt(challenge.challenged._hex)])
    try {
      console.log("debug100", cropId)
      let res = await contractCall(auth, "crops", [cropId.cropId])

      data.crop = res.data

      res = await contractCall(auth, "farms", [parseInt(res.data.id._hex)])
      data.farm = res.data;
      console.log("debug22 ", data);

      setCropData(data)
    } catch (err) { console.log("error", err) }
  }

  useEffect(() => {
    console.log("debug2", auth.user)
    if (auth.user) {
      getCropDetails()

    }
  }, [auth?.user])


  return (
    <div>
      <div
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Info text="" icon={faInfo} style="text-black" textStyle="!text-blue" aria-owns={open ? 'mouse-over-popover' : null} aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose} />
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div sx={{ p: 1 }}><div>
          <CropDetailCard stake={cropData} full={false} />
        </div></div>
      </Popover>
    </div>
  )
}