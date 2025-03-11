import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import shortid from "shortid";
import {
  Modal,
  IconButton,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import { setCustomerSystemId } from "@/redux/slices/customization";
import { updateAddToCart } from "@/redux/slices/product";

const genrateVisitorId = () => {
 const timestamp = Date.now();
 const uniqueId = shortid.generate();
 return `${uniqueId}-${timestamp}`;
}

export default function PopupModal() {
  const [open, setOpen] = useState(true);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fonts = useSelector((state) => state.font);
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const customerSystemId = useSelector(
      (state) => state.customization.customerSystemId
    );
  const visitorId = genrateVisitorId();

  console.log("visitorId",visitorId);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleClose = () => setOpen(false);
  const handleSuccessClose = () => setSuccessOpen(false);
  const handleErrorClose = () => setErrorOpen(false);

  //  const fetchModal = async (cancelToken) => {
  //     try {
  //       const response = await axios.get(
  //         `https://migapi.sedarglobal.com/kiosk/categories?category=${selectedCategory}`,
  //         { cancelToken }
  //       );
  //       return response.data;
  //     } catch (error) {
  //       if (axios.isCancel(error)) {
  //         console.log("Request canceled:", error.message);
  //       } else {
  //         console.error("Error fetching categories:", error);
  //       }
  //       throw error;
  //     }
  //   };
  
 

  useEffect(()=>{

    console.log("test");
  },[customerSystemId]);

  const handlePhoneChange = (newValue) => {
    setPhone(newValue);
    setValue("phone", newValue, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("site", "100001");
      formData.append("lang", "en");
      formData.append("country", "IN");
      formData.append("cust_mobile_no", phone);
      formData.append("cust_first_name", data.customerName);
      formData.append("salesman", data.styleConsultantId);
      formData.append("visitorId", visitorId);
  
      console.log("Submitting FormData:", Object.fromEntries(formData));
  
      const response = await axios.post(
        "https://migapi.sedarglobal.com/kiosk/sign_up",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", 
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*", 
          },
          withCredentials: false, 
        }
      );
  
      console.log("API Response:", response.data);
  
      if (response.data.return_status === "-111") {
        setErrorMessage(
          response.data.error_message +
            "\n" +
            JSON.stringify(response.data.result, null, 2)
        );
        setErrorOpen(true);
      } else {
        setSuccessOpen(true);
        dispatch(setCustomerSystemId(response.data.result.CUST_SYS_ID));

        // dispatch(
        //           updateAddToCart({
        //             SOL_SYS_ID: "100062860",
        //             values: {
        //               meas_unit_selected: '',
        //               PRICE:'',
        //               canvasImg:'',
        //               VALUE:'',
        //               category_slug:'',
        //               code:'',
        //               SPI_PR_ITEM_CODE:'',
        //               m_width:'',
        //               m_height:'',
        //               count:'',
        //               convert_width:'',
        //               convert_height:'',
        //               om_width:'',
        //               om_height:'',
        //               cart_status: line_sys_id ? "COMPLETED" : "INCOMPLETE",
        //               item_label: category == "wallpaper" ? "ADD_TO_CART" : "QUICK_BUY",
        //               sys_id: line_sys_id,
        //             },
        //           })
        //         );


        console.log("new value",customerSystemId);
      }
    } catch (error) {
      console.error("API Error:", error);
  
      if (error.response) {
        setErrorMessage(
          "Error: " +
            error.response.data.error_message +
            "\n" +
            JSON.stringify(error.response.data.result, null, 2)
        );
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
  
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
            <Grid container spacing={2} mt={2} alignItems="center">
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
            <Grid container spacing={2} mt={2} alignItems="center">
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
            <Grid container spacing={2} mt={2} alignItems="center">
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
              <Button type="submit" size="large" variant="contained">
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
          <Typography mt={1}>Your details have been submitted successfully.</Typography>

          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSuccessClose}>
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
