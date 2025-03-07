import useResponsive from "@/hooks/useResponsive";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { alpha } from "@mui/material/styles";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      })}
      direction="down"
      ref={ref}
      {...props}
    />
  );
});
const DialogBox = ({ open, handleClose, children }) => {
  const isDownSm = useResponsive("down", "md");

  return (
    <Dialog
      fullScreen
      scroll="paper"
      open={isDownSm ? false : open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={(theme) => ({
        "&.MuiDialog-root": {
          zIndex: 1199,
          "& .MuiDialog-paper": {
            backgroundColor: alpha(theme.palette.common.black, 0.5),
            borderRadius: "0px!important",
          },
        },
      })}
    >
      {children}
    </Dialog>
  );
};

export default DialogBox;
