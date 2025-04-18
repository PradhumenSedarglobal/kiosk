import axiosInstance from "@/utils/axios";
import {
  setCustomizationPriceFun,
} from "@/redux/slices/customization";

export const addToCartFunScene = (state, dispatch, cart_status = "INCOMPLETE") => {

  console.log("check cart data",state, dispatch, cart_status);


  const { stepsArray, editStepData, productInfo } = state;

  if(state.cart_status == "COMPLETED"){
    cart_status = "COMPLETED";
  }

  if (cart_status == "INCOMPLETE") {
    cart_status = editStepData.line_result && ["MODIFICATION", "COMPLETED"].indexOf(editStepData.line_result.SOL_CART_STATUS) >= 0 ? editStepData.line_result.SOL_CART_STATUS : "INCOMPLETE";
  }
  let userId = state.customerSysIdnew ? state.customerSysIdnew : state.USER_ID;
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
    CUST_SYS_ID: userId,
    SOL_MODIFY_CUST_SYS_ID: modify_cust_sys_id,
    SOL_SOH_SYS_ID: SOL_SOH_SYS_ID,
    SOL_CAD_SYS_ID: SOL_CAD_SYS_ID,
    canvasImg: state.canvasImg || '',
    visitorId: state.visitorId,
    userId: userId,

  };

  //locale=defaultLocalPath
  let path_url =
    post_data.url +
    "?locale=uae-en&visitorId=" +
    state.visitorId +
    "&userId=" +
    userId + '&site=' + state.site + '&country=' + state.countryName  + '&currency=' + state.CCYCODE + '&ccy_decimal=' + state.CCYDECIMALS + '&cn_iso=' + state.cniso + '&detect_country=' + state.detect_country + '&lang='+"en";

    console.log("check cart data",stepsArray);
  if(stepsArray && Object.keys(stepsArray).length > 9){  
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
        console.log(res_data, 'res_data74');
        if (res_data.return_status == 0) {
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
} else {
  console.log(post_data, "post_data else", url);
}
};

