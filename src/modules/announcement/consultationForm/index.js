import {
  admitadInvoice,
  admitadOrderedItem,
  getSourceCookie,
} from "@/admitad/AdmitadIndex";
import { useAuthContext } from "@/auth/useAuthContext";
import SelectBox from "@/components/form/select";
import Consultation from "@/modules/form/consultation";
import { useSelector } from "@/redux/store";
import axiosInstance from "@/utils/axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useFormik } from "formik";
import moment from "moment";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import CheckedCard from "./checkedCard";
import CloseButton from "./closeButton";
import Enquiries from "./enquiries";
import ConsultationHeading from "./heading";
const consultation_type = { H: "free_consultation", M: "free_measurement" };
const ConsultationForm = ({
  data,
  handleOpenClose,
  isCloseShow = true,
  isBgColor = true,
  open,
  enq_type,
}) => {
  const { locale, push } = useRouter();
  const { t: translate } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { country } = useSelector((state) => state.location);
  const [isSubmitForm, setIsSubmitForm] = React.useState(false);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { langName, visitorId, CCYCODE, site, cniso, CCYDECIMALS } =
    cookies || {};
  const cardData =
    data?.length > 0
      ? data[0]?.SUB_CHILD
      : data?.PARENT?.CHILD &&
        data?.PARENT?.CHILD?.length > 0 &&
        data?.PARENT?.CHILD[0]?.SUB_CHILD?.length > 0
        ? data?.PARENT?.CHILD[0]?.SUB_CHILD
        : data?.PARENT?.CHILD && data?.PARENT?.CHILD?.length > 0
          ? data?.PARENT?.CHILD
          : [];

  const formHeading =
    data?.length > 0
      ? data[0]
      : data?.PARENT && data?.PARENT?.length > 0
        ? data?.PARENT[0]
        : data?.PARENT;

  const todaysDate = new Date();
  const dateAfterTwoDays = new Date(todaysDate);
  // Add two days
  dateAfterTwoDays.setDate(todaysDate.getDate() + 2);

  const isDateDisabled = (date) => {
    const currentDate = dayjs();
    const selectedDay = dayjs(date).day();
    const selectedHour = dayjs(date).hour();

    // If the current day is Saturday and it's 6 PM or later
    if (cniso == "AE" && currentDate.day() === 6 && currentDate.hour() >= 18) {
      // Disable all dates until the end of Monday
      if (
        (selectedDay === 6 && selectedHour >= 18) ||
        selectedDay === 0 ||
        selectedDay === 1
      ) {
        return true;
      }
    }

    // If the current day is Sunday or Monday, disable all dates for Monday
    if (cniso == "AE" && (currentDate.day() === 0 || currentDate.day() === 1)) {
      if (selectedDay === 0 || selectedDay === 1) {
        return true;
      }
    }

    return (
      (cniso != "AE" && date.day() === 5) || (cniso == "AE" && date.day() === 0)
    );
  };

  const getInitialDate = () => {
    let initialDate = dayjs().add(2, "day");
    while (isDateDisabled(initialDate)) {
      initialDate = initialDate.add(1, "day");
    }
    return initialDate.toDate();
  };

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
  // Initialize refs for each form field
  const fieldRefs = {
    productInterestedDesc: React.useRef(null),
    long_name: React.useRef(null),
    email: React.useRef(null),
    phone_number: React.useRef(null),
    country: React.useRef(null),
    city: React.useRef(null),
    province_desc: React.useRef(null),
    subject: React.useRef(null),
  };
  const formik = useFormik({
    initialValues: {
      enquiry_type: enq_type,
      productInterestedDesc: [],
      measurement_dt: getInitialDate(),
      country: country?.defaultValue,
      long_name: "",
      email: "",
      phone_number: "",
      urllink: "",
      city: "",
      area: "",
      province_desc: "",
      state: "",
      productInterestedDesc11: [],
      documentfile: "",
      content: "Consultation",
      cad_country: cniso,
      myCountry: cniso,
      i_agree: true,
    },
    validate: (values) => {
      const errors = {};
      if (!values.long_name) {
        errors.long_name = translate("Thisfieldisrequired");
      }

      if (!values.email) {
        errors.email = translate("Thisfieldisrequired");
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = translate("InvalidEmailAddress");
      }

      if (values.productInterestedDesc?.length <= 0) {
        errors.productInterestedDesc = translate("Thisfieldisrequired");
      }

      if (!values.country) {
        errors.country = translate("Thisfieldisrequired");
      }

      if (!values.city) {
        errors.city = translate("Thisfieldisrequired");
      }

      if (!values.area) {
        errors.area = translate("Thisfieldisrequired");
      }

      if (!values.measurement_dt) {
        errors.measurement_dt = translate("Thisfieldisrequired");
      }

      if (!values.province_desc) {
        errors.province_desc = translate("Thisfieldisrequired");
      }

      if (!values.phone_number) {
        errors.phone_number = translate("Thisfieldisrequired");
      } else if (!isValidPhoneNumber(values.phone_number)) {
        errors.phone_number = `${translate("please_enter_a_valid_number")}`;
      }

      return errors;
    },
    onSubmit: async (values) => {
      let formData = new FormData();
      formData.append("source_enquiry", getSourceCookie());

      for (var key in values) {
        if (key == "documentfile") {
          formData.append(
            "documentfile",
            values.documentfile ? values.documentfile[0] : ""
          );
        } else if (key == "productInterestedDesc") {
          let newProductInterestedDesc = [];
          newProductInterestedDesc =
            values?.productInterestedDesc?.length > 0
              ? values?.productInterestedDesc.map((item) => item?.label)
              : [];

          newProductInterestedDesc = newProductInterestedDesc.join(",");
          formData.append("productInterestedDesc", newProductInterestedDesc);
        } else if (key == "productInterestedDesc11") {
          let newProductInterestedDesc11 = [];
          newProductInterestedDesc11 =
            values?.productInterestedDesc11?.length > 0
              ? values?.productInterestedDesc11.map((item) => item?.label)
              : [];
          newProductInterestedDesc11 = newProductInterestedDesc11.join(",");
          formData.append(
            "productInterestedDesc11",
            newProductInterestedDesc11
          );
        } else if (key == "country") {
          formData.append("country", values?.country?.value);
        } else if (key == "city") {
          formData.append("city", values?.city?.value);
        } else if (key == "area") {
          formData.append("area", values?.area?.value);
        } else if (key == "measurement_dt") {
          formData.append(
            "measurement_dt",
            moment(values?.measurement_dt).format("DD-MMM-YYYY")
          );
        } else {
          formData.append(key, values[key]);
        }
      }
      await axiosInstance
        .post(
          `user/enquiry?lang=${langName}&site=${site}&content=EnquiryForm&visitorId=${visitorId}&currency=${CCYCODE}&ccy_decimal=${CCYDECIMALS}&cn_iso=${cniso}`,
          formData
        )
        .then((response) => {
          if (response.status === 200) {
            if (response?.data?.return_status === "0") {
              let page_name = enquiry_t_list[values.enquiry_type]
                ? enquiry_t_list[values.enquiry_type]
                : "done";

              push({
                pathname: `/success/${page_name}`,
                query: { email: values.email },
              });
              var con_type = consultation_type[enq_type]
                ? consultation_type[enq_type]
                : "Lets Connect";
              let consult_type = {
                PRODUCT_DESC: con_type,
                SOL_ITEM_LABEL: "Non_Product",
                SOH_TXN_NO: response.sysid ? response.sysid : 111111,
              };
              admitadOrderedItem(consult_type, con_type); //ADMITAD Order add
              admitadInvoice(consult_type, values?.email); //ADMITAD.Invoice
            }
          }
        })
        .catch((error) => {
          enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
            variant: "error",
          });
        });
    },
  });

  React.useEffect(() => {
    formik.setFieldValue("myCountry", cniso);
    formik.setFieldValue("cad_country", cniso);
  }, [cniso, locale, open]);

  React.useEffect(() => {
    if (
      isSubmitForm &&
      formik?.errors &&
      Object.keys(formik.errors).length > 0 &&
      fieldRefs
    ) {
      const errorFields = [
        "productInterestedDesc",
        "long_name",
        "email",
        "phone_number",
        "country",
        "city",
        "province_desc",
        "subject",
      ];
      for (let field of errorFields) {
        if (formik.errors[field] && fieldRefs[field]?.current) {
          // Get the element
          const element = fieldRefs[field].current;

          // Get element position relative to the viewport
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY; // Calculate element's top position relative to the document

          // Scroll to the element
          window.scrollTo({
            top: elementTop - 200, // Adjust the offset as needed
            behavior: "smooth",
          });
          setIsSubmitForm(false);
          break;
        }
      }
    }
  }, [isSubmitForm, fieldRefs, locale]);

  React.useEffect(() => {
    formik.resetForm();
  }, [locale]);

  const handleSubmitForm = () => {
    formik.handleSubmit();
    if (
      formik?.errors &&
      Object.values(formik.errors).length > 0 &&
      fieldRefs
    ) {
      setIsSubmitForm(true);
    }
  };
  return (
    <Box id="scrollConsultation">
      <Box
        id="direct"
        sx={{
          background: (theme) =>
            isBgColor ? theme.palette.grey[1700] : theme.palette.common.white,
          borderRadius: "0px",
        }}
        py={0}
      >
        <Container>
          {isCloseShow && <CloseButton handleOpenClose={handleOpenClose} />}
          <ConsultationHeading data={formHeading} />
          <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={6} mt={0}>
              {cardData?.map((item, index) => {
                return (
                  <Grid
                    item
                    sx={{
                      display: {
                        md: "block",
                        sm: "block",
                        xs: "none",
                        xxs: "none",
                      },
                      "&.MuiGrid-root": {
                        paddingTop: "20px!important",
                      },
                    }}
                    md={4}
                    sm={6}
                    xs={12}
                    xxs={12}
                    key={`CHECKBOX-${index}`}
                  >
                    <Box sx={{ height: "100%" }}>
                      <CheckedCard
                        title={
                          <Typography
                            component="div"
                            variant="typography16"
                            color="common.black"
                            pb={1}
                          >
                            {item?.title}
                          </Typography>
                        }
                        description={
                          <Typography
                            component="div"
                            variant="typography16"
                            dangerouslySetInnerHTML={{
                              __html: item?.description,
                            }}
                            sx={(theme) => ({
                              "& p": {
                                ...theme.typography.typography16,
                                letterSpacing: 0.5,
                                fontWeight: 400,
                                fontFamily: theme.fontFaces.helveticaNeueLight,
                                marginBlockStart: "0px!important",
                                marginBlockEnd: "0px!important",
                                color: theme.palette.common.black,
                              },
                            })}
                          />
                        }
                        src={item?.image_path}
                        alt={item?.title}
                        width={29}
                        height={29}
                        checked={formik.values.enquiry_type === item.link_url}
                        name="enquiry_type"
                        onClick={() => {
                          formik.setFieldValue("enquiry_type", item.link_url);
                        }}
                        onChange={(e) => {
                          if (e.target.checked) {
                            formik.setFieldValue("enquiry_type", item.link_url);
                          } else {
                            formik.setFieldValue("enquiry_type", item.link_url);
                          }
                        }}
                      />
                    </Box>
                  </Grid>
                );
              })}
              {cardData?.length > 0 && (
                <Grid
                  item
                  sx={{
                    display: {
                      md: "none",
                      sm: "none",
                      xs: "block",
                      xxs: "block",
                    },
                    "&.MuiGrid-item": {
                      pt: "10px!important",
                    },
                  }}
                  xs={12}
                  xxs={12}
                >
                  <Box>
                    <SelectBox
                      fullWidth
                      size="small"
                      label=""
                      name="enquiry_type"
                      value={formik.values.enquiry_type}
                      onChange={formik.handleChange}
                      options={cardData}
                      setLabel="title"
                      setValue="link_url"
                      color="primary"
                      formSx={(theme) => ({
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "white",
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.lighter,
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.lighter,
                          },
                        },
                        "& .MuiSelect-select": {
                          color: theme.palette.primary.light,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary.lighter,
                          borderRadius: "0px",
                          color: theme.palette.primary.light,
                        },
                      })}
                    />
                  </Box>
                </Grid>
              )}

              <Grid item md={12} sm={12} xs={12} xxs={12}>
                <Consultation
                  open={open}
                  formik={formik}
                  fieldRefs={fieldRefs}
                  handleSubmitForm={handleSubmitForm}
                />
                {locale !== "global-en" &&
                  locale !== "global-ar" &&
                  data?.length > 0 &&
                  data[1]?.SUB_CHILD &&
                  data[1]?.SUB_CHILD?.length > 0 && (
                    <Enquiries data={data[1]} />
                  )}
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default ConsultationForm;
