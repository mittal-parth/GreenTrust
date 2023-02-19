import * as React from "react";

import Typography from "@mui/material/Typography";
import PopupState, {
  bindPopover,
  bindHover
} from "material-ui-popup-state";
import HoverPopover from "material-ui-popup-state/HoverPopover";


export default function Modal({anchor, popover}) {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <div {...bindHover(popupState)}>
            {anchor}
          </div>
          <HoverPopover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
          >
            <div className="overflow-hidden">
                {popover}
            </div>
          </HoverPopover>
        </div>
      )}
    </PopupState>
  );
}
