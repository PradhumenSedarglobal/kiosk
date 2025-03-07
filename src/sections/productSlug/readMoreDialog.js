import Iconify from "@/components/iconify";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ReadMoreDialog({ open, setOpen, data, title }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <IconButton
          size="small"
          onClick={handleClose}
          sx={{
            position: "absolute",
            zIndex: 2,
            cursor: "pointer",
            right: 10,
            top: 10,
            backgroundColor: "#84848496",
            ":hover": {
              backgroundColor: "#84848496",
            },
          }}
        >
          <Iconify icon="gridicons:cross" />
        </IconButton>
        <Box px={4} py={2}>
          <Typography
            component="div"
            sx={(theme) => ({
              borderLeft: (theme) => `2px solid ${theme.palette.primary.main}`,
              pl: 2,
              fontSize: "19.2px",
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              color: theme.palette.common.black,
            })}
          >
            {title}
          </Typography>
        </Box>
        <Divider />
        <Box py={2} px={4}>
          <Typography sx={(theme) => ({
            fontSize: "14px",
            fontFamily: theme.fontFaces.helveticaNeue,
            color: theme.palette.common.black,

          })}>{data?.SC_MORE}</Typography>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
