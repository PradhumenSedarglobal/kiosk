import {
  admitadInvoice,
  admitadOrderedItem,
  getSourceCookie,
} from "@/admitad/AdmitadIndex";
import { TextBox } from "@/components/form";
import { useDispatch } from "@/redux/store";
import { apiDataService } from "@/utils/apiDataService";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
const StyledTypography = styled("h2")(({ theme }) => ({
  ...theme.typography.filter1,
  textAlign: "left",
  color: theme.palette.common.white,
  fontFamily: theme.fontFaces.helveticaNeueBold,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
}));
const FooterSubscribe = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { t: translate } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmitSubscribe = useCallback(async () => {
    if (!email) {
      enqueueSnackbar(translate("EmailIsRequired"), { variant: "error" });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      enqueueSnackbar(translate("InvalidEmail"), { variant: "error" });
    } else {
      try {
        const response = await dispatch(
          apiDataService.post(`/user/enquiry`, {
            content: "contact",
            email: email,
            enquiry_type: "N",
            source_enquiry: getSourceCookie(),
          })
        );
        if (response?.data?.return_status == 0) {
          enqueueSnackbar(translate("we_will_get_back"), {
            variant: "success",
          });
          const consultation_type = {
            H: "free_consultation",
            M: "free_measurement",
          };
          const con_type = consultation_type["N"] || "Lets Connect";
          const consult_type = {
            PRODUCT_DESC: con_type,
            SOL_ITEM_LABEL: "Non_Product",
            SOH_TXN_NO: response.sysid || 111111,
          };
          admitadOrderedItem(consult_type, con_type); // ADMITAD Order add
          admitadInvoice(consult_type, email); // ADMITAD.Invoice
        }
      } catch (error) {
        console.log(error, "error");
        enqueueSnackbar(translate("SomethingWentWrong"), { variant: "error" });
      }
    }
  }, [email, dispatch, enqueueSnackbar, translate]);

  return (
    <Stack
      spacing={{ md: 0.8, sm: 4, xs: 4, xxs: 4 }}
      alignItems={{ md: "start", sm: "center", xs: "center", xxs: "center" }}
    >
      <Box component="div">
        <StyledTypography>{translate("Subscribeemail")}</StyledTypography>
        <Typography
          textAlign={{
            md: "left",
            sm: "center",
            xs: "center",
            xxs: "center",
          }}
          component="p"
          variant="h6"
          sx={{ color: (theme) => theme.palette.grey[1000], fontWeight: 200 }}
          fontFamily={(theme) => theme.fontFaces.helveticaNeue}
        >
          {translate("Inspirationmore")}
        </Typography>
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="stretch"
        width="100%"
      >
        <TextBox
          placeholder={translate("EmailAddress")}
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          formControlSx={{
            mb: 0,
            px: 0,
            borderRadius: 0,
            backgroundColor: "common.white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: 0,
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "common.white",
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "common.white",
            },
            "& .MuiOutlinedInput-input": {
              fontFamily: (theme) => theme.fontFaces.helveticaNeue,
            },
          }}
        />
        <Button
          variant="contained"
          color="warning"
          sx={(theme) => ({
            fontWeight: 400,
            borderRadius: 0,
            height: "auto",
            px: { md: "3rem", sm: "2.5rem", xs: "2rem", xxs: "2rem" },
            py: "0.92rem",
            ...theme.typography.typography45,
            fontFamily: theme.fontFaces.helveticaNeueMedium,
            color: theme.palette.common.black,
          })}
          onClick={onSubmitSubscribe}
        >
          {translate("Subscribe")}
        </Button>
      </Stack>
    </Stack>
  );
};

export default FooterSubscribe;
