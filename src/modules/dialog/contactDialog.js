import { getSourceCookie } from "@/admitad/AdmitadIndex";
import { useAuthContext } from "@/auth/useAuthContext";
import ProductEnquiryForm from "@/modules/form/productEnquiryForm";
import { apiClientV2DataService } from "@/utils/apiClientV2DataService";
import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";

const enquiry_t_list = {
  M: "measurement_consultation",
  V: "virtual_consultation",
  H: "phone_consultation",
  C: "contact",
  F: "franchise",
  S: "contracts",
  Q: "get_a_quote",
  D: "special_offer",
  N: "newsletter",
  I: "Inquiry",
  E: "enquiry",
  PWD: "password",
  REMAIL: "email",
};
const ContactDialog = ({ open, handleOpenClose = () => { }, selectedDesc='',artCode='',enquiry_type='' }) => {
  console.log(selectedDesc,artCode,enquiry_type,'dsadasdasd');
  const { push, locale,pathname } = useRouter()
  const { state } = useAuthContext();
  const {enqueueSnackbar} = useSnackbar();
  const { cookies } = state;
  const { cniso } = cookies || {};
  const { t: translate } = useTranslation();
  const enquiry_types = enquiry_type == "A" ? "A" : "C";


  const formik = useFormik({
    initialValues: {
      category_code: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      enquiry_type: enquiry_types,
      state: "",
      city: "",
      province_desc: "",
      area: "",
      country: "",
      cad_country: cniso,
      myCountry: cniso,
      i_agree: true,
      remarks: "",
      productInterestedDesc: [],
      productInterestedDesc11: [],
      producttype:selectedDesc,
      artwork:artCode,
      urllink:pathname,

    },
    validate: (values) => {
      const errors = {};
      if (!values.first_name) {
        errors.first_name = translate("Thisfieldisrequired");
      }
      if (!values.last_name) {
        errors.last_name = translate("Thisfieldisrequired");
      }
      if (!values.email) {
        errors.email = `${translate("Thisfieldisrequired")}`;
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = `${translate("InvalidEmailAddress")}`;
      }
      if (!values.city) {
        errors.city = translate("Thisfieldisrequired");
      }
      if (!values.country) {
        errors.country = translate("Thisfieldisrequired");
      }

      return errors;
    },
    onSubmit: async (values) => {
      let data = {};
      data["source_enquiry"] = getSourceCookie();
      data["category_code"] = values.category_code?.value;
      data["content"] = "contact";
      for (var key in values) {
        console.log('key',key);
        if (key == "category_code") {
          data["category_code"] = values.category_code?.value ? values.category_code?.value : "";
        } else if (key == "country") {
          data["country"] = values?.country?.value;
        } else if (key == "city") {
          data["city"] = values?.city?.value;
        } else if (key == "area") {
          data["area"] = values?.area?.value;
        } else if (key == "productInterestedDesc") {
          let newProductInterestedDesc = [];
          newProductInterestedDesc =
            values?.productInterestedDesc?.length > 0
              ? values?.productInterestedDesc.map((item) => item?.label)
              : [];

          newProductInterestedDesc = newProductInterestedDesc.join(",");
          data['productInterestedDesc'] = newProductInterestedDesc;
        } else if (key == "productInterestedDesc11") {
          let newProductInterestedDesc11 = [];
          newProductInterestedDesc11 =
            values?.productInterestedDesc11?.length > 0
              ? values?.productInterestedDesc11.map((item) => item?.label)
              : [];
          newProductInterestedDesc11 = newProductInterestedDesc11.join(",");
          data['productInterestedDesc11'] = newProductInterestedDesc11;
        } else {
          data[key] = values[key]
        }
      }
      await apiClientV2DataService.post({ path: 'user/enquiry', data: data, locale, isCountry: false }).then((response) => {
        console.log(response,'response',response.status == 200,response.data.return_status == '0');
        if (response.status == 200 || response.data.return_status == '0') {
          let page_name = enquiry_t_list[values.enquiry_type]
            ? enquiry_t_list[values.enquiry_type]
            : "done";
            console.log(page_name,'page_name');
            enqueueSnackbar(`${translate("we_will_get_back")}`, {
              variant: "success",
            });
            console.log('before  push');
          push({
            pathname: `/success/${page_name}`,
            query: { email: values.email },
          });
          console.log('after push');

        }
      }).catch((error) => {
        console.log("PRODUCT CONTACT US", error);
        enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
          variant: "error",
        });
      })
    }
  });

  React.useEffect(() => {
    if (cniso) {
      formik.setFieldValue("myCountry", cniso);
      formik.setFieldValue("cad_country", cniso);
    }
  }, [cniso])
  return (
    <Dialog
      open={open}
      onClose={() => handleOpenClose()}
      fullWidth
      maxWidth="sm"
      scroll="paper"
    >
      <DialogTitle id="scroll-dialog-title">
        <Stack direction="row" alignItems="center" justifyContent="end" mb={2}>
          <Box>
            <IconButton size="small" onClick={handleOpenClose}>
              <Close />
            </IconButton>
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <ProductEnquiryForm formik={formik} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

ContactDialog.propTypes = {
  handleOpenClose: PropTypes.func,
  open: PropTypes.bool,
};


export default ContactDialog;
