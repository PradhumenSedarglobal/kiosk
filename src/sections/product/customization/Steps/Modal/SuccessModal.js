import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "@/redux/store";
import { NextFillImage } from "@/components/image";
import { useAuthContext } from "@/auth/useAuthContext";
import { alpha, Stack, Typography } from "@mui/material";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";

export default function SuccessModal(props) {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const { slug } = router.query;

  const { editStepData } = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { user, modificationUser } = cookies || {};

  let cust_type = user && user.cust_type ? user.cust_type : "";
  let SOL_SOH_SYS_ID =
    modificationUser && modificationUser.head_sys_id
      ? modificationUser.head_sys_id
      : "";
  let cart_url =
    cust_type == "ADMIN" && SOL_SOH_SYS_ID > 0
      ? "/modification?head_sys_id=" + SOL_SOH_SYS_ID
      : "/cartPage";
  let cart_status =
    editStepData.line_result &&
      editStepData.line_result.SOL_CART_STATUS &&
      ["COMPLETED", "MODIFICATION"].indexOf(
        editStepData.line_result.SOL_CART_STATUS
      ) >= 0
      ? editStepData.line_result.SOL_CART_STATUS
      : "INCOMPLETE";

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={props.successPopup}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xxs"
        sx={{ maxHeight: '480px' }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ margin: "auto", textAlign: "center" }}
        >

          <Stack spacing={2} alignItems="center">
            <NextLazyLoadImage
              src={`/assets/images/Customization/Group24171.png`}
              alt="1"
              width={60}
              height={357}
              sx={{
                width: "60px!important",
                height: "100%!important",
                objectFit: "cover!important",
              }}
              sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
              objectFit="contain"
              upLgWidth={60}
              downLgWidth={60}
              downMdWidth={60}
              downSmWidth={60}
              downXsWidth={60}
            />
            <Typography
              component="p"
              variant="typography19"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              fontWeight={500}
            >
              {translate("ProductSuccessfully")}
            </Typography>
            <Typography
              component="p"
              variant="typography19"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              fontWeight={500}
            >
              {cart_status == "INCOMPLETE"
                ? translate("Addedtoyourcart")
                : translate("updatedtoyourcart")}{" "}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* <Button
              variant="contained"
              color="warning"
              LinkComponent={NextLink}
              href={slug?.[0] + "/" + slug?.[1]}
              sx={{ margin: "10px", padding: "12px" }}
            >
              {translate("ContinueShopping")} {"  "}
            </Button>
            <Button
              variant="contained"
              color="warning"
              LinkComponent={NextLink}
              href={cart_url}
              sx={{ margin: "10px", padding: "12px" }}
            >
              {translate("ProceedtoCheckout")}
            </Button> */}
            <Stack spacing={2} width="100%" p={2}>
              <Button
                sx={(theme) => ({
                  "&.MuiButton-root": {
                    borderRadius: "0px",
                    ...theme.typography.typography15,
                    fontFamily: theme.fontFaces.helveticaNeueBold,
                    maxWidth: `100%!important`,
                    padding: "10px 0px!important",
                  },
                })}
                fullWidth
                variant="outlined"
                color="dark"
                LinkComponent={NextLink}
                href={slug?.[0] + "/" + slug?.[1]}
              >
                {translate("ContinueShopping")}
              </Button>
              <Button
                sx={(theme) => ({
                  "&.MuiButton-root": {
                    borderRadius: "0px",
                    color: "common.black",
                    ...theme.typography.typography15,
                    fontFamily: theme.fontFaces.helveticaNeueBold,
                    maxWidth: `100%!important`,
                    padding: "10px 0px!important",
                    background: (theme) => theme.palette.primary.light,
                    ":hover": {
                      background: (theme) =>
                        `${theme.palette.warning.dark} !important`,
                    },
                    "&.Mui-disabled": {
                      background: (theme) =>
                        alpha(theme.palette.primary.lighter, 0.65),
                    },
                  },
                })}
                maxWidth="100%"
                fullWidth
                variant="contained"
                color="primary"
                LinkComponent={NextLink}
                href={cart_url}
              >
                {translate("ProceedtoCheckout")}
              </Button>
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>  Agree </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
