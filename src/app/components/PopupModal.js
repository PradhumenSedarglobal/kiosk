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
import { useAuthContext } from "@/auth/useAuthContext";
import axiosInstance from "@/utils/axios";


let lat = 0;
let lon = 180;
var old_lon = 180;
var old_lat = 0;
var camera;
let camera_fov = 75;
let camera_near = 0.1;
let camera_far = 1000;
let zoom_slider = 0;

export function canvasImg() {
  lat = old_lat;
  lon = old_lon;
  if (camera && camera.isCamera) {
    camera.fov = THREE.Math.clamp(camera_fov, 10, camera_fov);
    camera.updateProjectionMatrix();

    let phi = THREE.Math.degToRad(90 - lat);
    let theta = THREE.Math.degToRad(lon);
    camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
    camera.target.y = 500 * Math.cos(phi);
    camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(camera.target);
    renderer.render(scene, camera);

    return renderer.domElement.toDataURL("image/jpeg", 0.3);
  }
}

export function addToCartFunScene2(state, dispatch, cart_status = "INCOMPLETE") {

  const { stepsArray, editStepData, productInfo } = state;

  console.log("customerSysId",state);
  console.log("cart_status",cart_status);

  // Assign COMPLETE status if customerSysIdnew is provided
  if (state.customerSysIdnew !== null) {
    cart_status = "COMPLETE";
  }

  console.log("cart_status2",cart_status);

  if (cart_status == "INCOMPLETE") {
    cart_status = editStepData.line_result && ["MODIFICATION", "COMPLETED"].indexOf(editStepData.line_result.SOL_CART_STATUS) >= 0 ? editStepData.line_result.SOL_CART_STATUS : "INCOMPLETE";
  }
  let userId = state.USER_ID;
  let modify_cust_sys_id = "";
  let SOL_SOH_SYS_ID = "";
  let SOL_CAD_SYS_ID = "";

  if (state.user && state.user.cust_id) {
    userId = editStepData.line_result && state.user && state.user && state.user.cust_type == "ADMIN" ? editStepData.line_result.SOL_CUST_SYS_ID : state.user?.cust_id;
    modify_cust_sys_id = state.user && state.user && state.user.cust_type == "ADMIN" ? state.user.cust_id : 0;
    SOL_SOH_SYS_ID = editStepData.line_result && editStepData.line_result.SOL_SOH_SYS_ID > 0 ? editStepData.line_result.SOL_SOH_SYS_ID : "";
    SOL_CAD_SYS_ID = editStepData.line_result && editStepData.line_result.SOL_CAD_SYS_ID > 0 ? editStepData.line_result.SOL_CAD_SYS_ID : "";
  }

  if (state.user && state.modificationUser && state.modificationUser.head_sys_id && state.user.cust_type == "ADMIN" && SOL_SOH_SYS_ID == '') {
    SOL_SOH_SYS_ID = state.modificationUser.head_sys_id;
  }
  let url =
  editStepData.line_result && editStepData.line_result.SOL_SYS_ID
      ? "kiosk/cart/update/" + editStepData.line_result.SOL_SYS_ID
      : "kiosk/cart";

  let post_data = {
    ...productInfo,
    STEPS: stepsArray,
    cart_status: cart_status,
    url: url,
    CUST_SYS_ID: state.customerSysIdnew ? state.customerSysIdnew : userId,
    SOL_MODIFY_CUST_SYS_ID: modify_cust_sys_id,
    SOL_SOH_SYS_ID: SOL_SOH_SYS_ID,
    SOL_CAD_SYS_ID: SOL_CAD_SYS_ID,
    canvasImg: canvasImg(),
    visitorId: state.visitorId,
    userId: userId,
  };

  //locale=defaultLocalPath
  let path_url =
    post_data.url +
    "?locale=uae-en&visitorId=" +
    state.visitorId +
    "&userId=" +
    userId; //+ '&site=' + state.site + '&country=' + state.countryName  + '&currency=' + state.CCYCODE + '&ccy_decimal=' + state.CCYDECIMALS + '&cn_iso=' + state.cniso + '&detect_country=' + state.detect_country;

  if (
    productInfo &&
    productInfo.count > 0 &&
    stepsArray &&
    stepsArray?.MATERIAL_SELECTION &&
    (stepsArray?.MEASUREMENT || stepsArray?.ROLL_CALCULATION)
  ) {

    console.log(stepsArray, post_data, 'addToCartFunScene');
    axiosInstance.post(path_url, post_data)
      .then((response) => {
        let res_data = response.data;
        if ((res_data.error_message == "Success" || res_data.error_message == "SUCCESS") && res_data.return_status == 0) {
          dispatch(setCustomizationPriceFun(res_data.result));
        } else {
          //setErrorMgs(res_data.error_message);
          // alert(res_data.error_message);
          res_data["subject"] = "Customization";
          axiosInstance
            .post("emailFun", res_data)
            .then((response) => { console.log(response, 'response') })
            .catch((e) => {
              console.log(e, 'Error catch11')
            });
        }
      })
      .catch((e) => {
        console.log(e, 'catch Error')
        alert("catch");
      });
  } else {
    console.log(post_data, "post_data", url);
  }
};



const genrateVisitorId = () => {
 const timestamp = Date.now();
 const uniqueId = shortid.generate();
 return `${uniqueId}-${timestamp}`;
}

export default function PopupModal() {
  const { state } = useAuthContext();
  const { cookies } = state;
  const locale = 'uae-en';
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
  
      console.log("API Response:", response);
      console.log("response.data.cust_sys_id2",response.data.cust_sys_id);
      if (response.data.return_status === "-111") {
        setErrorMessage(
          response.error_message +
            "\n" +
            JSON.stringify(response, null, 2)
        );
        setErrorOpen(true);
      } else {
        // setSuccessOpen(true);
        console.log("customization",customization);
        dispatch(setCustomerSystemId(response.data.cust_sys_id));

        if(response.data.cust_sys_id){
          addToCartFunScene2(
            { ...cookies, ...customization_info, locale: locale,customerSysIdnew: response.data.cust_sys_id},
            dispatch
          );
        }
       


       
      }
    } catch (error) {
      console.error("API Error:", error);

  
      // if (error.response == "Success") {
      //   setErrorMessage(
      //     "Error: " +
      //       error.response.data.error_message +
      //       "\n" +
      //       JSON.stringify(error.response.data.result, null, 2)
      //   );
      // } else {
      //   setErrorMessage("An unexpected error occurred. Please try again.");
      // }
  
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
