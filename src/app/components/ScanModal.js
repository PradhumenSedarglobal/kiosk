"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// MUI Components
import Modal from "@mui/material/Modal";
import { Grid, Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

// Scan QR Package
import { QrReader } from "react-qr-reader";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { showScanner } from "@/redux/slices/scannerSlice";

export default function ScanModal() {
  const [scaner, setScaner] = useState(false);
  const [open, setOpen] = React.useState(true);
  const [data, setData] = useState(null);
  const router = useRouter();
  const modalRef = useRef();

  // Redux
  const fonts = useSelector((state) => state.font);
  const dispatch = useDispatch();

  const handleManualClick = () => {
    setOpen(false);
  };

  const handleBarCodeClick = () => {
    setScaner(true);
  };

  useEffect(() => {
    if (data !== null) {
      router.push(data);
    }
  }, [data]);

  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={(_event, reason) => {
          if (reason && reason === "backdropClick") return;
          setOpen(false);
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            borderRadius: "md",
            p: 3,
            boxShadow: 24,
            overflow: "auto",
            backgroundColor: "white",
            position: "relative",
          }}
        >
          <IconButton
            ref={modalRef}
            onClick={() => dispatch(showScanner(false))}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ pt: 4 }}
          >
            <Grid item xs={6} md={6} display="flex" justifyContent="center">
              {scaner ? (
                <Box sx={{ width: "400px", maxWidth: 400 }}>
                  <QrReader
                    constraints={{ facingMode: "environment" }}
                    onResult={(result, error) => {
                      if (result) setData(result.text);
                      if (error) console.error(error);
                    }}
                    style={{ width: "200px", height: "200px" }}
                  />
                </Box>
              ) : (
                <Card
                  onClick={handleBarCodeClick}
                  variant="outlined"
                  sx={{
                    width: "100%",
                    maxWidth: 200,
                    textAlign: "center",
                    alignItems: "center",
                    
                  }}
                >
                  <img
                    height={128}
                    width={128}
                    src="/scanner.png"
                    loading="lazy"
                    alt="Scan QR Code"
                    style={{ maxWidth: "100%", objectFit: "contain",margin:"auto",padding:"5px 0px" }}
                  />
                  <CardContent>
                    <Typography
                      sx={{ fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily, fontSize: "smaller" }}
                      level="title-md"
                    >
                      Scan a product
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {!scaner && (
              <Grid item xs={6} md={6} display="flex" justifyContent="center">
                <Card
                  onClick={() => handleManualClick()}
                  variant="outlined"
                  sx={{
                    width: "100%",
                    maxWidth: 200,
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    height={110}
                    width={110}
                    src="/manual.png"
                    loading="lazy"
                    alt="Build Product"
                    style={{ maxWidth: "100%", objectFit: "contain",margin:"auto" }}
                  />
                  <CardContent>
                    <Typography
                      sx={{ fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily, fontSize: "smaller" }}
                      level="title-md"
                    >
                      Build your product
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
