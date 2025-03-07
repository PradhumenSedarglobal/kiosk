import React from "react";
import { AlertContext } from "./alertContext";
import dynamic from "next/dynamic";
import Alert from "@mui/material/Alert";

const AlertProvider = ({ children }) => {
  const [showAlert, setShowAlertMessage] = React.useState({
    open: false,
    message: "",
    variant: "contained",
    color: "primary",
    severity: "primary",
  });
  const [MuiAlert, setMuiAlert] = React.useState("");
  React.useEffect(() => {
    if (showAlert?.open) {
      setMuiAlert(
        <Alert
          severity={showAlert?.severity}
          variant={showAlert.variant}
          color={showAlert?.color}
          onClose={() => {
            setShowAlertMessage({
              open: false,
              message: "",
              variant: "contained",
              color: "primary",
              severity: "primary",
            });
          }}
          sx={{
            "& .MuiAlert-message": {
              fontFamily: (theme) => theme.fontFaces.helveticaNeue,
            },
          }}
        >
          {showAlert?.message}
        </Alert>
      );
      setTimeout(() => {
        setShowAlertMessage({
          open: false,
          message: "",
          variant: "contained",
          color: "primary",
          severity: "primary",
        });
        setMuiAlert("");
      }, 3000);
    }
  }, [showAlert]);

  const showAlertMessage = ({ message, variant, color, severity }) => {
    setShowAlertMessage({
      open: true,
      message: message,
      variant: variant ? variant : "contained",
      color: color ? color : "primary",
      severity: severity ? severity : "primary",
    });
  };

  return (
    <>
      <AlertContext.Provider value={{ showAlertMessage, MuiAlert }}>
        {children}
      </AlertContext.Provider>
    </>
  );
};

export default AlertProvider;
