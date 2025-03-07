import { useAuthContext } from "@/auth/useAuthContext";
import { SubmitButton } from "@/components/button";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { isValidPhoneNumber } from "react-phone-number-input";
import DialogHeader from "../dialogHeader";
import GuestForm from "./form";

const Guest = ({ handleFormOpen, handleClose }) => {
  const { t: translate } = useTranslation();
  const { guestLogin } = useAuthContext();
  const { query } = useRouter();
  const { head_sys_id } = query;
  const { state } = useAuthContext();
  const { cookies } = state;
  const {
    langName,
    site,
    visitorId,
    countryName,
    detect_country,
    USER_ID,
    cniso,
    CCYDECIMALS,
    modificationUser,
  } = cookies || {};

  const formik = useFormik({
    initialValues: {
      cust_first_name: "",
      cust_last_name: "",
      cust_email_id: "",
      cust_mobile_no: "",
      cust_cr_uid: "GUEST-USER",
    },
    validate: (values) => {
      const errors = {};
      if (!values.cust_first_name) {
        errors.cust_first_name = translate("Thisfieldisrequired");
      }

      if (!values.cust_last_name) {
        errors.cust_last_name = translate("Thisfieldisrequired");
      }
      if (!values.cust_email_id) {
        errors.cust_email_id = translate("Thisfieldisrequired");
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.cust_email_id)
      ) {
        errors.cust_email_id = translate("InvalidEmailAddress");
      }

      if (!values.cust_mobile_no) {
        errors.cust_mobile_no = translate("Thisfieldisrequired");
      } else if (!isValidPhoneNumber(values.cust_mobile_no)) {
        errors.cust_mobile_no = `${translate("please_enter_a_valid_number")}`;
      }

      return errors;
    },
    onSubmit: async (values) => {
      const data = {
        values:
          modificationUser?.head_sys_id || head_sys_id
            ? {
              ...values,
              head_sys_id: modificationUser?.head_sys_id || head_sys_id,
              site: site,
              lang: langName,
              country: countryName,
              visitorId: visitorId,
              ccy_decimal: CCYDECIMALS,
              cn_iso: cniso,
              detect_country: detect_country,
              userId: USER_ID,
              cust_nationality: cniso,
            }
            : {
              ...values,
              site: site,
              lang: langName,
              country: countryName,
              visitorId: visitorId,
              ccy_decimal: CCYDECIMALS,
              cn_iso: cniso,
              detect_country: detect_country,
              userId: USER_ID,
              cust_nationality: cniso,
            },
        url: "sg_customer/guestUserLoginRegister",
        formik: formik,
        handleClose: handleClose,
      };
      await guestLogin(data);
    },
  });
  return (
    <>
      <DialogTitle component="div">
        <DialogHeader
          title={translate("Guest_Checkout")}
          handleClose={handleClose}
        />
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={formik.handleSubmit}>
          <GuestForm formik={formik} />
          <Box my={3}>
            <SubmitButton
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
              fullWidth={true}
              title={translate("Continue")}
              fontWeight={600}
              maxWidth="100%"
              buttonSx={(theme) => ({
                "&.MuiButton-root": {
                  width: "100%",
                  borderRadius: "0px!important",
                  color: "common.black",
                  ...theme.typography.typography15,
                  padding: "1rem 5px!important",
                  background: (theme) => theme.palette.primary.light,
                  ":hover": {
                    background: (theme) => `${theme.palette.warning.dark}`,
                    backgroundColor: (theme) => theme.palette.primary.light,
                  },
                  "&.Mui-disabled": {
                    background: (theme) =>
                      alpha(theme.palette.primary.lighter, 0.65),
                  },
                },
              })}
            />
          </Box>
        </form>
        <Box textAlign="center" my={2}>
          <Typography
            sx={(theme) => ({
              fontWeight: 400,
              letterSpacing: 0.5,
              ...theme.typography.typography17,
              fontFamily: theme.fontFaces.helveticaNeueMedium,
              color: theme.palette.common.black,
            })}
          >
            {translate("already_member_Login")}{" "}
            <Typography
              onClick={() => handleFormOpen("login")}
              component="span"
              sx={(theme) => ({
                fontWeight: 600,
                ...theme.typography.typography15,
                fontFamily: theme.fontFaces.helveticaNeueMedium,
                color: theme.palette.primary.main,
                cursor: "pointer",
              })}
            >
              {translate("login")}
            </Typography>
          </Typography>
        </Box>
      </DialogContent>
    </>
  );
};

export default Guest;
