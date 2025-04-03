import { useAuthContext } from "@/auth/useAuthContext";
import { TextBox } from "@/components/form";
import useCartContext from "@/provider/cart/cartContext";
import { useDispatch } from "@/redux/store";
import { apiDataService } from "@/utils/apiDataService";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { deleteCookie } from "cookies-next";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";

const ModificationSummary = (props) => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const { cartState } = useCartContext();
  const { cart, shipping_price } = cartState;

  const { header_info } = cart || {};
  const dispatch = useDispatch();
  const { locale } = router;
  const { shipping_info, payment_link_info } = cart;
  const { state } = useAuthContext();
  const { cookies } = state;
  const { USER_ID, user, modificationUser, CCYDECIMALS } = cookies || {};

  let decimalPoints = CCYDECIMALS ? CCYDECIMALS : 0;

  const [loading_btn, setLoading_btn] = useState(false);
  const [errorMgs, setErrorMgs] = useState(false);
  const [variant, setVariant] = useState("danger");
  const [errorPromo, setErrorPromo] = useState(false);

  let old_cart_value =
    header_info && header_info.SOH_NET_VALUE_OLD > 0
      ? header_info.SOH_NET_VALUE_OLD
      : 0;

  const [promoCode, setPromoCode] = useState(header_info?.SOH_PROMO_CODE);
  const [promoCodeAmount, setPromoCodeAmount] = useState(
    header_info && header_info.SOH_PROMO_VALUE > 0
      ? header_info.SOH_PROMO_VALUE
      : 0
  );
  const [promoCodeDesc, setPromoCodeDesc] = useState(
    header_info?.SOH_PROMO_CODE
  );
  const [show, setShow] = useState(false);
  const [promoCodeErroStatus, setPromoCodeErroStatus] = useState(false);

  let tolat_price_val = cart.total_price
    ? Number(cart.total_price.SOL_VALUE) +
    Number(shipping_price) -
    (Number(header_info?.SOH_PROMO_VALUE) + Number(old_cart_value))
    : 0 + Number(shipping_price);

  let tolat_price = Number(tolat_price_val.toFixed(decimalPoints));

  let modi_user_id =
    modificationUser && modificationUser.CUST_SYS_ID > 0
      ? modificationUser.CUST_SYS_ID
      : 0;
  let head_sys_id =
    modificationUser && modificationUser?.head_sys_id > 0
      ? modificationUser?.head_sys_id
      : false;

  let modi_email =
    modificationUser && modificationUser.CUST_EMAIL_ID
      ? modificationUser.CUST_EMAIL_ID
      : "";

  let mgs = "Payment link has been sent to the customer " + modi_email;

  React.useEffect(() => {
    if (header_info) {
      setPromoCodeAmount(
        header_info && header_info.SOH_PROMO_VALUE > 0
          ? header_info.SOH_PROMO_VALUE
          : 0
      );
      setPromoCode(header_info?.SOH_PROMO_CODE);
    }
  }, [header_info]);

  const tmpToMain = async () => {
    try {
      const response = await dispatch(
        apiDataService.post("payment/modificationTmpToMain", {
          soh_sys_id: head_sys_id,
        })
      );
      if (response) {
        let res_data = response.data;
        if (
          res_data.return_status == 0 &&
          res_data.error_message == "Success"
        ) {
          router.push(
            "/" + locale + "/payment/modification?orderId=" + res_data.order_id
          );
          deleteCookie("MODIFICATION_USER");
        }
      }
    } catch (error) { }
  };
  const addUpdatePaymentLink = async (type, fpl_sys_id = false) => {
    let payment_link_url = `payment/addPaymentLink/${type}`;
    if (fpl_sys_id && fpl_sys_id > 0) {
      payment_link_url = `payment/updatePaymentLink/${type}/${fpl_sys_id}`;
    }
    if (type == "Edit-Down") {
      tolat_price = -tolat_price;
    }

    try {
      const response = await dispatch(
        apiDataService.post(payment_link_url, {
          soh_sys_id: head_sys_id,
          modi_user_id: modi_user_id,
          amount: tolat_price,
        })
      );
      let res_data = response.data;
      if (
        type == "Edit-Up" &&
        res_data.return_status == 0 &&
        res_data.error_message == "Success"
      ) {
        setErrorMgs(
          res_data.error_message == "Success" ? mgs : res_data.error_message
        );
        setVariant("success");
      } else if (
        type == "Edit-Down" &&
        res_data.return_status == 0 &&
        res_data.error_message == "Success" &&
        res_data.order_id
      ) {
        router.push(
          "/" + locale + "/payment/modification?orderId=" + res_data.order_id
        );
        deleteCookie("MODIFICATION_USER");
      } else {
        setErrorMgs(res_data.error_message);
        setVariant("danger");
      }
    } catch (error) { }
  };
  const promoCodeRemovedFun = () => {
    setPromoCodeAmount(0);
    headerTable("");
  };
  const promoCodeFun = async () => {
    if (promoCode && promoCode.length > 1) {
      try {
        const response = await dispatch(
          apiDataService.getAll("order/promoCodeFun/" + promoCode, {
            soh_sys_id: head_sys_id,
          })
        );
        let res_data = response.data;
        if (
          res_data.return_status == 0 &&
          res_data.error_message == "Success" &&
          res_data.result.OFFER_AMOUNT > 0
        ) {
          setPromoCodeAmount(res_data.result.OFFER_AMOUNT);
          setPromoCodeDesc(res_data.result.SCPN_DESC);
          document
            .querySelector(".promo_code")
            .classList.remove("delivery_error");
          setPromoCodeErroStatus(false);
          headerTable(promoCode);
          setShow(true);
        } else if (
          res_data.return_status == -333 &&
          res_data.error_message == "Error" &&
          res_data.result == null
        ) {
          setPromoCodeAmount(0);
          setPromoCodeDesc("");
          setErrorMgs(res_data.error_message);
          setErrorPromo("Invalid_Promo");
          setVariant("danger");
          setPromoCodeErroStatus(true);
          setShow(false);
        } else {
          setPromoCodeAmount(0);
          setPromoCodeDesc("");
          setErrorMgs(res_data.error_message);
          setErrorPromo(res_data.result.SCPN_PROMO_CODE);
          setVariant("danger");

          setPromoCodeErroStatus(true);
          setShow(false);
        }
      } catch (error) { }
    } else {
      setPromoCodeErroStatus(false);
    }
  };

  const headerTable = async (promoCode) => {
    let post_data = {
      showRoomVal: header_info.SOH_SHOWROOM_CODE,
      deliveryType: header_info.SOH_CARRIER_CODE,
      PROMO_CODE: promoCode,
      cart_remark_desc: header_info.SOH_DESC,
      userId: USER_ID,
    };

    if (user.cust_type == "ADMIN" && head_sys_id > 0) {
      post_data = { ...post_data, soh_sys_id: head_sys_id };
    }

    try {
      const response = await dispatch(
        apiDataService.post("order/cart/orderHead", post_data)
      );
      let res_data = response.data;

      if (res_data.return_status == 0 && res_data.error_message == "Success") {
        setErrorMgs(res_data.error_message);
        setVariant("success");
      } else if (res_data.return_status == 111) {
        setErrorMgs(res_data.error_message);
        setVariant("danger");
      } else if (res_data.return_status == "333") {
        setLoginModalShow(true);
      } else {
        setErrorMgs(res_data.error_message);
        setVariant("danger");
      }
    } catch (error) { }
  };
  const sendEmail = async () => {
    try {
      const response = await dispatch(
        apiDataService.getAll(`payment/sendPaymentLinkEmail/${head_sys_id}`)
      );
      let res_data = response.data;
      setLoading_btn(false);
      if (res_data.return_status == 0 && res_data.error_message == "Success") {
        setErrorMgs(
          res_data.error_message == "Success" ? mgs : res_data.error_message
        );
        setVariant("success");
      } else {
        setErrorMgs(res_data.error_message);
        setVariant("danger");
      }
    } catch (error) { }
  };

  return (
    <Box>
      <Stack direction={"row"} alignItems="end">
        <TextBox
          fullWidth
          placeholder={translate("CouponCodeorGiftCard")}
          type="text"
          variant="standard"
          name="cad_first_name"
          value={promoCode}
          onChange={(event) => setPromoCode(event.target.value.toUpperCase())}
          formControlSx={{
            marginBottom: "0px",
            backgroundColor: errorMgs ? "#f8d7da" : "#ffffff",
          }}
        />
        {promoCodeAmount > 0 ? (
          <Button
            variant="contained"
            onClick={() => {
              promoCodeRemovedFun();
            }}
            sx={(theme) => ({
              background: theme.palette.info.moreLight,
              color: theme.palette.common.white,
              fontFamily: theme.fontFaces.helveticaNeue,
              fontSize: "16px",
              fontWeight: 400,
              height: "32px",
              ":hover": {
                background: (theme) => theme.palette.info.lessLight,
              },
            })}
          >
            {" "}
            {translate("Remove")}{" "}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={promoCodeFun}
            sx={(theme) => ({
              background: theme.palette.info.moreLight,
              color: errorMgs
                ? theme.palette.common.black
                : theme.palette.common.white,
              fontFamily: theme.fontFaces.helveticaNeue,
              fontSize: "16px",
              fontWeight: 400,
              borderRadius: 0,
              height: "32px",
              ":hover": {
                background: theme.palette.info.lessLight,
                color: errorMgs
                  ? theme.palette.common.white
                  : theme.palette.common.white,
              },
            })}
          >
            {" "}
            {translate("Apply")}
          </Button>
        )}
      </Stack>
      {errorMgs ? (
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.error.moreLight,
            borderRadius: "5px",
          })}
          textAlign={"center"}
          p={1}
          mt={1}
        >
          <Typography
            component={"p"}
            mt={1}
            variant="typography16"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
            letterSpacing={1}
            color={(theme) => theme.palette.error.moreLighter}
          >
            {errorMgs}
            {promoCodeErroStatus ? (
              <Typography
                component={"p"}
                mt={1}
                mb={1}
                variant="typography16"
                fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                letterSpacing={1}
                color={(theme) => theme.palette.error.moreLighter}
              >
                {errorPromo == "Invalid"
                  ? translate("promo_code_error")
                  : errorPromo == "Expired"
                    ? translate("code_is_invalid_or_expired")
                    : translate("promo_code_error_mgs")}
              </Typography>
            ) : (
              ""
            )}
          </Typography>
        </Box>
      ) : (
        ""
      )}
      {(header_info && header_info.SOH_CARRIER_CODE == "DO03") ||
        (header_info.SOH_CARRIER_CODE == "DO02" &&
          router.route == "/modification/delivery") ? (
        <>
          {tolat_price >= 0 && shipping_info ? (
            <Box mt={5}>
              {tolat_price > 0 ? (
                payment_link_info &&
                  payment_link_info.FPL_AMOUNT == tolat_price &&
                  payment_link_info.FPL_REF_SYS_ID == head_sys_id ? (
                  payment_link_info.FPL_STATUS == "Paid" ? (
                    <LoadingButton
                      loading={loading_btn}
                      type="button"
                      onClick={tmpToMain}
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: "0px",
                        backgroundColor: (theme) => theme.palette.primary.light,
                        ":hover": {
                          backgroundColor: (theme) =>
                            theme.palette.primary.light,
                        },
                      }}
                    >
                      <Typography
                        component={"span"}
                        variant="typography15"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueMedium
                        }
                        color="common.black"
                        fontWeight={200}
                        m={0.5}
                      >
                        {translate("Proceed_to_order")}
                      </Typography>
                    </LoadingButton>
                  ) : (
                    <LoadingButton
                      type="button"
                      loading={loading_btn}
                      onClick={sendEmail}
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: "0px",
                        backgroundColor: (theme) => theme.palette.primary.light,
                        ":hover": {
                          backgroundColor: (theme) =>
                            theme.palette.primary.light,
                        },
                      }}
                    >
                      <Typography
                        component={"span"}
                        variant="typography15"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueMedium
                        }
                        color="common.black"
                        fontWeight={200}
                        m={0.5}
                      >
                        {translate("Resend Payment Link Email")}
                      </Typography>
                    </LoadingButton>
                  )
                ) : payment_link_info &&
                  payment_link_info.FPL_AMOUNT != tolat_price &&
                  payment_link_info.FPL_REF_SYS_ID == head_sys_id ? (
                  <LoadingButton
                    type="button"
                    loading={loading_btn}
                    onClick={() => {
                      addUpdatePaymentLink(
                        "Edit-Up",
                        payment_link_info.FPL_SYS_ID
                      );
                    }}
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: "0px",
                      backgroundColor: (theme) => theme.palette.primary.light,
                      ":hover": {
                        backgroundColor: (theme) => theme.palette.primary.light,
                      },
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="typography15"
                      fontFamily={(theme) =>
                        theme.fontFaces.helveticaNeueMedium
                      }
                      color="common.black"
                      fontWeight={200}
                      m={0.5}
                    >
                      {translate("Update to Payment Link")}
                    </Typography>
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    type="button"
                    loading={loading_btn}
                    onClick={() => {
                      addUpdatePaymentLink("Edit-Up");
                    }}
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: "0px",
                      backgroundColor: (theme) => theme.palette.primary.light,
                      ":hover": {
                        backgroundColor: (theme) => theme.palette.primary.light,
                      },
                    }}
                  >
                    <Typography
                      component={"span"}
                      variant="typography15"
                      fontFamily={(theme) =>
                        theme.fontFaces.helveticaNeueMedium
                      }
                      color="common.black"
                      fontWeight={200}
                      m={0.5}
                    >
                      {translate("Send to Payment Link")}
                    </Typography>
                  </LoadingButton>
                )
              ) : (
                <LoadingButton
                  loading={loading_btn}
                  type="button"
                  onClick={tmpToMain}
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: "0px",
                    backgroundColor: (theme) => theme.palette.primary.light,
                    ":hover": {
                      backgroundColor: (theme) => theme.palette.primary.light,
                    },
                  }}
                >
                  <Typography
                    component={"span"}
                    variant="typography15"
                    fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                    color="common.black"
                    fontWeight={200}
                    m={0.5}
                  >
                    {translate("Proceed_to_order")}
                  </Typography>
                </LoadingButton>
              )}
            </Box>
          ) : shipping_info ? (
            <LoadingButton
              loading={loading_btn}
              onClick={() => {
                addUpdatePaymentLink("Edit-Down");
              }}
              color="primary"
              variant="contained"
              sx={{
                borderRadius: "0px",
                backgroundColor: (theme) => theme.palette.primary.light,
                ":hover": {
                  backgroundColor: (theme) => theme.palette.primary.light,
                },
              }}
              fullWidth
            >
              <Typography
                component={"span"}
                variant="typography15"
                fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
                color="common.black"
                fontWeight={200}
                m={0.5}
              >
                {translate("Add Payment in Wallet & Place Order")}
              </Typography>
            </LoadingButton>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
export default ModificationSummary;
