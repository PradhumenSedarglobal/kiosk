import InfoDialogBox from "@/components/dialog/infoDialog";
import { QuantityBox, RadioBox, SelectBox, TextBox } from "@/components/form";
import RadioGroupBox from "@/components/form/radioGroupBox";
import Iconify from "@/components/iconify";
import useResponsive from "@/hooks/useResponsive";
import ColorSelect from "@/modules/product/colorSelect";
import useProduct from "@/provider/product/useProduct";
import { addToCart, updateAddToCart } from "@/redux/slices/product";
import { useDispatch, useSelector } from "@/redux/store";
import {
  ProductCommonList,
  RegexDecimalDigit,
  RegexDigit,
  customMeasurementUnitConversion,
  selectWidthHeightOptionValidation
} from "@/utils/constant";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles"; // Separate import for alpha and styled
import { find, findIndex } from "lodash";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";

const SelectDialogForm = ({
  formik,
  handleOpen,
  handleClose,
  infoDialog,
  handleSetItemData,
  isProductViewDetailRedirect,
}) => {
  const isDownMd = useResponsive("down", "md");
  const StyledTooltip = styled(({ className, theme, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .MuiTooltip-tooltip`]: {
      backgroundColor: alpha(theme.palette.common.black, 0.1),
      color: theme.palette.common.black,
      ...theme.typography.typography14,
      letterSpacing: 0.5,
      textAlign: "center",
      fontFamily: theme.fontFaces.helveticaNeueMedium,
      fontWeight: 200,
      maxWidth: "280px",
      [theme.breakpoints.down("md")]: {
        maxWidth: "340px",
        backgroundColor: alpha(theme.palette.common.white, 1),
      },
    },
    [`& .MuiTooltip-arrow`]: {
      color: alpha(theme.palette.common.black, 0.5),
    },
  }));

  const { isAddToCartLoading, orderCart } = useSelector(
    (state) => state.product
  );
  const { productState, handleChangeProductWidth, handleChangeProductHeight } =
    useProduct();
  const { steps, product_width, product_height, productSelectDialogDetail } =
    productState;
  const [isApiCall, setIsApiCall] = React.useState(false);
  const { query, locale } = useRouter();
  const { slug, min, max } = query;
  const category = slug && slug?.length > 0 ? slug[0] : "";
  const line_sys_id = slug && slug?.length > 3 ? slug[4] : "";
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const [openTooltip, setOpenTooltip] = React.useState(false);

  const handleCloseTooltip = () => {
    setOpenTooltip(false);
  };
  const handleApiCall = () => {
    setIsApiCall(!isApiCall);
  };
  React.useEffect(() => {
    handleApiCall();
  }, []);
  const handleOpenTooltip = () => {
    setOpenTooltip(true);
  };

  const updateCartData = async () => {
    if (
      steps &&
      steps?.result &&
      steps?.return_status == 0 &&
      productSelectDialogDetail &&
      formik?.values?.STEPS
    ) {
      
      // alert();
      if (!steps?.result?.tempOrder?.line_result?.SOL_SYS_ID) {
    
        dispatch(
          addToCart({
            ...formik.values,
            VALUE:
              Math.round(Number(productSelectDialogDetail?.PRICE)) > 1
                ? Math.round(Number(productSelectDialogDetail?.PRICE)) *
                Number(formik.values.quantity)
                : 1,
            canvasImg:
              productSelectDialogDetail?.defaultSelectItem?.gallery[0]
                ?.SLI_IMAGE_PATH,
            meas_unit_selected: formik.values.measuring_unit,
            PRICE: Math.round(Number(productSelectDialogDetail?.PRICE)),
            OLD_PRICE: Math.round(Number(productSelectDialogDetail?.OLD_PRICE)),
            ...steps?.result?.product_info,
            code: productSelectDialogDetail?.defaultSelectItem?.SII_CODE,
            SPI_PR_ITEM_CODE: productSelectDialogDetail?.SPI_PR_ITEM_CODE,
            category_slug: category,
            m_width:
              formik.values.width != "custom"
                ? product_width[formik.values.width_index]?.width
                : Number(formik.values.custom_width) > 0
                  ? customMeasurementUnitConversion(
                    formik.values.measuring_unit,
                    "cm",
                    formik.values.custom_width
                  )
                  : category == "wallpaper"
                    ? null
                    : product_width?.filter(
                      (item) => !item?.isDisabled && item?.isDisabled != undefined
                    )[0]?.width,
            m_height:
              formik.values.height != "custom"
                ? product_height[formik.values.height_index]?.height
                : Number(formik.values.custom_height) > 0
                  ? customMeasurementUnitConversion(
                    formik.values.measuring_unit,
                    "cm",
                    formik.values.custom_height
                  )
                  : category == "wallpaper"
                    ? null
                    : product_height?.filter(
                      (item) => !item?.isDisabled && item?.isDisabled != undefined
                    )[0]?.height,
            count: formik.values.quantity,
            convert_width:
              formik.values.width != "custom"
                ? product_width[formik.values.width_index]?.width
                : Number(formik.values.custom_width) > 0
                  ? formik.values.custom_width
                  : product_width?.filter(
                    (item) => !item?.isDisabled && item?.isDisabled != undefined
                  )[0]?.width,
            convert_height:
              formik.values.height != "custom"
                ? product_height[formik.values.height_index]?.height
                : Number(formik.values.custom_height) > 0
                  ? formik.values.custom_height
                  : product_height?.filter(
                    (item) => !item?.isDisabled && item?.isDisabled != undefined
                  )[0]?.height,
            om_width: formik.values.custom_width,
            om_height: formik.values.custom_height,
            cart_status: line_sys_id ? "COMPLETED" : "INCOMPLETE",
            item_label: category == "wallpaper" ? "ADD_TO_CART" : "QUICK_BUY",
            sys_id: line_sys_id,
          })
        );
        handleApiCall();
      } else {
       
        dispatch(
          updateAddToCart({
            SOL_SYS_ID: steps?.result?.tempOrder?.line_result?.SOL_SYS_ID,
            values: {
              ...formik.values,
              meas_unit_selected: formik.values.measuring_unit,
              PRICE: Math.round(Number(productSelectDialogDetail?.PRICE)),
              OLD_PRICE: Math.round(
                Number(productSelectDialogDetail?.OLD_PRICE)
              ),
              canvasImg:
                productSelectDialogDetail?.defaultSelectItem?.gallery[0]
                  ?.SLI_IMAGE_PATH,
              ...steps?.result?.product_info,
              VALUE:
                Math.round(Number(productSelectDialogDetail?.PRICE)) > 1
                  ? Math.round(Number(productSelectDialogDetail?.PRICE)) *
                  Number(formik.values.quantity)
                  : 1,
              category_slug: category,
              code: productSelectDialogDetail?.defaultSelectItem?.SII_CODE,
              SPI_PR_ITEM_CODE: productSelectDialogDetail?.SPI_PR_ITEM_CODE,
              m_width:
                formik.values.width != "custom"
                  ? product_width[formik.values.width_index]?.width
                  : Number(formik.values.custom_width) > 0
                    ? customMeasurementUnitConversion(
                      formik.values.measuring_unit,
                      "cm",
                      formik.values.custom_width
                    )
                    : category == "wallpaper"
                      ? null
                      : product_width?.filter(
                        (item) =>
                          !item?.isDisabled && item?.isDisabled != undefined
                      )[0]?.width,
              m_height:
                formik.values.height != "custom"
                  ? product_height[formik.values.height_index]?.height
                  : Number(formik.values.custom_height) > 0
                    ? customMeasurementUnitConversion(
                      formik.values.measuring_unit,
                      "cm",
                      formik.values.custom_height
                    )
                    : category == "wallpaper"
                      ? null
                      : product_height?.filter(
                        (item) =>
                          !item?.isDisabled && item?.isDisabled != undefined
                      )[0]?.height,
              count: formik.values.quantity,
              convert_width:
                formik.values.width != "custom"
                  ? product_width[formik.values.width_index]?.width
                  : Number(formik.values.custom_width) > 0
                    ? formik.values.custom_width
                    : product_width?.filter(
                      (item) =>
                        !item?.isDisabled && item?.isDisabled != undefined
                    )[0]?.width,
              convert_height:
                formik.values.height != "custom"
                  ? product_height[formik.values.height_index]?.height
                  : Number(formik.values.custom_height) > 0
                    ? formik.values.custom_height
                    : product_height?.filter(
                      (item) =>
                        !item?.isDisabled && item?.isDisabled != undefined
                    )[0]?.height,
              om_width: formik.values.custom_width,
              om_height: formik.values.custom_height,
              cart_status: line_sys_id ? "COMPLETED" : "INCOMPLETE",
              item_label: category == "wallpaper" ? "ADD_TO_CART" : "QUICK_BUY",
              sys_id: line_sys_id,
            },
          })
        );
        handleApiCall();
      }
    }
  };

  React.useEffect(() => {
    if (isApiCall) {
      // const timeout = setTimeout(() => {
        updateCartData();
      // }, 500);
      // return () => clearTimeout(timeout);
    }
  }, [formik.values, line_sys_id, steps?.result, isApiCall]);

  const measureUnit = [
    {
      value: "mm",
      label: translate("mm"),
    },
    {
      value: "cm",
      label: translate("cm"),
    },
    {
      value: "inch",
      label: translate("inch"),
    },
  ];


  const setDefaultWidthHeight = () => {
    if (min) {
      const getWidth = find(product_width, { width: min });

      if (getWidth) {
        formik.setFieldValue("width", getWidth?.value);
      } else {
        formik.setFieldValue("width", "custom");
        formik.setFieldValue("custom_width", min);
      }

      const getIndexOfValueWidth = findIndex(product_width, {
        width: formik.values.width,
      });
      if (getIndexOfValueWidth > -1) {
        formik.setFieldValue("width_index", getIndexOfValueWidth);
      }
    }

    if (max) {
      const getHeight = find(product_height, {
        height: max,
      });
      if (getHeight) {
        formik.setFieldValue("height", getHeight?.value);
      } else {
        formik.setFieldValue("height", "custom");
        formik.setFieldValue("custom_height", max);
      }

      const getIndexOfValueHeight = findIndex(product_height, {
        height: formik.values.height,
      });
      if (getIndexOfValueHeight > -1) {
        formik.setFieldValue("height_index", getIndexOfValueHeight);
      }
    }
  };

  React.useEffect(() => {
    // const timeout = setTimeout(() => {
      if (min || max) {
        setDefaultWidthHeight();
      }
    // }, 1500);
    // return () => clearTimeout(timeout);
  }, [min, max]);

  const handleChangeSteps = (keyName, value) => {
    let steps = {};

    formik.values.STEPS &&
      Object.values(formik.values.STEPS || {})?.length > 0 &&
      Object.values(formik.values.STEPS)?.forEach((element) => {
        if (element?.SS_CODE_NAME == keyName && keyName == "MEASUREMENT") {
          steps[element?.SS_CODE_NAME] = {
            ...element,
            ...value,
          };
        } else if (category == "wallpaper") {
          steps[element?.SS_CODE_NAME] = {
            ...element,
            ...value,
          };
        } else if (element?.SS_CODE_NAME == keyName) {
          steps[element?.SS_CODE_NAME] = {
            ...value,
          };
        } else {
          steps[element?.SS_CODE_NAME] = { ...element };
        }
      });

    formik.setFieldValue("STEPS", steps);
  };

  React.useEffect(() => {
    if (category == "wallpaper" && orderCart?.result?.SOL_QTY) {
      let quantity =
        Number(orderCart?.result?.SOL_QTY) || formik.values.quantity;
      formik.setFieldValue("quantity", quantity);
    }
  }, [orderCart?.result?.SOL_QTY]);
  const breakpoints = {
    320: {
      slidesPerView: 8, // xxs
    },
    420: {
      slidesPerView: 8, // xs
    },
    576: {
      slidesPerView: 8, // xs
    },
    768: {
      slidesPerView: 18, // sm
    },
    1100: {
      slidesPerView: 7.3, // sm
    },
  };
  const maxWidth = "100%!important";
  return (
    <>
      <Box>
        <Grid container spacing={{ lg: 1.4, md: 1.4, sm: 0.5, xxs: 0.5 }}>
          {!formik.values.toggle && (
            <Grid item md={6} sm={6} xs={6} xxs={12}>
              {steps?.result &&
                steps?.result?.STEPS &&
                steps?.result?.STEPS?.length > 0 &&
                steps?.result?.STEPS.map((item, index) => {
                  if (
                    ["MEASUREMENT", "ROLL_CALCULATION"].indexOf(
                      item.SS_CODE_NAME
                    ) >= 0
                  ) {
                    return (
                      <RadioGroupBox
                        key={`${item.SS_CODE_NAME}-${index}`}
                        fullWidth={true}
                        row
                        radioGroupSx={{
                          justifyContent: {
                            md: "left",
                            sm: "left",
                            xs: "space-evenly",
                            xxs: "space-evenly",
                          },
                        }}
                        onBlur={formik.handleBlur}
                        name="measuring_unit"
                        value={formik?.values.measuring_unit}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "measuring_unit",
                            e.target.value
                          );
                          if (formik.values.width != "custom") {
                            let measurementWidth = ProductCommonList({
                              data:
                                productSelectDialogDetail &&
                                  productSelectDialogDetail?.SPI_WIDTH_STANDARD
                                  ? productSelectDialogDetail?.SPI_WIDTH_STANDARD.split(
                                    ","
                                  )
                                  : [],
                              measuring_unit: e.target.value,
                              SPI_RESTRICT_TO_MATERIAL_COMMON_YN:
                                steps?.result?.product_info
                                  ?.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN,
                              SII_COMMON: steps?.result?.product_info
                              ?.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN == 'Y' ? formik?.values.pro_max_width :
                                productSelectDialogDetail?.defaultSelectItem?.SII_WIDTH,
                              keyName: "width",
                              translate,
                            });

                            if (
                              Number(formik.values.width_index) > -1 &&
                              measurementWidth?.length > 0 &&
                              formik.values.width != "custom"
                            ) {
                              formik.setFieldTouched("width", false);
                              formik.setFieldValue(
                                "width",
                                measurementWidth[formik.values.width_index]
                                  ?.value
                              );
                            }

                            handleChangeProductWidth(measurementWidth);
                          }

                          if (formik.values.height != "custom") {
                            let measurementHeight = ProductCommonList({
                              data:
                                productSelectDialogDetail &&
                                  productSelectDialogDetail?.SPI_HEIGHT_STANDARD
                                  ? productSelectDialogDetail?.SPI_HEIGHT_STANDARD.split(
                                    ","
                                  )
                                  : [],
                              measuring_unit: e.target.value,
                              SPI_RESTRICT_TO_MATERIAL_COMMON_YN:
                                steps?.result?.product_info
                                  ?.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN,
                              SII_COMMON: steps?.result?.product_info
                              ?.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN == 'Y' ? formik?.values.pro_max_height :
                                productSelectDialogDetail?.defaultSelectItem?.SII_LENGTH,
                              keyName: "height",
                              translate,
                            });
                            if (
                              Number(formik.values.height_index) > -1 &&
                              measurementHeight?.length > 0 &&
                              formik.values.height != "custom"
                            ) {
                              formik.setFieldTouched("height", false);
                              formik.setFieldValue(
                                "height",
                                measurementHeight[formik.values.height_index]
                                  ?.value
                              );
                            }
                            handleChangeProductHeight(measurementHeight);
                          }

                          if (
                            formik.values.width == "custom" &&
                            formik.values.custom_width
                          ) {
                            formik.setFieldValue(
                              "custom_width",
                              customMeasurementUnitConversion(
                                formik.values.measuring_unit,
                                e.target.value,
                                formik.values.custom_width
                              )
                            );
                          }

                          if (
                            formik.values.height == "custom" &&
                            formik.values.custom_height
                          ) {
                            formik.setFieldValue(
                              "custom_height",
                              customMeasurementUnitConversion(
                                formik.values.measuring_unit,
                                e.target.value,
                                formik.values.custom_height
                              )
                            );
                          }

                          handleChangeSteps(item.SS_CODE_NAME, {
                            m_width: product_width[formik.values.width_index]
                              ? product_width[formik.values.width_index]
                                ?.value == "custom"
                                ? formik.values.custom_width
                                : product_width[formik.values.width_index]
                                  ?.width
                              : "",
                            m_height: product_height[formik.values.height_index]
                              ? product_height[formik.values.height_index]
                                ?.value == "custom"
                                ? formik.values.custom_height
                                : product_height[formik.values.height_index]
                                  ?.height
                              : "",
                          });
                        }}
                        headerLabel={translate("MeasuringUnit")}
                        data={measureUnit}
                        size="small"
                        formLabelSx={(theme) => ({
                          ...theme.typography.typography14,
                          fontFamily: theme.fontFaces.helveticaNeueMedium,
                          color: theme.palette.common.black,
                          mt: "2px",
                        })}
                        radioLabelSx={(theme) => ({
                          "& .MuiFormControlLabel-label": {
                            ...theme.typography.typography18,
                            fontFamily: theme.fontFaces.helveticaNeue,
                            color: theme.palette.common.black,
                          },
                        })}
                      />
                    );
                  }
                })}
            </Grid>
          )}
          <Grid
            item
            md={!formik.values.toggle ? 6 : 12}
            sm={!formik.values.toggle ? 6 : 12}
            xs={!formik.values.toggle ? 6 : 12}
            xxs={12}
          >
            <Stack width="100%">
              <QuantityBox
                size="small"
                fullWidth={!formik.values.toggle ? true : false}
                name="quantity"
                value={formik.values.quantity}
                onChange={(e) => {
                  handleApiCall();
                  if (Number(e.target.value) >= 0) {
                    formik.setFieldValue("quantity", e.target.value);
                    // debounceUpdateCart();
                  }
                  if (category == "wallpaper") {
                    formik.setFieldValue("toggle", true);

                    formik.setFieldValue("width", "custom");

                    formik.setFieldValue("height", "custom");

                    formik.setFieldValue("custom_width", "");
                    formik.setFieldValue("custom_height", "");
                    formik.setFieldValue(
                      "width_index",
                      ...[product_width?.length - 1]
                    );
                    formik.setFieldValue(
                      "height_index",
                      ...[product_height?.length - 1]
                    );
                  }
                }}
                onBlur={formik.handleBlur}
                color="dark"
                label={translate("Quantity")}
                formLabelSx={(theme) => ({
                  ...theme.typography.typography14,
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  color: theme.palette.common.black,
                  width: "100%",
                })}
                inputSx={(theme) => ({
                  "& .MuiOutlinedInput-input": {
                    padding: "8.5px 14px !important",
                    textAlign: "center",
                  },
                  "& .Mui-disabled": {
                    ...theme.typography.typography15,
                    fontFamily: theme.fontFaces.helveticaNeueBold,
                    color: theme.palette.common.black,
                    WebkitTextFillColor: (theme) =>
                      `${theme.palette.common.black} !important`,
                  },
                })}
                decrementQuantity={() => {
                  if (formik.values.quantity > 1) {
                    handleApiCall();
                    formik.setFieldValue(
                      "quantity",
                      Number(formik.values.quantity) - 1
                    );
                  }
                  if (category == "wallpaper") {
                    formik.setFieldValue("toggle", true);

                    formik.setFieldValue("width", "custom");

                    formik.setFieldValue("height", "custom");

                    formik.setFieldValue("custom_width", "");
                    formik.setFieldValue("custom_height", "");

                    formik.setFieldValue(
                      "width_index",
                      ...[product_width?.length - 1]
                    );
                    formik.setFieldValue(
                      "height_index",
                      ...[product_height?.length - 1]
                    );
                  }
                }}
                incrementQuantity={() => {
                  handleApiCall();
                  formik.setFieldValue(
                    "quantity",
                    Number(formik.values.quantity) + 1
                  );
                  if (category == "wallpaper") {
                    formik.setFieldValue("toggle", true);

                    formik.setFieldValue("width", "custom");

                    formik.setFieldValue("height", "custom");
                    formik.setFieldValue("m_width", "");
                    formik.setFieldValue("m_height", "");

                    formik.setFieldValue("custom_width", "");
                    formik.setFieldValue("custom_height", "");

                    formik.setFieldValue(
                      "width_index",
                      ...[product_width?.length - 1]
                    );
                    formik.setFieldValue(
                      "height_index",
                      ...[product_height?.length - 1]
                    );
                  }
                }}
                textBoxDisabled={true}
              />

              {steps?.result &&
                steps?.result?.STEPS &&
                steps?.result?.STEPS?.length > 0 &&
                steps?.result?.STEPS.map((item, index) => {
                  if (
                    ["ROLL_CALCULATION"].indexOf(item.SS_CODE_NAME) >= 0 &&
                    formik.values.toggle
                  ) {
                    return (
                      <Box component="div" key={`ROLL_CALCULATION-${index}`}>
                        {["ROLL_CALCULATION"].indexOf(item.SS_CODE_NAME) >=
                          0 && (
                            <>
                              <Typography
                                component="p"
                                variant="typography14"
                                fontFamily={(theme) =>
                                  theme.fontFaces.helveticaNeueMedium
                                }
                              >
                                {translate("click_here_required_rolls")}
                              </Typography>
                              <IconButton
                                onClick={() => {
                                  formik.setFieldValue("toggle", false);
                                }}
                                color="dark"
                              >
                                <Iconify icon="mdi:calculator" width={30} />
                              </IconButton>
                            </>
                          )}
                      </Box>
                    );
                  }
                })}
            </Stack>
          </Grid>
          {!formik.values.toggle && orderCart && (
            <>
              {steps?.result &&
                steps?.result?.STEPS &&
                steps?.result?.STEPS?.length > 0 &&
                steps?.result?.STEPS.map((item, index) => {
                  if (
                    ["ROLL_CALCULATION"].indexOf(item.SS_CODE_NAME) >= 0 &&
                    !formik.values.toggle
                  ) {
                    return (
                      <Grid
                        item
                        key={`PARENT-ROLL_CALCULATION-${index}`}
                        md={12}
                        sm={12}
                        xs={12}
                        xxs={12}
                      >
                        <Box component="div">
                          {["ROLL_CALCULATION"].indexOf(item.SS_CODE_NAME) >=
                            0 && (
                              <>
                                <Typography
                                  component="p"
                                  variant="typography14"
                                  fontFamily={(theme) =>
                                    theme.fontFaces.helveticaNeueMedium
                                  }
                                  color="error"
                                >
                                  {translate("recommended_roll_msg", {
                                    roll: orderCart?.result?.ROLL_CALC,
                                  })}
                                </Typography>
                              </>
                            )}
                        </Box>
                      </Grid>
                    );
                  }
                })}
              <Grid item lg={6} md={6} sm={6} xs={6} xxs={12}>
                <Stack spacing={0.5}>
                  <FormLabel
                    sx={(theme) => ({
                      ...theme.typography.typography14,
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      color: theme.palette.common.black,
                    })}
                  >
                    {translate(
                      category == "wallpaper" ? "wall_Width" : "Width"
                    )}
                  </FormLabel>
                  <SelectBox
                    onBlur={formik.handleBlur}
                    size="small"
                    fullWidth={true}
                    name="width"
                    value={formik.values.width}
                    onChange={(e) => {
                      formik.setFieldValue("width", e.target.value);
                      formik.setFieldValue("custom_width", "");

                      const getIndexOfValue = findIndex(product_width, {
                        value: e.target.value,
                      });
                      if (getIndexOfValue > -1) {
                        formik.setFieldValue("width_index", getIndexOfValue);
                        handleChangeSteps("MEASUREMENT", {
                          m_width: product_width[getIndexOfValue]
                            ? product_width[getIndexOfValue]?.value == "custom"
                              ? 0
                              : product_width[getIndexOfValue]?.width
                            : "",
                        });
                      }
                      if (
                        selectWidthHeightOptionValidation(
                          steps?.result?.STEPS,
                          formik.values,
                          e.target.value != "custom"
                            ? product_width[getIndexOfValue]?.width
                            : formik.values.custom_width
                              ? formik.values.custom_width
                              : 0
                        )
                      ) {
                        if (e.target.value != "custom") {
                          formik.setFieldError(
                            "width",
                            translate("PleaseEnterValidWidth")
                          );
                          formik.setFieldTouched("width", true);
                        } else {
                          formik.setFieldError(
                            "custom_width",
                            translate("PleaseEnterValidWidth")
                          );
                          formik.setFieldTouched("custom_width", true);
                        }
                      } else {
                        if (e.target.value != "custom") {
                          formik.setFieldTouched("width", false);
                          formik.setFieldError("width", "");
                        } else {
                          formik.setFieldTouched("custom_width", false);
                          formik.setFieldError("custom_width", "");
                        }
                      }
                      handleApiCall();
                    }}
                    options={product_width || []}
                    helperText={formik.touched.width && formik.errors.width}
                  />
                </Stack>
              </Grid>
              {formik.values.width === "custom" && isDownMd && (
                <Grid item lg={6} md={6} sm={6} xs={6} xxs={12}>
                  <Stack spacing={0.5}>
                    <FormLabel
                      sx={(theme) => ({
                        ...theme.typography.typography14,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        color: theme.palette.common.black,
                      })}
                    >
                      {translate(
                        category == "wallpaper"
                          ? "wall_EnterWidth"
                          : "EnterWidth"
                      )}
                    </FormLabel>
                    <TextBox
                      onBlur={formik.handleBlur}
                      size="small"
                      fullWidth={true}
                      name="custom_width"
                      value={formik.values.custom_width}
                      onChange={(e) => {
                        if (!isAddToCartLoading) {
                          let DigitRegex = RegexDigit;
                          if (formik.values.measuring_unit == "inch") {
                            DigitRegex = RegexDecimalDigit;
                          } else {
                            DigitRegex = RegexDigit;
                          }
                          let newValue = e.target.value.replace(DigitRegex, "");
                          if (Number(e.target.value) <= Number(formik.values.pro_max_width)) {
                            formik.setFieldValue("custom_width", newValue);
                            formik.setFieldValue("custom_width", newValue);
                            if (newValue != formik.values.custom_width) {
                              handleChangeSteps("MEASUREMENT", {
                                m_width: newValue || 0,
                              });
                            }
                          }

                          if (
                            Number(newValue || 0) >
                            Number(formik.values.pro_max_width)
                          ) {
                            formik.setFieldTouched("custom_width", true);
                            formik.setFieldError(
                              "custom_width",
                              translate("PleaseEnterValidWidth")
                            );
                          } else {
                            formik.setFieldTouched("custom_width", false);
                            formik.setFieldError("custom_width", "");
                          }

                          if (
                            Number(newValue || 0) >=
                            Number(formik.values.pro_min_width) &&
                            Number(newValue || 0) <=
                            Number(formik.values.pro_max_width)
                          ) {
                            handleApiCall();
                          }
                        }
                      }}
                      helperText={
                        formik.touched.custom_width &&
                        formik.errors.custom_width
                      }
                    />
                    <Typography variant="typography12">
                      {translate("pro_min_max_width", {
                        pro_min_width: formik?.values?.pro_min_width,
                        pro_max_width: formik?.values?.pro_max_width,
                        meas_unit_selected: translate(
                          formik.values.measuring_unit
                        ),
                      })}
                    </Typography>
                  </Stack>
                </Grid>
              )}
              <Grid item md={6} sm={6} xs={6} xxs={12}>
                <Stack spacing={0.5}>
                  <FormLabel
                    sx={(theme) => ({
                      ...theme.typography.typography14,
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      color: theme.palette.common.black,
                    })}
                  >
                    {translate(
                      category == "wallpaper" ? "wall_Height" : "Height"
                    )}
                  </FormLabel>
                  <SelectBox
                    onBlur={formik.handleBlur}
                    size="small"
                    fullWidth={true}
                    name="height"
                    value={formik.values.height}
                    onChange={(e) => {
                      formik.setFieldValue("height", e.target.value);
                      formik.setFieldValue("custom_height", "");

                      const getIndexOfValue = findIndex(product_height, {
                        value: e.target.value,
                      });
                      if (getIndexOfValue > -1) {
                        formik.setFieldValue("height_index", getIndexOfValue);
                        handleChangeSteps("MEASUREMENT", {
                          m_height: product_height[getIndexOfValue]
                            ? product_height[getIndexOfValue]?.value == "custom"
                              ? 0
                              : product_height[getIndexOfValue]?.height
                            : "",
                        });
                      }
                      handleApiCall();
                    }}
                    options={product_height}
                    helperText={formik.touched.height && formik.errors.height}
                  />
                </Stack>
              </Grid>

              {formik.values.width === "custom" && (
                <Grid
                  item
                  md={6}
                  sm={6}
                  xs={6}
                  xxs={6}
                  sx={{
                    display: {
                      lg: "block",
                      md: "block",
                      sm: "none",
                      xs: "none",
                      xxs: "none",
                    },
                  }}
                >
                  <Stack spacing={0.5}>
                    <FormLabel
                      sx={(theme) => ({
                        ...theme.typography.typography14,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        color: theme.palette.common.black,
                      })}
                    >
                      {translate(
                        category == "wallpaper"
                          ? "wall_EnterWidth"
                          : "EnterWidth"
                      )}
                    </FormLabel>
                    <TextBox
                      onBlur={formik.handleBlur}
                      size="small"
                      fullWidth={true}
                      name="custom_width"
                      value={formik.values.custom_width}
                      onChange={(e) => {
                        if (!isAddToCartLoading) {
                          let DigitRegex = RegexDigit;
                          if (formik.values.measuring_unit == "inch") {
                            DigitRegex = RegexDecimalDigit;
                          } else {
                            DigitRegex = RegexDigit;
                          }
                          let newValue = e.target.value.replace(DigitRegex, "");
                          if (
                            Number(e.target.value) <=
                            Number(formik.values.pro_max_width)
                          ) {
                            formik.setFieldValue("custom_width", newValue);
                            formik.setFieldValue("custom_width", newValue);
                            if (newValue != formik.values.custom_width) {
                              handleChangeSteps("MEASUREMENT", {
                                m_width: newValue || 0,
                              });
                            }
                          }

                          if (
                            Number(newValue || 0) >
                            Number(formik.values.pro_max_width)
                          ) {
                            formik.setFieldTouched("custom_width", true);
                            formik.setFieldError(
                              "custom_width",
                              translate("PleaseEnterValidWidth")
                            );
                          } else {
                            formik.setFieldTouched("custom_width", false);
                            formik.setFieldError("custom_width", "");
                          }

                          if (
                            Number(newValue || 0) >=
                            Number(formik.values.pro_min_width) &&
                            Number(newValue || 0) <=
                            Number(formik.values.pro_max_width)
                          ) {
                            handleApiCall();
                          }
                        }
                      }}
                      helperText={
                        formik.touched.custom_width &&
                        formik.errors.custom_width
                      }
                    />
                    <Typography variant="typography12">
                      {translate("pro_min_max_width", {
                        pro_min_width: formik?.values?.pro_min_width,
                        pro_max_width: formik?.values?.pro_max_width,
                        meas_unit_selected: translate(
                          formik.values.measuring_unit
                        ),
                      })}
                    </Typography>
                  </Stack>
                </Grid>
              )}
              {formik.values.width === "custom" &&
                formik.values.height !== "custom" && (
                  <Grid item md={6} sm={6} xs={6} xxs={6} />
                )}
              {formik.values.height === "custom" &&
                formik.values.width !== "custom" && (
                  <Grid item md={6} sm={6} xs={6} xxs={6} />
                )}
              {formik.values.height === "custom" && (
                <Grid item lg={6} md={6} sm={6} xs={6} xxs={12}>
                  <Stack spacing={0.5}>
                    <FormLabel
                      sx={(theme) => ({
                        ...theme.typography.typography14,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        color: theme.palette.common.black,
                      })}
                    >
                      {translate(
                        category == "wallpaper" ? "wall_Height" : "Height"
                      )}
                    </FormLabel>
                    <TextBox
                      onBlur={formik.handleBlur}
                      size="small"
                      fullWidth={true}
                      name="custom_height"
                      value={formik.values.custom_height}
                      onChange={(e) => {
                        if (!isAddToCartLoading) {
                          let DigitRegex = RegexDigit;
                          if (formik.values.measuring_unit == "inch") {
                            DigitRegex = RegexDecimalDigit;
                          } else {
                            DigitRegex = RegexDigit;
                          }
                          let newValue = e.target.value.replace(DigitRegex, "");
                          if (
                            Number(e.target.value) <=
                            Number(formik.values.pro_max_height)
                          ) {
                            formik.setFieldValue("custom_height", newValue);
                            if (newValue != formik.values.custom_height) {
                              handleChangeSteps("MEASUREMENT", {
                                m_height: newValue || 0,
                              });
                            }
                          }
                          if (
                            Number(newValue || 0) >
                            Number(formik.values.pro_max_height)
                          ) {
                            formik.setFieldTouched("custom_height", true);
                            formik.setFieldError(
                              "custom_height",
                              translate("PleaseEnterValidHeight")
                            );
                          } else {
                            formik.setFieldTouched("custom_height", false);
                            formik.setFieldError("custom_height", "");
                          }
                          if (
                            Number(newValue || 0) >=
                            Number(formik.values.pro_min_height) &&
                            Number(newValue || 0) <=
                            Number(formik.values.pro_max_height)
                          ) {
                            handleApiCall();
                          }
                        }
                      }}
                      helperText={
                        formik.touched.custom_height &&
                        formik.errors.custom_height
                      }
                    // disabled={isAddToCartLoading}
                    />
                    <Typography variant="typography12">
                      {translate("pro_min_max_height", {
                        pro_min_height: formik?.values?.pro_min_height,
                        pro_max_height: formik?.values?.pro_max_height,
                        meas_unit_selected: translate(
                          formik.values.measuring_unit
                        ),
                      })}
                    </Typography>
                  </Stack>
                </Grid>
              )}
              {["100585", "101057", "101060"].indexOf(
                productSelectDialogDetail?.SPI_SC_SYS_ID
              ) >= 0 && (
                  <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
                    <Typography
                      sx={(theme) => ({
                        fontSize: theme.typography.typography14,
                        color: theme.palette.primary.main,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        lineHeight: "23px",
                        fontWeight: 400,
                      })}
                    >
                      {translate("disclaimer_for_blind")}
                    </Typography>
                  </Grid>
                )}

              <Grid item xxs={12} mt={1.5}>
                <Divider color="lightgrey" sx={{ my: 0 }} />
              </Grid>
            </>
          )}
          <Grid item xxs={12}>
            <Stack spacing={1.4}>
              <Box>
                {steps?.result &&
                  steps?.result?.STEPS &&
                  steps?.result?.STEPS?.length > 0 &&
                  steps?.result?.STEPS.filter(
                    (item) => item?.SS_CODE_NAME != "MEASUREMENT"
                  ).map((item, index) => {
                    if (["CONTROL_TYPE"].indexOf(item.SS_CODE_NAME) >= 0) {
                      return (
                        <Grid
                          container
                          columnSpacing={4}
                          key={`${item.SS_CODE_NAME}-${index}`}
                        >
                          <Grid item xxs={12}>
                            <Stack
                              spacing={0.5}
                              direction="row"
                              alignItems="center"
                            >
                              <FormLabel
                                sx={(theme) => ({
                                  ...theme.typography.typography14,
                                  fontFamily:
                                    theme.fontFaces.helveticaNeueMedium,
                                  color: theme.palette.common.black,
                                })}
                              >
                                {item?.SPS_DESC}
                              </FormLabel>
                              {item?.SPI_FEATURES && (
                                <IconButton
                                  size="small"
                                  onClick={() => handleOpen(item)}
                                >
                                  <Iconify
                                    icon="material-symbols-light:info-outline"
                                    sx={{
                                      color: (theme) =>
                                        theme.palette.dark.darker,
                                    }}
                                  />
                                </IconButton>
                              )}
                            </Stack>
                          </Grid>
                          {item?.CHILD_STEP &&
                            item?.CHILD_STEP?.length > 0 &&
                            item?.CHILD_STEP.map((childItem, childIndex) => {
                              let min_with_value =
                                formik.values.measuring_unit == "inch"
                                  ? (
                                    Number(childItem.SPS_MIN_WIDTH || 0) *
                                    Number(formik.values.meas_unit_val || 0)
                                  ).toFixed(2)
                                  : Number(childItem.SPS_MIN_WIDTH || 0) *
                                  Number(formik.values.meas_unit_val || 0);
                              let compareWidth =
                                formik.values.width != "custom"
                                  ? formik.values.width
                                  : Number(formik.values.custom_width || 0)
                                    ? Number(formik.values.custom_width || 0)
                                    : 0;

                              let SPS_MIN_WIDTH =
                                formik.values.measuring_unit == "inch"
                                  ? Number(childItem.SPS_MIN_WIDTH || 0) *
                                  Number(formik.values.meas_unit_val)
                                  : Number(childItem.SPS_MIN_WIDTH || 0) *
                                  Number(formik.values.meas_unit_val);

                              return (
                                <Grid
                                  item
                                  md={6}
                                  sm={6}
                                  xs={6}
                                  xxs={12}
                                  key={`${childItem?.SPS_DESC}-${index}-${childIndex}`}
                                >
                                  <RadioBox
                                    fullWidth
                                    name={item?.SS_CODE_NAME}
                                    value={
                                      formik.values[item?.SS_CODE_NAME] ==
                                      childItem?.SPS_SYS_ID
                                    }
                                    checked={
                                      formik.values[item?.SS_CODE_NAME] ==
                                      childItem?.SPS_SYS_ID
                                    }
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        formik.setFieldValue(
                                          item?.SS_CODE_NAME,
                                          childItem?.SPS_SYS_ID
                                        );
                                        handleChangeSteps(item.SS_CODE_NAME, {
                                          ...childItem,
                                        });
                                        handleApiCall();
                                      }
                                    }}
                                    onBlur={formik.handleBlur}
                                    label={
                                      <>
                                        <Stack
                                          direction="row"
                                          alignItems="center"
                                          spacing={0.5}
                                        >
                                          <Typography
                                            variant="typography14"
                                            component="p"
                                            sx={(theme) => ({
                                              fontFamily:
                                                theme.fontFaces.helveticaNeue,
                                              color: theme.palette.common.black,
                                            })}
                                          >
                                            {childItem?.SPS_DESC}
                                          </Typography>
                                          <IconButton
                                            size="small"
                                            onClick={() =>
                                              handleOpen(childItem)
                                            }
                                          >
                                            <Iconify
                                              icon="material-symbols-light:info-outline"
                                              sx={{
                                                color: (theme) =>
                                                  theme.palette.dark.darker,
                                              }}
                                            />
                                          </IconButton>
                                        </Stack>
                                      </>
                                    }
                                    formSx={{
                                      "&.MuiFormControlLabel-root": {
                                        justifyContent: "left",
                                        mr: 0,
                                      },
                                    }}
                                    disabled={
                                      SPS_MIN_WIDTH &&
                                      Number(compareWidth) > -1 &&
                                      parseInt(SPS_MIN_WIDTH) >
                                      parseInt(compareWidth)
                                    }
                                  />
                                  {SPS_MIN_WIDTH &&
                                    String(compareWidth) &&
                                    parseInt(SPS_MIN_WIDTH) >
                                    parseInt(compareWidth) ? (
                                    <Typography
                                      component="p"
                                      variant="typography14"
                                      color="error"
                                      fontFamily={(theme) =>
                                        theme.fontFaces.helveticaNeueMedium
                                      }
                                    >
                                      {translate("min_width_validation", {
                                        min: min_with_value,
                                        unit: translate(
                                          formik.values.measuring_unit
                                        ),
                                      })}
                                    </Typography>
                                  ) : (
                                    ""
                                  )}
                                </Grid>
                              );
                            })}
                          <Grid item xxs={12} mt={0}>
                            <Divider color="lightgrey" sx={{ my: 2 }} />
                          </Grid>
                        </Grid>
                      );
                    }
                  })}
              </Box>
            </Stack>
          </Grid>
          <Grid item xxs={12}>
            <Stack spacing={1.4}>
              <Box>
                {steps?.result &&
                  steps?.result?.STEPS &&
                  steps?.result?.STEPS?.length > 0 &&
                  steps?.result?.STEPS.filter(
                    (item) => item?.SS_CODE_NAME != "MEASUREMENT"
                  ).map((item, index) => {
                    if (["VALANCE_OPTION"].indexOf(item.SS_CODE_NAME) >= 0) {
                      return (
                        <Grid
                          container
                          columnSpacing={4}
                          key={`${item.SS_CODE_NAME}-${index}`}
                        >
                          <Grid item xxs={12}>
                            <Stack
                              spacing={0.5}
                              direction="row"
                              alignItems="center"
                            >
                              <FormLabel
                                sx={(theme) => ({
                                  ...theme.typography.typography14,
                                  fontFamily:
                                    theme.fontFaces.helveticaNeueMedium,
                                  color: theme.palette.common.black,
                                })}
                              >
                                {item?.SPS_DESC}
                              </FormLabel>
                              {item?.SPI_FEATURES && (
                                <IconButton
                                  size="small"
                                  onClick={() => handleOpen(item)}
                                >
                                  <Iconify
                                    icon="material-symbols-light:info-outline"
                                    sx={{
                                      color: (theme) =>
                                        theme.palette.dark.darker,
                                    }}
                                  />
                                </IconButton>
                              )}
                            </Stack>
                          </Grid>
                          {item?.CHILD_STEP &&
                            item?.CHILD_STEP?.length > 0 &&
                            item?.CHILD_STEP.map((childItem, childIndex) => {
                              let min_with_value =
                                formik.values.measuring_unit == "inch"
                                  ? (
                                    Number(childItem.SPS_MIN_WIDTH || 0) *
                                    Number(formik.values.meas_unit_val || 0)
                                  ).toFixed(2)
                                  : Number(childItem.SPS_MIN_WIDTH || 0) *
                                  Number(formik.values.meas_unit_val || 0);
                              let compareWidth =
                                formik.values.width != "custom"
                                  ? formik.values.width
                                  : Number(formik.values.custom_width || 0)
                                    ? Number(formik.values.custom_width || 0)
                                    : 0;

                              let SPS_MIN_WIDTH =
                                formik.values.measuring_unit == "inch"
                                  ? Number(childItem.SPS_MIN_WIDTH || 0) *
                                  Number(formik.values.meas_unit_val)
                                  : Number(childItem.SPS_MIN_WIDTH || 0) *
                                  Number(formik.values.meas_unit_val);
                              return (
                                <Grid
                                  item
                                  md={6}
                                  sm={6}
                                  xs={6}
                                  xxs={12}
                                  key={`${childItem?.SPS_DESC}-${index}-${childIndex}`}
                                >
                                  <RadioBox
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    name={item?.SS_CODE_NAME}
                                    value={
                                      formik.values[item?.SS_CODE_NAME] ==
                                      childItem?.SPS_SYS_ID
                                    }
                                    checked={
                                      formik.values[item?.SS_CODE_NAME] ==
                                      childItem?.SPS_SYS_ID
                                    }
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        formik.setFieldValue(
                                          item?.SS_CODE_NAME,
                                          childItem?.SPS_SYS_ID
                                        );
                                        handleChangeSteps(item.SS_CODE_NAME, {
                                          ...childItem,
                                        });
                                        handleApiCall();
                                      }
                                    }}
                                    label={
                                      <>
                                        <Stack
                                          direction="row"
                                          alignItems="center"
                                          spacing={0.5}
                                        >
                                          <Typography
                                            variant="typography14"
                                            component="p"
                                            sx={(theme) => ({
                                              fontFamily:
                                                theme.fontFaces.helveticaNeue,
                                              color: theme.palette.common.black,
                                            })}
                                          >
                                            {childItem?.SPS_DESC}
                                          </Typography>
                                          <IconButton
                                            size="small"
                                            onClick={() =>
                                              handleOpen(childItem)
                                            }
                                          >
                                            <Iconify
                                              icon="material-symbols-light:info-outline"
                                              sx={{
                                                color: (theme) =>
                                                  theme.palette.dark.darker,
                                              }}
                                            />
                                          </IconButton>
                                        </Stack>
                                      </>
                                    }
                                    formSx={{
                                      "&.MuiFormControlLabel-root": {
                                        justifyContent: "left",
                                        mr: 0,
                                      },
                                    }}
                                    disabled={
                                      SPS_MIN_WIDTH &&
                                      Number(compareWidth) > -1 &&
                                      parseInt(SPS_MIN_WIDTH) >
                                      parseInt(compareWidth)
                                    }
                                  />
                                  {SPS_MIN_WIDTH &&
                                    String(compareWidth) &&
                                    parseInt(SPS_MIN_WIDTH) >
                                    parseInt(compareWidth) ? (
                                    <Typography
                                      component="p"
                                      variant="typography14"
                                      color="error"
                                      fontFamily={(theme) =>
                                        theme.fontFaces.helveticaNeueMedium
                                      }
                                    >
                                      {translate("min_width_validation", {
                                        min: min_with_value,
                                        unit: translate(
                                          formik.values.measuring_unit
                                        ),
                                      })}
                                    </Typography>
                                  ) : (
                                    ""
                                  )}
                                </Grid>
                              );
                            })}
                          <Grid item xxs={12} mt={0}>
                            <Divider color="lightgrey" sx={{ my: 2 }} />
                          </Grid>
                        </Grid>
                      );
                    } else if (!["CONTROL_TYPE"].includes(item.SS_CODE_NAME)) {
                      return (
                        item?.CHILD_STEP &&
                        item?.CHILD_STEP?.length > 0 && (
                          <Box key={`${item.SS_CODE_NAME}-${index}`}>
                            <Grid container columnSpacing={4}>
                              <Grid item xxs={12}>
                                <Stack
                                  spacing={0.5}
                                  direction="row"
                                  alignItems="center"
                                >
                                  <FormLabel
                                    sx={(theme) => ({
                                      ...theme.typography.typography14,
                                      fontFamily:
                                        theme.fontFaces.helveticaNeueMedium,
                                      color: theme.palette.common.black,
                                    })}
                                  >
                                    {item?.SPS_DESC}
                                  </FormLabel>
                                  {item?.SPI_FEATURES && (
                                    <IconButton
                                      size="small"
                                      onClick={() => handleOpen(item)}
                                    >
                                      <Iconify
                                        icon="material-symbols-light:info-outline"
                                        sx={{
                                          color: (theme) =>
                                            theme.palette.dark.darker,
                                        }}
                                      />
                                    </IconButton>
                                  )}
                                </Stack>
                              </Grid>
                              {item?.CHILD_STEP &&
                                item?.CHILD_STEP?.length > 0 &&
                                item?.CHILD_STEP.map(
                                  (childItem, childIndex) => {
                                    let min_with_value =
                                      formik.values.measuring_unit == "inch"
                                        ? (
                                          Number(
                                            childItem.SPS_MIN_WIDTH || 0
                                          ) *
                                          Number(
                                            formik.values.meas_unit_val || 0
                                          )
                                        ).toFixed(2)
                                        : Number(childItem.SPS_MIN_WIDTH || 0) *
                                        Number(
                                          formik.values.meas_unit_val || 0
                                        );
                                    let compareWidth =
                                      formik.values.width != "custom"
                                        ? product_width[
                                          formik.values.width_index
                                        ]?.value
                                        : Number(
                                          formik.values.custom_width || 0
                                        )
                                          ? Number(
                                            formik.values.custom_width || 0
                                          )
                                          : 0;

                                    let SPS_MIN_WIDTH =
                                      formik.values.measuring_unit == "inch"
                                        ? Number(childItem.SPS_MIN_WIDTH || 0) *
                                        Number(formik.values.meas_unit_val)
                                        : Number(childItem.SPS_MIN_WIDTH || 0) *
                                        Number(formik.values.meas_unit_val);

                                    return (
                                      <Grid
                                        item
                                        md={6}
                                        sm={6}
                                        xs={12}
                                        xxs={12}
                                        key={`${childItem?.SPS_DESC}-${index}-${childIndex}`}
                                      >
                                        <RadioBox
                                          onBlur={formik.handleBlur}
                                          fullWidth
                                          name={item?.SS_CODE_NAME}
                                          value={
                                            formik.values[item?.SS_CODE_NAME] ==
                                            childItem?.SPS_SYS_ID
                                          }
                                          checked={
                                            formik.values[item?.SS_CODE_NAME] ==
                                            childItem?.SPS_SYS_ID
                                          }
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              formik.setFieldValue(
                                                item?.SS_CODE_NAME,
                                                childItem?.SPS_SYS_ID
                                              );
                                              handleChangeSteps(
                                                item.SS_CODE_NAME,
                                                {
                                                  ...childItem,
                                                }
                                              );
                                              handleApiCall();
                                            }
                                          }}
                                          disabled={
                                            (SPS_MIN_WIDTH &&
                                              Number(compareWidth) > -1 &&
                                              parseInt(SPS_MIN_WIDTH) >
                                              parseInt(compareWidth)) ||
                                            (childItem.SPS_CODE == "LO01" &&
                                              productSelectDialogDetail?.SFI_BLACKOUT_LINING_APP_YN ==
                                              "N") ||
                                            (childItem.SPS_CODE == "LO02" &&
                                              productSelectDialogDetail?.SFI_BLACKOUT_LINING_APP_YN ==
                                              "N")
                                          }
                                          label={
                                            <>
                                              <Stack
                                                direction="row"
                                                alignItems="center"
                                                spacing={0.5}
                                              >
                                                <Typography
                                                  variant="typography14"
                                                  component="p"
                                                  sx={(theme) => ({
                                                    fontFamily:
                                                      theme.fontFaces
                                                        .helveticaNeue,
                                                    color:
                                                      (SPS_MIN_WIDTH &&
                                                        Number(compareWidth) >
                                                        -1 &&
                                                        parseInt(
                                                          SPS_MIN_WIDTH
                                                        ) >
                                                        parseInt(
                                                          compareWidth
                                                        )) ||
                                                        (childItem.SPS_CODE ==
                                                          "LO01" &&
                                                          productSelectDialogDetail?.SFI_BLACKOUT_LINING_APP_YN ==
                                                          "N") ||
                                                        (childItem.SPS_CODE ==
                                                          "LO02" &&
                                                          productSelectDialogDetail?.SFI_BLACKOUT_LINING_APP_YN ==
                                                          "N")
                                                        ? theme.palette
                                                          .grey[7800]
                                                        : theme.palette.common
                                                          .black,
                                                  })}
                                                >
                                                  {childItem?.SPS_DESC}
                                                </Typography>
                                                <IconButton
                                                  size="small"
                                                  onClick={() =>
                                                    handleOpen(childItem)
                                                  }
                                                >
                                                  {(SPS_MIN_WIDTH &&
                                                    Number(compareWidth) > -1 &&
                                                    parseInt(SPS_MIN_WIDTH) >
                                                    parseInt(compareWidth)) ||
                                                    (childItem.SPS_CODE ==
                                                      "LO01" &&
                                                      productSelectDialogDetail?.SFI_BLACKOUT_LINING_APP_YN ==
                                                      "N") ||
                                                    (childItem.SPS_CODE ==
                                                      "LO02" &&
                                                      productSelectDialogDetail?.SFI_BLACKOUT_LINING_APP_YN ==
                                                      "N") ? (
                                                    <Typography
                                                      component="abbr"
                                                      title={
                                                        childItem.SPS_CODE ===
                                                          "LO01" &&
                                                          productSelectDialogDetail?.SFI_BLACKOUT_LINING_APP_YN ==
                                                          "N"
                                                          ? translate(
                                                            "blackout_lining_mgs"
                                                          )
                                                          : childItem.SPS_CODE ===
                                                            "LO02" &&
                                                            productSelectDialogDetail?.SFI_BLACKOUT_LINING_APP_YN ==
                                                            "N"
                                                            ? translate(
                                                              "light_filtering_lining_mgs"
                                                            )
                                                            : ""
                                                      }
                                                    >
                                                      <Iconify
                                                        icon="material-symbols-light:info-outline"
                                                        sx={{
                                                          color: (theme) =>
                                                            (SPS_MIN_WIDTH &&
                                                              Number(
                                                                compareWidth
                                                              ) > -1 &&
                                                              parseInt(
                                                                SPS_MIN_WIDTH
                                                              ) >
                                                              parseInt(
                                                                compareWidth
                                                              )) ||
                                                              (childItem.SPS_CODE ==
                                                                "LO01" &&
                                                                productSelectDialogDetail?.SFI_BLACKOUT_LINING_APP_YN ==
                                                                "N") ||
                                                              (childItem.SPS_CODE ==
                                                                "LO02" &&
                                                                productSelectDialogDetail?.SFI_BLACKOUT_LINING_APP_YN ==
                                                                "N")
                                                              ? theme.palette
                                                                .grey[7800]
                                                              : theme.palette
                                                                .common.black,
                                                        }}
                                                      />
                                                    </Typography>
                                                  ) : (
                                                    <Iconify
                                                      icon="material-symbols-light:info-outline"
                                                      sx={{
                                                        color: (theme) =>
                                                          (SPS_MIN_WIDTH &&
                                                            Number(
                                                              compareWidth
                                                            ) > -1 &&
                                                            parseInt(
                                                              SPS_MIN_WIDTH
                                                            ) >
                                                            parseInt(
                                                              compareWidth
                                                            )) ||
                                                            (childItem.SPS_CODE ==
                                                              "LO01" &&
                                                              productSelectDialogDetail?.SFI_BLACKOUT_LINING_APP_YN ==
                                                              "N") ||
                                                            (childItem.SPS_CODE ==
                                                              "LO02" &&
                                                              productSelectDialogDetail?.SFI_BLACKOUT_LINING_APP_YN ==
                                                              "N")
                                                            ? theme.palette
                                                              .grey[7800]
                                                            : theme.palette
                                                              .common.black,
                                                      }}
                                                    />
                                                  )}
                                                </IconButton>
                                              </Stack>
                                            </>
                                          }
                                          formSx={{
                                            "&.MuiFormControlLabel-root": {
                                              justifyContent: "left",
                                              mr: 0,
                                            },
                                          }}
                                        />
                                        {childItem.SPS_CODE == "TO04" &&
                                          formik.values.STEPS &&
                                          ((formik.values.STEPS["TRACK_OPTION"] &&
                                            formik.values.STEPS["TRACK_OPTION"][
                                            "SPS_CODE"
                                            ] == "TO04") ||
                                            (formik.values.STEPS[
                                              "TRACK_OPTION"
                                            ] &&
                                              formik.values.STEPS["TRACK_OPTION"][
                                              "SOI_SPS_CODE"
                                              ] == "TO04")) ? (
                                          <Typography
                                            component="p"
                                            variant="typography14"
                                            color="error"
                                            fontFamily={(theme) =>
                                              theme.fontFaces
                                                .helveticaNeueMedium
                                            }
                                          >
                                            {translate("track_option_mgs", {
                                              desc: translate("track"),
                                            })}
                                          </Typography>
                                        ) : (
                                          ""
                                        )}
                                        {childItem.SPS_CODE == "NO_ROD" &&
                                          formik.values.STEPS &&
                                          ((formik.values.STEPS["ROD_OPTION"] &&
                                            formik.values.STEPS["ROD_OPTION"][
                                            "SPS_CODE"
                                            ] == "NO_ROD") ||
                                            (formik.values.STEPS["ROD_OPTION"] &&
                                              formik.values.STEPS["ROD_OPTION"][
                                              "SOI_SPS_CODE"
                                              ] == "NO_ROD")) ? (
                                          <Typography
                                            component="p"
                                            variant="typography14"
                                            color="error"
                                            fontFamily={(theme) =>
                                              theme.fontFaces
                                                .helveticaNeueMedium
                                            }
                                          >
                                            {translate("track_option_mgs", {
                                              desc: translate("rod"),
                                            })}
                                          </Typography>
                                        ) : (
                                          ""
                                        )}
                                        {SPS_MIN_WIDTH &&
                                          String(compareWidth) &&
                                          parseInt(compareWidth) <
                                          parseInt(SPS_MIN_WIDTH) ? (
                                          <Typography
                                            component="p"
                                            variant="typography14"
                                            color="error"
                                            fontFamily={(theme) =>
                                              theme.fontFaces
                                                .helveticaNeueMedium
                                            }
                                          >
                                            {translate("min_width_validation", {
                                              min: min_with_value,
                                              unit: translate(
                                                formik.values.measuring_unit
                                              ),
                                            })}
                                          </Typography>
                                        ) : (
                                          ""
                                        )}
                                      </Grid>
                                    );
                                  }
                                )}
                              <Grid item xxs={12} mt={0}>
                                <Divider color="lightgrey" sx={{ my: 2 }} />
                              </Grid>
                            </Grid>
                          </Box>
                        )
                      );
                    }
                  })}
              </Box>
            </Stack>
          </Grid>

          <Grid item md={12} sm={12} xs={12} xxs={12}>
            <Box
              sx={{
                display: {
                  md: "block",
                  sm: "block",
                  xs: "none",
                  xxs: "none",
                },
              }}
            >
              <Stack direction="column">
                <FormLabel
                  sx={(theme) => ({
                    ...theme.typography.typography14,
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    color: theme.palette.common.black,
                  })}
                >
                  {translate("ChooseFabric")}
                </FormLabel>
                <ColorSelect
                  isWidthFull={true}
                  handleSetItemData={handleSetItemData}
                  data={
                    productSelectDialogDetail &&
                      productSelectDialogDetail?.items &&
                      productSelectDialogDetail?.items?.length > 0
                      ? productSelectDialogDetail?.items
                      : []
                  }
                  isProductViewDetailRedirect={isProductViewDetailRedirect}
                  productData={productSelectDialogDetail}
                  defaultSelectItemData={
                    productSelectDialogDetail?.defaultSelectItem
                  }
                  breakpoints={breakpoints}
                  maxWidth={maxWidth}
                />
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider
              color="lightgrey"
              sx={{
                display: {
                  md: "block",
                  sm: "block",
                  xs: "none",
                  xxs: "none",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} xxs={12}>
            <Stack
              direction={{
                md: "row",
                sm: "column",
                xs: "column",
                xxs: "column",
              }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} xxs={12} sm={12} md={12} lg={6}>
                  <Button
                    size="large"
                    sx={(theme) => ({
                      "&.MuiButton-root": {
                        borderRadius: "0px",
                        ...theme.typography.typography15,
                        color: theme.palette.common.white,
                        fontFamily: theme.fontFaces.helveticaNeueMedium,
                        fontWeight: 200,
                        backgroundColor: theme.palette.multiColor[400],
                        height: "100%",
                      },
                    })}
                    fullWidth
                    variant="contained"
                    color="dark"
                    type="submit"
                    disabled={
                      steps?.result && steps?.result?.return_status == 333
                    }
                  >
                    {!line_sys_id
                      ? translate("AddtoCart")
                      : translate("UpdatetoCart")}
                  </Button>
                </Grid>
                <Grid item xs={12} xxs={12} sm={12} md={12} lg={6}>
                  <StyledTooltip
                    placement={isDownMd ? "bottom" : "top-start"}
                    arrow
                    title={translate(
                      "Free_delivery_and_installation_for_all_orders_worth"
                    )}
                    open={openTooltip}
                    onClose={handleCloseTooltip}
                    onOpen={handleOpenTooltip}
                    onClick={handleOpenTooltip}
                  >
                    {steps?.result &&
                      steps?.result &&
                      steps?.result?.product_info &&
                      steps?.result?.product_info
                        ?.SPI_INSTALLATION_PROVIDE_YN == "Y" && (
                        <Box
                          component="div"
                          sx={(theme) => ({
                            borderRadius: "0px",
                            ...theme.typography.typography14,
                            color: theme.palette.common.black,
                            fontFamily: theme.fontFaces.helveticaNeueMedium,
                            fontWeight: 200,
                            padding: {
                              lg: "12px 8px!important",
                              md: "12px 5px!important",
                              sm: "12px 5px !important",
                              xs: "12px 5px !important",
                              xxs: "12px 5px !important",
                            },
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "default",
                            border: `1px solid ${theme.palette.primary.main}`,
                          })}
                        >
                          {translate("delivery/installation")}

                        </Box>
                      )}
                  </StyledTooltip>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item md={12}>
            {category == "blinds-shades" && (
              <Typography
                component="p"
                variant="typography14"
                color={(theme) => theme.palette.error.lightError}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                my={0.5}
                letterSpacing="0.54px"
              >
                {translate("quick_buy_blind_message")}
              </Typography>
            )}
            {category == "curtains-and-drapes" &&
              productSelectDialogDetail?.SPI_PR_ITEM_CODE != 1152776 && (
                <Typography
                  component="p"
                  variant="typography14"
                  color={(theme) => theme.palette.error.lightError}
                  fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                  my={0.5}
                  letterSpacing={1}
                >
                  {translate("quick_buy_curtains_message")}
                </Typography>
              )}
          </Grid>
        </Grid>
      </Box>

      <InfoDialogBox
        open={infoDialog.open}
        handleClose={handleClose}
        title={infoDialog?.data?.SPS_DESC}
        description={infoDialog?.data?.SPS_MORE}
        fullWidth={true}
        maxWidth="xs"
      />
    </>
  );
};

export default SelectDialogForm;