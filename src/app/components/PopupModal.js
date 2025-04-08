"use Client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import shortid from "shortid";
import * as THREE from "three";
import { getCookie, setCookie } from "cookies-next";


import {
  Modal,
  IconButton,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import {
  removecart,
  resetState,
  setCustomerSysId,
  setCustomerSystemId,
  setGeoLocationDetails,
  setOrderList,
} from "@/redux/slices/customization";
import { useAuthContext } from "@/auth/useAuthContext";
import axiosInstance from "@/utils/axios";
import { decrementStep } from "@/redux/slices/stepSlice";
//const { addToCartFunScene } = require("@/sections/product/customization/sceneCanvas3D");
// import { addToCartFunScene } from "@/sections/product/customization/sceneCanvas3D";
import { addToCartFunScene } from "@/sections/product/customization/addToCartFunScene";
import { NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES } from "@/utils/constant";
import { toast } from "react-toastify";
import { setStepIndex } from "@/redux/slices/tourSlice";
import { useRouter } from "next/router";

export default function PopupModal({ setAddToCartShow }) {
  const { state } = useAuthContext();
  const { cookies } = state;
  const { locale, query } = useRouter();
  const [open, setOpen] = useState(true);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fonts = useSelector((state) => state.font);
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const customization_info = useSelector((state) => state.customization);
  const customerSystemId = useSelector(
    (state) => state.customization.customerSystemId
  );
  const customization = useSelector(
    (state) => state.customization.customization
  );

  const ip = customization_info.ip;
  const geoDetails = customization_info.geoLocationDetails;

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const getCountry = async (val) => {
    try {
      const response = await axios.get(
        `https://api.sedarglobal.com/geolocation?geo=&client_ip=${ip}&locale=${locale}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      let getAllCookies = getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES)
        ? JSON.parse(
            getCookie(NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES) || "undefined"
          )
        : {};
      getAllCookies.locale = "uae-en";
      setCookie(
        "NEXT_SEDAR_PUBLIC_GET_ALL_COOKIES",
        JSON.stringify(getAllCookies),
        {
          path: "/", 
          maxAge: 60 * 60 * 24 * 7, 
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict", 
        }
      );


      dispatch(setGeoLocationDetails(response.data));

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      console.log("order head done");
    }
  };



  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setOpen(false);
    setAddToCartShow(false);
  };
  const handleSuccessClose = () => setSuccessOpen(false);
  const handleErrorClose = () => setErrorOpen(false);

  const fetchOrderList = async (customerId, userId) => {
    try {
      dispatch(setOrderList(null));

      const response = await axios.get(
        `https://migapi.sedarglobal.com/kiosk/order/orderList?lang=en&site=100001&country=uae&visitorId=${customerId}&userId=${userId}&currency=AED&ccy_decimal=0&cn_iso=AE&locale=${locale}&$detect_country=`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );

      if (response) {

        
     
        dispatch(
          setOrderList({
            complete: response.data.complete,
            cart_count: response.data.cart_count,
            total_price: response.data.total_price,
          })
        );

        dispatch(resetState());
      }


    } catch {}
  };

  const handlePhoneChange = (newValue) => {
    setPhone(newValue);
    setValue("phone", newValue, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
      
    if (!data.customerName || !data.styleConsultantId || !phone) {
      toast.error("Please fill all required fields before submitting.");
      return;
    }


    try {
      const formData = new FormData();
      formData.append("site", "100001");
      formData.append("lang", "en");
      formData.append("country", "IN");
      formData.append("cust_mobile_no", phone);
      formData.append("cust_first_name", data.customerName);
      formData.append("salesman", data.styleConsultantId);
      formData.append("visitorId", cookies.visitorId);

      const response = await axios.post(
        "https://migapi.sedarglobal.com/kiosk/sign_up",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );

      dispatch(setCustomerSysId(response.data.cust_sys_id));

      if (response.data.return_status === "-111") {
        setErrorMessage(
          response.error_message + "\n" + JSON.stringify(response, null, 2)
        );
        setErrorOpen(true);
      } else {
        getCountry();
        setSuccessOpen(true);
        handleClose();
        dispatch(setCustomerSystemId(response.data.cust_sys_id));

        if (response.data.cust_sys_id) {
          toast.success("Add to cart successfully!", {
            position: "top-right",
            style: {
              background: "linear-gradient(45deg,rgb(22, 160, 54),rgb(97, 238, 72))",
              color: "white",
            },
          });

          dispatch(setStepIndex(10));

          const handleAddToCart = async () => {
            try {
              const result = await addToCartFunScene(
                {
                  ...cookies,
                  ...customization_info,
                  locale: locale,
                  customerSysIdnew: response.data.cust_sys_id,
                  cart_status: "COMPLETED",
                },
                dispatch
              );
         
            } catch (error) {
              console.error("Failed to add to cart:", error);
            } finally {
              setTimeout(() => {
                dispatch(removecart());
                dispatch(decrementStep(0));
                fetchOrderList(cookies.visitorId, response.data.cust_sys_id);
              }, 2000);
            }
          };

          handleAddToCart();
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      setErrorOpen(true);
    }
  };

  return (
    <>
      {/* Form Modal */}
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
            maxWidth: 550,
            padding: 3,
            boxShadow: 24,
            backgroundColor: "white",
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
            "@media (max-width: 600px)": {
              maxWidth: "95%",
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
            <Grid container 
              sx={{
                paddingLeft: sm || xs ? "60px" : '',
              }} 
              spacing={2} mt={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: 700, textAlign: "right" }}>
                  Customer Name:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  {...register("customerName", {
                    required: "Customer name is required",
                  })}
                  size="small"
                  placeholder="Enter Name"
                  fullWidth
                  error={!!errors.customerName}
                  helperText={errors.customerName?.message}
                />
              </Grid>
            </Grid>

            {/* Style Consultant Id */}
            <Grid container  sx={{
              paddingLeft: sm || xs ? "60px" : '',
            }}  spacing={2} mt={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: 700, textAlign: "right" }}>
                  Consultant Id:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField
                  {...register("styleConsultantId", {
                    required: "Consultant ID is required",
                  })}
                  size="small"
                  placeholder="Enter Consultant Id"
                  fullWidth
                  error={!!errors.styleConsultantId}
                  helperText={errors.styleConsultantId?.message}
                />
              </Grid>
            </Grid>

            {/* Mobile No */}
            <Grid container  sx={{
              paddingLeft: sm || xs ? "60px" : '',
            }}  spacing={2} mt={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Typography sx={{ fontWeight: 700, textAlign: "right" }}>
                  Mobile No:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <PhoneInput
                  country={"ae"}
                  value={phone}
                  onChange={handlePhoneChange}
                  inputStyle={{ width: "100%" }}
                  containerStyle={{ width: "100%" }}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                />
                {errors.phone && (
                  <Typography color="error" variant="body2">
                    {errors.phone.message}
                  </Typography>
                )}
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button className="submit" type="submit" size="large" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Success Modal */}
      <Modal
        open={successOpen}
        onClose={handleSuccessClose}
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
            maxWidth: 400,
            padding: 3,
            boxShadow: 24,
            backgroundColor: "white",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Success!
          </Typography>
          <Typography mt={1}>
            Your details have been submitted successfully.
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleSuccessClose}
          >
            OK
          </Button>
        </Box>
      </Modal>

      {/* Error Modal */}
      <Modal
        open={errorOpen}
        onClose={handleErrorClose}
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
            maxWidth: 400,
            padding: 3,
            boxShadow: 24,
            backgroundColor: "white",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="error" fontWeight="bold">
            Error!
          </Typography>
          <Typography mt={1} color="error" whiteSpace="pre-line">
            {errorMessage}
          </Typography>

          <Button variant="contained" sx={{ mt: 2 }} onClick={handleErrorClose}>
            OK
          </Button>
        </Box>
      </Modal>
    </>
  );
}
