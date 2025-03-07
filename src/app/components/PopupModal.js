import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  IconButton,
  Box,
  Typography,
  Input,
  Grid,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { MuiTelInput } from "mui-tel-input";

export default function PopupModal() {
  const [open, setOpen] = useState(true);
  const fonts = useSelector((state) => state.font);
  const [phone, setPhone] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
  };

  const handlePhoneChange = (newValue) => {
    console.log("Phone value:", newValue);
    setPhone(newValue);
    setValue("phone", newValue, { shouldValidate: true });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 550, // Desktop width
          padding: 3,
          boxShadow: 24,
          backgroundColor: "white",
          position: "relative",
          borderRadius: 2,
          overflow: "hidden",
          "@media (max-width: 600px)": {
            maxWidth: "95%", // Full width on mobile
            padding: 2,
          },
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Customer Name */}
          <Grid container spacing={1} mt={2}>
            <Grid item xs={12} sm={12}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
                }}
              >
                Customer Name:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Input
                {...register("customerName", {
                  required: "Customer name is required",
                })}
                placeholder="Enter Name"
                fullWidth
              />
              {errors.customerName && (
                <Typography color="error">{errors.customerName.message}</Typography>
              )}
            </Grid>
          </Grid>

          {/* Style Consultant Id */}
          <Grid container spacing={1} mt={2}>
          <Grid item xs={12} sm={12}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
                }}
              >
                Consultant Id:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Input
                {...register("styleConsultantId", {
                  required: "Consultant ID is required",
                })}
                placeholder="Enter Consultant Id"
                fullWidth
              />
              {errors.styleConsultantId && (
                <Typography color="error">{errors.styleConsultantId.message}</Typography>
              )}
            </Grid>
          </Grid>

          {/* Mobile No */}
          <Grid container spacing={1} mt={2}>
            <Grid item xs={12} sm={12}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
                }}
              >
                Mobile No:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <MuiTelInput
                size="small"
                value={phone}
                defaultCountry="AE"
                fullWidth
                onChange={handlePhoneChange}
              />
              {errors.phone && (
                <Typography color="error">{errors.phone.message}</Typography>
              )}
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button type="submit" size="large" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
