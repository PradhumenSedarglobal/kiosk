import SnackbarProvider from "@/components/snackbar/SnackbarProvider";
import useResponsive from "@/hooks/useResponsive";
import { CustomAuthDialog } from "@/styles/layouts";
import Slide from "@mui/material/Slide";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import React from "react";
import ForgotPassword from "./forgotPassword";
import Guest from "./guest";
import Login from "./login";
import Register from "./register";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AuthDialog = ({ open, handleClose }) => {
  const [state, setState] = React.useState("login");
  const [sectionStep, setSectionStep] = React.useState(0);
  const isDownMd = useResponsive("down", "md");
  const isUpMd = useResponsive("up", "md");

  const handleFormOpen = (value) => {
    setState(value);
  };

  const handleResetSectionStep = () => {
    setSectionStep(0);
  };

  const handlePopClose = () => {
    handleClose();
    setState("login");
    handleResetSectionStep();
  };

  const handleNextStep = () => {
    setSectionStep(sectionStep + 1);
  };

  const handlePreviousStep = () => {
    setSectionStep(sectionStep - 1);
  };

  switch (state) {
    case "login":
      return (
        <>
          <SnackbarProvider>
            <CustomAuthDialog
              open={open && isUpMd}
              TransitionComponent={Transition}
              keepMounted
              aria-describedby="alert-dialog-slide-description"
              fullWidth={true}
              maxWidth="xs"
              sx={{
                "& .MuiDialog-paper": {
                  maxWidth: {
                    md: "524px",
                    sm: "100%",
                    xs: "100%",
                    xxs: "100%",
                  },
                },
              }}
            >
              {isUpMd && (
                <Login
                  handleFormOpen={handleFormOpen}
                  handleClose={handlePopClose}
                />
              )}
            </CustomAuthDialog>

            <SwipeableDrawer
              sx={(theme) => ({
                [theme.breakpoints.up("md")]: {
                  display: "none",
                },
              })}
              anchor="bottom"
              open={open && isDownMd}
              onOpen={handleFormOpen}
              onClose={() => { }}
            >
              {isDownMd && (
                <Login
                  handleFormOpen={handleFormOpen}
                  handleClose={handlePopClose}
                />
              )}
            </SwipeableDrawer>
          </SnackbarProvider>
        </>
      );
      break;

    case "register":
      return (
        <>
          <SnackbarProvider>
            <CustomAuthDialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              aria-describedby="alert-dialog-slide-description"
              fullWidth={true}
              maxWidth="xs"
              sx={{
                "& .MuiDialog-paper": {
                  maxWidth: {
                    md: "524px",
                    sm: "100%",
                    xs: "100%",
                    xxs: "100%",
                  },
                },
              }}
            >
              <Register
                sectionStep={sectionStep}
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
                handleFormOpen={handleFormOpen}
                handleClose={handlePopClose}
                handleResetSectionStep={handleResetSectionStep}
              />
            </CustomAuthDialog>
            <SwipeableDrawer
              sx={(theme) => ({
                [theme.breakpoints.up("md")]: {
                  display: "none",
                },
              })}
              anchor="bottom"
              open={open}
              onClose={() => { }}
              onOpen={handleFormOpen}
            >
              <Register
                sectionStep={sectionStep}
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
                handleFormOpen={handleFormOpen}
                handleClose={handlePopClose}
                handleResetSectionStep={handleResetSectionStep}
              />
            </SwipeableDrawer>
          </SnackbarProvider>
        </>
      );
      break;

    case "forgetPassword":
      return (
        <SnackbarProvider>
          <CustomAuthDialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            fullWidth={true}
            maxWidth="xs"
            sx={{
              "& .MuiDialog-paper": {
                maxWidth: { md: "524px", sm: "100%", xs: "100%", xxs: "100%" },
              },
            }}
          >
            <ForgotPassword
              sectionStep={sectionStep}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
              handleFormOpen={handleFormOpen}
              handleClose={handlePopClose}
              handleResetSectionStep={handleResetSectionStep}
            />
          </CustomAuthDialog>
          <SwipeableDrawer
            sx={(theme) => ({
              [theme.breakpoints.up("md")]: {
                display: "none",
              },
            })}
            anchor="bottom"
            open={open}
            onClose={() => { }}
            onOpen={handleFormOpen}
          >
            <ForgotPassword
              sectionStep={sectionStep}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
              handleFormOpen={handleFormOpen}
              handleClose={handlePopClose}
              handleResetSectionStep={handleResetSectionStep}
            />
          </SwipeableDrawer>
        </SnackbarProvider>
      );
      break;
    case "guest":
      return (
        <SnackbarProvider>
          <CustomAuthDialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
            fullWidth={true}
            maxWidth="xs"
            sx={{
              "& .MuiDialog-paper": {
                maxWidth: {
                  md: "524px",
                  sm: "100%",
                  xs: "100%",
                  xxs: "100%",
                },
              },
            }}
          >
            <Guest
              handleFormOpen={handleFormOpen}
              handleClose={handlePopClose}
            />
          </CustomAuthDialog>

          <SwipeableDrawer
            sx={(theme) => ({
              [theme.breakpoints.up("md")]: {
                display: "none",
              },
            })}
            anchor="bottom"
            onClose={() => { }}
            open={open}
            onOpen={handleFormOpen}
          >
            <Guest
              handleFormOpen={handleFormOpen}
              handleClose={handlePopClose}
            />
          </SwipeableDrawer>
        </SnackbarProvider>
      );
      break;

    default:
      break;
  }
};

export default AuthDialog;
