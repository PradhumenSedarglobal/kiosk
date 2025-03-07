import { ReTagCategoryPage } from "@/admitad/AdmitadIndex";
import { useAuthContext } from "@/auth/useAuthContext";
import Iconify from "@/components/iconify";
import useResponsive from "@/hooks/useResponsive";
import DeliveryDays from "@/modules/product/DeliveryDays";
import ColorSelect from "@/modules/product/colorSelect";
import FloatPrice from "@/modules/product/floatPrice";
import GetOffPercentage from "@/modules/product/getOffPercentage";
import ItemCode from "@/modules/product/itemCode";
import ProductThumbSwiper from "@/modules/productThumbSwiper";
import useCartContext from "@/provider/cart/cartContext";
import useProduct from "@/provider/product/useProduct";
import { addToCart, updateAddToCart } from "@/redux/slices/product";
import { useDispatch, useSelector } from "@/redux/store";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import {
  ProductCommonList,
  cm_unit_val,
  customMeasurementUnitConversion,
  inch_unit_val,
  mm_unit_val,
  selectWidthHeightOptionValidation,
} from "@/utils/constant";
import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { find, findIndex } from "lodash";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React, { useState } from "react";
import SelectDialogForm from "./form";
import ProductInfoDialog from "./productInfoDialog";

const ToastMessage = dynamic(() => import("@/components/dialog/toastMessage"), {
  ssr: false,
});

const BackdropLoading = dynamic(
  () => import("@/components/loading-screen/backdropLoading"),
  {
    ssr: false,
  }
);

const SelectDialog = ({
  open,
  handleOpenClose = () => {},
  handleSetItemData,
  isStepLoading,
  data,
  isProductViewDetailRedirect = false,
}) => {
  const [loading, setLoading] = React.useState(true);
  const { t: translate } = useTranslation();
  const { query, push, locale } = useRouter();
  const { slug, min, max } = query;
  const { state, setCartPopupOpen } = useAuthContext();
  const { getMyCartData, cartState } = useCartContext();
  const { cookies } = state;
  const { modificationUser } = cookies || {};
  const { cart } = cartState;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [showToast, setShowToast] = React.useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const handleProductOpenClose = () => {
    setProductOpen(false);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const line_sys_id = slug && slug?.length > 3 ? slug[4] : 0;
  const category_slug = slug && slug?.length > 0 ? slug[0] : "";
  const isDownSm = useResponsive("down", "sm");
  const { orderCart, isFetchStepsLoading, isAddToCartLoading } = useSelector(
    (state) => state.product
  );
  const { productState, handleChangeProductWidth, handleChangeProductHeight } =
    useProduct();
  const { steps, product_width, product_height, productSelectDialogDetail } =
    productState;
  const handleToastClose = () => {
    setShowToast(false);
  };

  const [infoDialog, setInfoDialog] = React.useState({
    open: false,
    data: {
      title: "Motorized",
      description:
        "The blinds or shades is operated using Somfy motor which you can control using a remote control or via wall switch.",
    },
  });
  const handleOpen = (data) => {
    setInfoDialog({ open: true, data: data });
  };

  const handleClose = () => {
    setInfoDialog({ open: false, data: "" });
  };

  const formik = useFormik({
    initialValues: {
      measuring_unit: "cm",
      meas_unit_val: 1,
      quantity: 1,
      width: "",
      height: "",
      custom_width: "",
      custom_height: "",
      width_index: Number(0),
      height_index: Number(0),
      control_type: "",
      valance_options: "",
      color: "",
      item_label: "QUICK_BUY",
      toggle: false,
      pro_min_width: "",
      pro_max_width: "",
      pro_min_height: "",
      pro_max_height: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.toggle) {
        if (!values.measuring_unit) {
          errors.measuring_unit = translate("Thisfieldisrequired");
        }

        if (values?.width == "custom") {
          if (!values.custom_width) {
            errors.custom_width = translate("Thisfieldisrequired");
          } else if (
            values.custom_width &&
            Number(values.custom_width) < Number(values.pro_min_width)
          ) {
            errors.custom_width = translate("PleaseEnterValidWidth");
          } else if (
            values.custom_width &&
            Number(values.custom_width) > Number(values.pro_max_width)
          ) {
            errors.custom_width = translate("PleaseEnterValidWidth");
          }
        } else {
          if (!values.width) {
            errors.width = translate("Thisfieldisrequired");
          }
        }
        if (values?.height == "custom") {
          if (!values.custom_height) {
            errors.custom_height = translate("Thisfieldisrequired");
          } else if (
            values.custom_height &&
            Number(values.custom_height) < Number(values.pro_min_height)
          ) {
            errors.custom_height = translate("PleaseEnterValiHeight");
          } else if (
            values.custom_height &&
            Number(values.custom_height) > Number(values.pro_max_height)
          ) {
            errors.custom_height = translate("PleaseEnterValiHeight");
          }
        } else {
          if (!values.height) {
            errors.height = translate("Thisfieldisrequired");
          }
        }

        if (
          selectWidthHeightOptionValidation(
            steps?.result?.STEPS,
            values,
            values.width != "custom"
              ? product_width[values.width_index]?.value
              : values.custom_width
              ? values.custom_width
              : 0
          )
        ) {
          if (values.width != "custom") {
            errors.width = translate("PleaseEnterValidWidth");
          } else {
            errors.custom_width = translate("PleaseEnterValidWidth");
          }
        }
      }

      return errors;
    },
    onSubmit: async (values) => {
      const responseData = {
        ...steps?.result?.product_info,
        ...values,
        VALUE:
          Number(productSelectDialogDetail?.PRICE) > 1
            ? Number(productSelectDialogDetail?.PRICE) * Number(values.quantity)
            : 1,
        PRICE: productSelectDialogDetail?.PRICE,
        OLD_PRICE: productSelectDialogDetail?.OLD_PRICE,
        canvasImg:
          productSelectDialogDetail?.defaultSelectItem?.gallery[0]
            ?.SLI_IMAGE_PATH,
        category_slug: category_slug,
        code: productSelectDialogDetail?.defaultSelectItem?.SII_CODE,
        SPI_PR_ITEM_CODE: productSelectDialogDetail?.SPI_PR_ITEM_CODE,
        isCartOpen: true,
        m_width:
          formik.values.width != "custom"
            ? product_width[formik.values.width_index]?.width
            : Number(formik.values.custom_width) > 0
            ? customMeasurementUnitConversion(
                values.measuring_unit,
                "cm",
                values.custom_width
              )
            : category_slug == "wallpaper"
            ? null
            : product_width?.filter(
                (item) => !item?.isDisabled && item?.isDisabled != undefined
              )[0]?.width,
        m_height:
          formik.values.height != "custom"
            ? product_height[formik.values.height_index]?.height
            : Number(formik.values.custom_height) > 0
            ? customMeasurementUnitConversion(
                values.measuring_unit,
                "cm",
                formik.values.custom_height
              )
            : category_slug == "wallpaper"
            ? null
            : product_height?.filter(
                (item) => !item?.isDisabled && item?.isDisabled != undefined
              )[0]?.height,
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
        count: values.quantity,
        om_width: values.custom_width,
        om_height: values.custom_height,
        cart_status: "COMPLETED",
        item_label: category_slug == "wallpaper" ? "ADD_TO_CART" : "QUICK_BUY",
        sys_id: line_sys_id,
      };
      if (!steps?.result?.tempOrder?.line_result?.SOL_SYS_ID) {
        try {
          const response = await dispatch(addToCart(responseData));
          if (response) {
            enqueueSnackbar(`${translate("productAddedSucessfully")}`, {
              variant: "success",
            });
            setShowToast(true);
            handleOpenClose();
            formik.resetForm();
            formik.setFieldValue("toggle", false);
            setCartPopupOpen(true);

            getMyCartData({
              params: { soh_sys_id: modificationUser?.head_sys_id || 0 },
            });

            GoogleAnalytics &&
              GoogleAnalytics.addToCart(responseData, cart?.total_price);
            if (line_sys_id) {
              push("/cartPage");
            }
          } else {
            enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
              variant: "error",
            });
          }
        } catch (error) {
          enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
            variant: "error",
          });
        }
      } else {
        try {
          const response = await dispatch(
            updateAddToCart({
              SOL_SYS_ID: steps?.result?.tempOrder?.line_result?.SOL_SYS_ID,
              values: {
                ...steps?.result?.product_info,
                ...values,
                VALUE:
                  Number(productSelectDialogDetail?.PRICE) > 1
                    ? Number(productSelectDialogDetail?.PRICE) *
                      Number(values.quantity)
                    : 1,
                PRICE: productSelectDialogDetail?.PRICE,
                OLD_PRICE: productSelectDialogDetail?.OLD_PRICE,
                canvasImg:
                  productSelectDialogDetail?.defaultSelectItem?.gallery[0]
                    ?.SLI_IMAGE_PATH,
                category_slug: category_slug,
                code: productSelectDialogDetail?.defaultSelectItem?.SII_CODE,
                SPI_PR_ITEM_CODE: productSelectDialogDetail?.SPI_PR_ITEM_CODE,
                isCartOpen: true,
                m_width:
                  formik.values.width != "custom"
                    ? product_width[formik.values.width_index]?.width
                    : Number(formik.values.custom_width) > 0
                    ? customMeasurementUnitConversion(
                        values.measuring_unit,
                        "cm",
                        formik.values.custom_width
                      )
                    : category_slug == "wallpaper"
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
                        values.measuring_unit,
                        "cm",
                        formik.values.custom_height
                      )
                    : category_slug == "wallpaper"
                    ? null
                    : product_height?.filter(
                        (item) =>
                          !item?.isDisabled && item?.isDisabled != undefined
                      )[0]?.height,
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
                count: values.quantity,
                om_width: values.custom_width,
                om_height: values.custom_height,
                cart_status: "COMPLETED",
                item_label:
                  category_slug == "wallpaper" ? "ADD_TO_CART" : "QUICK_BUY",
                sys_id: line_sys_id,
              },
            })
          );
          if (response) {
            setShowToast(true);
            handleOpenClose();
            formik.resetForm();
            enqueueSnackbar(`${translate("productAddedSucessfully")}`, {
              variant: "success",
            });
            if (!line_sys_id) {
              setCartPopupOpen(true);
            }

            formik.setFieldValue("toggle", false);
            getMyCartData({
              params: { soh_sys_id: modificationUser?.head_sys_id || 0 },
            });

            if (line_sys_id) {
              push("/cartPage");
            }
          } else {
            enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
              variant: "error",
            });
          }
        } catch (error) {
          enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
            variant: "error",
          });
        }
      }
    },
  });

  const checkControlType = React.useMemo(
    () =>
      formik?.values?.STEPS && formik?.values?.STEPS["CONTROL_TYPE"]
        ? formik?.values?.STEPS["CONTROL_TYPE"].SOI_SPS_CODE == "CT02" ||
          formik?.values?.STEPS["CONTROL_TYPE"].SPS_CODE == "CT02"
          ? formik?.values?.STEPS["CONTROL_TYPE"].SOI_SPS_CODE == "CT02" ||
            formik?.values?.STEPS["CONTROL_TYPE"].SPS_CODE == "CT02"
          : null
        : null,
    [formik?.values?.STEPS]
  );

  const GET_CONTROL_TYPE_SPS_MIN_WIDTH = React.useMemo(
    () =>
      steps?.result?.STEPS &&
      steps?.result?.STEPS?.length > 0 &&
      steps?.result?.STEPS?.find((item) => item.SS_CODE_NAME == "CONTROL_TYPE")
        ?.CHILD_STEP
        ? steps?.result?.STEPS?.find(
            (item) => item.SS_CODE_NAME == "CONTROL_TYPE"
          )?.CHILD_STEP.find((childItem) => childItem.SPS_CODE == "CT02")
            ?.SPS_MIN_WIDTH
        : null,
    [steps?.result?.STEPS]
  );

  React.useEffect(() => {
    if (steps) {
      let pro_min_width = 0;
      let pro_max_width = 0;
      let pro_min_height = 0;
      let pro_max_height = 0;
      switch (formik.values.measuring_unit) {
        case "cm":
          formik.setFieldValue("meas_unit_val", cm_unit_val);
          pro_min_width = !checkControlType
            ? Number(steps?.result?.product_info?.SPI_MIN_WIDTH) *
              Number(cm_unit_val)
            : GET_CONTROL_TYPE_SPS_MIN_WIDTH * Number(cm_unit_val);
          pro_max_width =
            steps?.result?.product_info?.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN ==
            "Y"
              ? Number(
                  productSelectDialogDetail?.defaultSelectItem?.SII_WIDTH
                ) * Number(cm_unit_val)
              : Number(steps?.result?.product_info?.SPI_MAX_WIDTH) *
                Number(cm_unit_val);

          pro_min_height =
            Number(steps?.result?.product_info?.SPI_MIN_HEIGHT) *
            Number(cm_unit_val);
          pro_max_height =
            steps?.result?.product_info?.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN ==
            "Y"
              ? Number(
                  productSelectDialogDetail?.defaultSelectItem?.SII_LENGTH
                ) * Number(cm_unit_val)
              : Number(steps?.result?.product_info?.SPI_MAX_HEIGHT) *
                Number(cm_unit_val);

          break;

        case "mm":
          formik.setFieldValue("meas_unit_val", mm_unit_val);
          pro_min_width = !checkControlType
            ? Number(steps?.result?.product_info?.SPI_MIN_WIDTH) *
              Number(mm_unit_val).toFixed(2)
            : GET_CONTROL_TYPE_SPS_MIN_WIDTH * Number(mm_unit_val);
          pro_max_width =
            steps?.result?.product_info?.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN ==
            "Y"
              ? Number(
                  productSelectDialogDetail?.defaultSelectItem?.SII_WIDTH
                ) * Number(mm_unit_val)
              : Number(steps?.result?.product_info?.SPI_MAX_WIDTH) *
                Number(mm_unit_val);
          pro_min_height =
            Number(steps?.result?.product_info?.SPI_MIN_HEIGHT) *
            Number(mm_unit_val);
          pro_max_height =
            steps?.result?.product_info?.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN ==
            "Y"
              ? Number(
                  productSelectDialogDetail?.defaultSelectItem?.SII_LENGTH
                ) * Number(mm_unit_val)
              : Number(steps?.result?.product_info?.SPI_MAX_HEIGHT) *
                Number(mm_unit_val);
          break;

        case "inch":
          formik.setFieldValue("meas_unit_val", inch_unit_val);
          pro_min_width = !checkControlType
            ? (
                Number(steps?.result?.product_info?.SPI_MIN_WIDTH) *
                Number(inch_unit_val)
              ).toFixed(2)
            : GET_CONTROL_TYPE_SPS_MIN_WIDTH * Number(inch_unit_val);

          pro_max_width = (
            steps?.result?.product_info?.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN ==
            "Y"
              ? Number(
                  productSelectDialogDetail?.defaultSelectItem?.SII_WIDTH
                ) * Number(inch_unit_val)
              : Number(steps?.result?.product_info?.SPI_MAX_WIDTH) *
                Number(inch_unit_val)
          ).toFixed(2);

          pro_min_height = (
            Number(steps?.result?.product_info?.SPI_MIN_HEIGHT) *
            Number(inch_unit_val)
          ).toFixed(2);
          pro_max_height =
            steps?.result?.product_info?.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN ==
            "Y"
              ? Number(
                  productSelectDialogDetail?.defaultSelectItem?.SII_LENGTH
                ) * Number(inch_unit_val)
              : (
                  Number(steps?.result?.product_info?.SPI_MAX_HEIGHT) *
                  Number(inch_unit_val)
                ).toFixed(2);

          break;
      }
      formik.setFieldValue("pro_min_width", pro_min_width);
      formik.setFieldValue("pro_max_width", pro_max_width);
      formik.setFieldValue("pro_min_height", pro_min_height);
      formik.setFieldValue("pro_max_height", pro_max_height);
    }
  }, [
    steps,
    formik.values.measuring_unit,
    productSelectDialogDetail,
    product_width,
    product_height,
    checkControlType,
  ]);

  const bindFormData = async () => {
    formik.setFieldValue(
      "quantity",
      steps?.result?.tempOrder?.line_result?.SOL_QTY || 1
    );

    if (steps?.result?.tempOrder?.line_result?.SOL_WIDTH) {
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
      } else {
        const getWidthIndexOfValue = findIndex(
          product_width,
          (e) => {
            return e.width == steps?.result?.tempOrder?.line_result?.SOL_WIDTH;
          },
          0
        );

        if (getWidthIndexOfValue > -1) {
          formik.setFieldValue(
            "width",
            product_width[getWidthIndexOfValue]
              ? product_width[getWidthIndexOfValue]?.width
              : "custom"
          );
          formik.setFieldValue("width_index", getWidthIndexOfValue);
          formik.setFieldValue("custom_width", "");
        } else {
          if (steps?.result?.tempOrder?.line_result?.SOL_WIDTH) {
            const getCustomWidthIndexOfValue = findIndex(product_width, {
              value: "custom",
            });
            formik.setFieldValue("width_index", getCustomWidthIndexOfValue);
            formik.setFieldValue("width", "custom");
            formik.setFieldValue(
              "custom_width",
              steps?.result?.tempOrder?.line_result?.SOL_WIDTH
            );
          }
        }
      }
    } else {
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
      } else {
        formik.setFieldValue("width_index", 0);
        formik.setFieldValue("width", product_width && product_width[0]?.width);
        formik.setFieldValue(
          "custom_width",
          steps?.result?.tempOrder?.line_result?.SOL_WIDTH
        );
      }
    }

    if (steps?.result?.tempOrder?.line_result?.SOL_HEIGHT) {
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
      } else {
        const getHeightIndexOfValue = findIndex(
          product_height,
          (e) => {
            return (
              e.height == steps?.result?.tempOrder?.line_result?.SOL_HEIGHT
            );
          },
          0
        );

        if (getHeightIndexOfValue > -1) {
          formik.setFieldValue(
            "height",
            product_height[getHeightIndexOfValue]
              ? product_height[getHeightIndexOfValue]?.height
              : "custom"
          );
          formik.setFieldValue("height_index", getHeightIndexOfValue);
          formik.setFieldValue("custom_height", "");
        } else {
          if (steps?.result?.tempOrder?.line_result?.SOL_HEIGHT) {
            const getCustomHeightIndexOfValue = findIndex(product_height, {
              value: "custom",
            });
            formik.setFieldValue("height_index", getCustomHeightIndexOfValue);
            formik.setFieldValue("height", "custom");
            formik.setFieldValue(
              "custom_height",
              steps?.result?.tempOrder?.line_result?.SOL_HEIGHT
            );
          }
        }
      }
    } else {
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
      } else {
        formik.setFieldValue("height_index", 0);
        formik.setFieldValue(
          "height",
          product_height && product_height[0]?.height
        );
        formik.setFieldValue("custom_height", "");
      }
    }


    let STEPS = {};

    steps?.result?.STEPS &&
      steps?.result?.STEPS?.length > 0 &&
      steps?.result?.STEPS?.forEach((element) => {
        if (element.SS_CODE_NAME) {
          if (element?.SS_CODE_NAME == "MEASUREMENT") {
            if (steps?.result?.tempOrder?.info_result["MEASUREMENT"]) {
              const defaultData =
                element?.CHILD_STEP?.length > 0
                  ? element?.CHILD_STEP.find(
                      (item) =>
                        item?.SPS_SYS_ID ==
                        steps?.result?.tempOrder?.info_result["MEASUREMENT"]
                          ?.SOI_SYS_ID
                    )
                  : {};
              STEPS[element.SS_CODE_NAME] = {
                ...element,
                ...defaultData,
                m_width:
                  category_slug == "wallpaper"
                    ? null
                    : Number(steps?.result?.tempOrder?.line_result?.SOL_WIDTH) >
                      0
                    ? min || steps?.result?.tempOrder?.line_result?.SOL_WIDTH
                    : min || product_width[0]?.width,
                m_height:
                  category_slug == "wallpaper"
                    ? null
                    : Number(
                        steps?.result?.tempOrder?.line_result?.SOL_HEIGHT
                      ) > 0
                    ? max || steps?.result?.tempOrder?.line_result?.SOL_HEIGHT
                    : max || product_height[0]?.height,
              };
            } else {
              STEPS[element.SS_CODE_NAME] = {
                ...element,
                ...((element?.CHILD_STEP?.length > 0 &&
                  find(element?.CHILD_STEP, { SPS_VALUE_DEFAULT: "Y" })) ||
                  {}),
                m_width:
                  category_slug == "wallpaper"
                    ? null
                    : Number(steps?.result?.tempOrder?.line_result?.SOL_WIDTH) >
                      0
                    ? min || steps?.result?.tempOrder?.line_result?.SOL_WIDTH
                    : min || product_width[0]?.width,
                m_height:
                  category_slug == "wallpaper"
                    ? null
                    : Number(
                        steps?.result?.tempOrder?.line_result?.SOL_HEIGHT
                      ) > 0
                    ? max || steps?.result?.tempOrder?.line_result?.SOL_HEIGHT
                    : max || product_height[0]?.height,
              };
            }
          } else if (category_slug == "wallpaper") {
            if (steps?.result?.tempOrder?.info_result[element.SS_CODE_NAME]) {
              STEPS[element.SS_CODE_NAME] = {
                ...steps?.result?.tempOrder?.info_result[element.SS_CODE_NAME],
                m_width:
                  category_slug == "wallpaper"
                    ? null
                    : Number(steps?.result?.tempOrder?.line_result?.SOL_WIDTH) >
                      0
                    ? min || steps?.result?.tempOrder?.line_result?.SOL_WIDTH
                    : min || product_width[0]?.width,
                m_height:
                  category_slug == "wallpaper"
                    ? null
                    : Number(
                        steps?.result?.tempOrder?.line_result?.SOL_HEIGHT
                      ) > 0
                    ? max || steps?.result?.tempOrder?.line_result?.SOL_HEIGHT
                    : max || product_height[0]?.height,
              };
            } else {
              STEPS[element.SS_CODE_NAME] = {
                ...element,
                ...(element?.CHILD_STEP?.length > 0 &&
                  find(element?.CHILD_STEP, { SPS_VALUE_DEFAULT: "Y" })),
                m_width:
                  category_slug == "wallpaper"
                    ? null
                    : Number(steps?.result?.tempOrder?.line_result?.SOL_WIDTH) >
                      0
                    ? min || steps?.result?.tempOrder?.line_result?.SOL_WIDTH
                    : min || product_width[0]?.width,
                m_height:
                  category_slug == "wallpaper"
                    ? null
                    : Number(
                        steps?.result?.tempOrder?.line_result?.SOL_HEIGHT
                      ) > 0
                    ? max || steps?.result?.tempOrder?.line_result?.SOL_HEIGHT
                    : max || product_height[0]?.height,
              };
            }
          } else {
            if (steps?.result?.tempOrder?.info_result[element.SS_CODE_NAME]) {
              const defaultData =
                element?.CHILD_STEP?.length > 0
                  ? element?.CHILD_STEP.find(
                      (item) =>
                        item?.SPS_CODE ==
                        steps?.result?.tempOrder?.info_result[
                          element.SS_CODE_NAME
                        ]?.SOI_SPS_CODE
                    )
                  : {};

              STEPS[element.SS_CODE_NAME] = {
                ...defaultData,
              };
              formik.setFieldValue(
                element?.SS_CODE_NAME,
                String(
                  steps?.result?.tempOrder?.info_result[element.SS_CODE_NAME]
                    ?.SOI_SPS_SYS_ID
                )
              );
            } else {
              STEPS[element.SS_CODE_NAME] = {
                ...(element?.CHILD_STEP?.length > 0 &&
                  find(element?.CHILD_STEP, { SPS_VALUE_DEFAULT: "Y" })),
              };
              formik.setFieldValue(
                element?.SS_CODE_NAME,
                String(
                  find(element?.CHILD_STEP, { SPS_VALUE_DEFAULT: "Y" })
                    ?.SPS_SYS_ID
                )
              );
            }
          }
        }
      });

    formik.setFieldValue(
      "STEPS",
      steps?.result?.STEPS && steps?.result?.STEPS?.length > 0 ? STEPS : ""
    );

    formik.setFieldValue("measuring_unit", "cm");
  };

  React.useEffect(() => {
    setTimeout(() => {
      bindFormData();
    }, 200);
  }, [steps?.result]);

  React.useEffect(() => {
    if (
      Number(formik.values.width_index) > -1 &&
      product_width?.length > 0 &&
      formik.values.width != "custom"
    ) {
      formik.setFieldValue(
        "width",
        product_width[formik.values.width_index]?.value
      );
    }
    if (
      Number(formik.values.height_index) > -1 &&
      product_height?.length > 0 &&
      formik.values.height != "custom"
    ) {
      formik.setFieldValue(
        "height",
        product_height[formik.values.height_index]?.value
      );
    }
  }, [
    productSelectDialogDetail,
    product_width,
    product_height,
    formik.values.measuring_unit,
  ]);

  async function ProductCommonLists() {
    let width = ProductCommonList({
      data:
        productSelectDialogDetail &&
        productSelectDialogDetail?.SPI_WIDTH_STANDARD
          ? productSelectDialogDetail?.SPI_WIDTH_STANDARD.split(",")
          : [],
      measuring_unit: formik.values.measuring_unit,
      SPI_RESTRICT_TO_MATERIAL_COMMON_YN:
        steps?.result?.product_info?.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN,
      SII_COMMON: productSelectDialogDetail?.defaultSelectItem?.SII_WIDTH,
      keyName: "width",
      translate,
    });

    let height = ProductCommonList({
      data:
        productSelectDialogDetail &&
        productSelectDialogDetail?.SPI_HEIGHT_STANDARD
          ? productSelectDialogDetail?.SPI_HEIGHT_STANDARD.split(",")
          : [],
      measuring_unit: formik.values.measuring_unit,
      SPI_RESTRICT_TO_MATERIAL_COMMON_YN:
        steps?.result?.product_info?.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN,
      SII_COMMON: productSelectDialogDetail?.defaultSelectItem?.SII_LENGTH,
      keyName: "height",
      translate,
    });

    if (steps?.result?.tempOrder?.line_result?.SOL_ITEM_CODE) {
      handleChangeProductHeight(height);
      handleChangeProductWidth(width);
    } else {
      handleChangeProductHeight(height);
      handleChangeProductWidth(width);
    }
  }

  React.useEffect(() => {
    if (steps?.result && steps?.return_status == 0) {
      ProductCommonLists();
    }
  }, [steps, formik.values.measuring_unit]);

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

  React.useEffect(() => {
    if (productSelectDialogDetail) {
      ReTagCategoryPage(productSelectDialogDetail?.defaultSelectItem?.SPI_DESC);
      GoogleAnalytics &&
        GoogleAnalytics.selectItem(
          productSelectDialogDetail?.defaultSelectItem
        );
    }
  }, [productSelectDialogDetail]);

  let per =
    100 -
    (orderCart?.result?.SOL_VALUE / orderCart?.result?.SOL_OLD_VALUE) * 100;
  let val = Math.round(per);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          formik.resetForm();
          handleOpenClose();
        }}
        fullWidth
        maxWidth="lg"
        sx={{
          "& .MuiDialog-paper": {
            minHeight: "calc(100% - 8px)!important",
            zIndex: 1200,
          },
          "& .MuiDialog-paper.MuiPaper-rounded": {
            borderRadius: "0px",
          },
        }}
        scroll="paper"
      >
        {isAddToCartLoading && <BackdropLoading />}
        <DialogContent
          sx={{
            position: "relative",
            py: { md: 1.5, sm: 0.8, xs: 0.8, xxs: 0.8 },
            px: { md: 1.5, sm: 0.8, xs: 0.8, xxs: 0.8 },
            paddingRight: {
              lg: "0px!important",
              md: "0px!important",
              sm: 0.8,
              xs: 0.8,
              xxs: 0.8,
            },

            ...((loading || isStepLoading) && {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }),
          }}
        >
          {loading || isStepLoading ? (
            <CircularProgress />
          ) : (
            <Grid
              container
              columnSpacing={{ md: 1, sm: 0, xs: 0, xxs: 0 }}
              rowSpacing={{ md: 0, sm: 0, xs: 1, xxs: 1 }}
            >
              <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
                <Box
                  sx={{
                    position: {
                      md: "sticky",
                      sm: "relative",
                      xs: "relative",
                      xxs: "relative",
                    },
                    top: "0",
                  }}
                >
                  <ProductThumbSwiper
                    data={
                      productSelectDialogDetail?.defaultSelectItem?.gallery &&
                      productSelectDialogDetail?.defaultSelectItem?.gallery
                        ?.length > 0
                        ? productSelectDialogDetail?.defaultSelectItem?.gallery
                        : []
                    }
                    url={productSelectDialogDetail?.url}
                    defaultSelectItem={
                      productSelectDialogDetail?.defaultSelectItem
                    }
                  />
                </Box>
              </Grid>

              {isDownSm && (
                <>
                  <Grid item md={12} sm={12} xs={12} xxs={12}>
                    <Box
                      sx={{
                        display: {
                          xl: "none",
                          lg: "none",
                          md: "none",
                          sm: "none",
                          xs: "block",
                          xxs: "block",
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
                          isProductViewDetailRedirect={
                            isProductViewDetailRedirect
                          }
                          isWidthFull={true}
                          handleSetItemData={handleSetItemData}
                          data={
                            productSelectDialogDetail &&
                            productSelectDialogDetail?.items &&
                            productSelectDialogDetail?.items?.length > 0
                              ? productSelectDialogDetail?.items
                              : []
                          }
                          productData={productSelectDialogDetail}
                          defaultSelectItemData={
                            productSelectDialogDetail?.defaultSelectItem
                          }
                          breakpoints={breakpoints}
                          maxWidth={maxWidth}
                        />
                      </Stack>
                    </Box>
                    <Grid item xs={12}>
                      <Divider
                        color="lightgrey"
                        sx={{
                          display: {
                            md: "none",
                            sm: "none",
                            xs: "block",
                            xxs: "block",
                          },
                        }}
                      />
                    </Grid>{" "}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        display: {
                          xl: "none",
                          lg: "none",
                          md: "none",
                          sm: "none",
                          xs: "block",
                          xxs: "block",
                        },
                      }}
                    />
                  </Grid>
                </>
              )}

              <Grid item lg={6} md={6} sm={12} xs={12} xxs={12}>
                <DialogTitle
                  id="scroll-dialog-title"
                  sx={{ pr: 2, pt: 0, px: { md: 2, sm: 0, xs: 0, xxs: 0 } }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="end"
                    mb={1.5}
                    sx={(theme) => ({
                      [theme.breakpoints.down("md")]: {
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 1200,
                      },
                    })}
                  >
                    <Box>
                      <Card
                        sx={() => ({
                          "&.MuiCard-root": { borderRadius: "50%!important" },
                        })}
                      >
                        <IconButton
                          size="small"
                          onClick={() => {
                            formik.resetForm();
                            handleOpenClose();
                            formik.setFieldValue("toggle", false);
                            if (line_sys_id) {
                              push("/cartPage");
                            }
                          }}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </Card>
                    </Box>
                  </Stack>

                  <Stack
                    direction={{
                      md: "row",
                      sm: "column",
                      xs: "column",
                      xxs: "column",
                    }}
                    alignItems="start"
                    width="100%"
                    justifyContent={{
                      md: "space-between",
                      sm: "left",
                      xs: "left",
                      xxs: "left",
                    }}
                  >
                    <Box spacing={0.5} width="60%">
                      <Box my={1}>
                        {productSelectDialogDetail &&
                          productSelectDialogDetail?.defaultSelectItem &&
                          productSelectDialogDetail?.defaultSelectItem
                            ?.DELIVERY_DAYS > 0 && (
                            <DeliveryDays
                              data={data}
                              status_days={
                                data &&
                                productSelectDialogDetail?.defaultSelectItem &&
                                productSelectDialogDetail?.defaultSelectItem
                                  ?.DELIVERY_DAYS
                              }
                              status={
                                productSelectDialogDetail?.defaultSelectItem
                                  ?.STOCK_STATUS
                              }
                            />
                          )}
                      </Box>
                      <Box>
                        <Typography
                          component="p"
                          variant="typography14"
                          fontFamily={(theme) =>
                            theme.fontFaces.helveticaNeueMedium
                          }
                          fontWeight={100}
                          color="common.black"
                        >
                          {translate("ItemCode")} :
                          <Typography
                            variant="typography14"
                            ml={0.8}
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeue
                            }
                            sx={{ color: (theme) => theme.palette.grey[4400] }}
                            fontWeight={400}
                            component="span"
                          >
                            <ItemCode
                              code={
                                productSelectDialogDetail?.defaultSelectItem
                                  ?.SII_ITEM_ID
                              }
                            />
                          </Typography>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          component="p"
                          variant="typography14"
                          fontFamily={(theme) =>
                            theme.fontFaces.helveticaNeueMedium
                          }
                          fontWeight={100}
                        >
                          {translate("Color")} :
                          <Typography
                            variant="typography14"
                            ml={0.8}
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeue
                            }
                            sx={{ color: (theme) => theme.palette.grey[4400] }}
                            fontWeight={400}
                            component="span"
                          >
                            {
                              productSelectDialogDetail?.defaultSelectItem
                                ?.SII_COLOR_DESC
                            }
                          </Typography>
                        </Typography>
                      </Box>

                      <Typography
                        component="div"
                        variant="typography28"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueMedium
                        }
                        color={(theme) => theme.palette.common.black}
                        fontWeight="400"
                      >
                        {productSelectDialogDetail?.SFP_TITLE}{" "}
                        <Iconify
                          width="20px"
                          icon="ic:outline-info"
                          sx={{ cursor: "pointer" }}
                          onClick={() => setProductOpen(true)}
                        />
                      </Typography>
                    </Box>

                    <Box
                      width="auto"
                      direction="column"
                      spacing={0}
                      alignItems={{
                        lg: "end",
                        md: "end",
                        sm: "start",
                        xs: "start",
                        xxs: "start",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="filter"
                          sx={{
                            color: (theme) => theme.palette.primary.darker,
                          }}
                          fontFamily={(theme) =>
                            theme.fontFaces.helveticaNeueBold
                          }
                          component="span"
                        >
                          {translate(productSelectDialogDetail?.SFP_CCY_CODE)}
                        </Typography>
                        <Typography
                          variant="filter"
                          sx={{
                            ml: 0.8,
                            color: (theme) => theme.palette.primary.darker,
                          }}
                          fontFamily={(theme) =>
                            theme.fontFaces.helveticaNeueBold
                          }
                          component="span"
                        >
                          <FloatPrice
                            price={
                              orderCart?.result?.SOL_VALUE ||
                              productSelectDialogDetail?.PRICE
                            }
                          />
                        </Typography>
                      </Box>
                      {category_slug == "wallpaper" ? (
                        <Box textAlign={"right"}>
                          <Typography
                            gutterBottom
                            variant="typography15"
                            component="p"
                            sx={{
                              mb: 0,
                            }}
                            color={(theme) => theme.palette.grey[6700]}
                            fontWeight={300}
                            fontFamily={(theme) =>
                              theme.fontFaces.helveticaNeueMedium
                            }
                          >
                            {translate("total_price_of_rolls", {
                              roll: orderCart?.result?.SOL_QTY,
                            })}
                          </Typography>
                        </Box>
                      ) : (
                        ""
                      )}
                      <Box>
                        {Number(orderCart?.result?.SOL_OLD_VALUE) >
                          Number(orderCart?.result?.SOL_VALUE) &&
                          val >= 10 && (
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <Typography
                                variant="typography14"
                                component="p"
                                color={(theme) => theme.palette.grey[4400]}
                                fontFamily={(theme) =>
                                  theme.fontFaces.helveticaNeue
                                }
                                fontWeight={200}
                                sx={(theme) => ({
                                  textDecoration: "line-through",
                                  textDecorationColor: theme.palette.grey[600],
                                })}
                                noWrap
                              >
                                {translate(
                                  productSelectDialogDetail?.SFP_CCY_CODE
                                )}{" "}
                                {orderCart?.result?.SOL_OLD_VALUE}
                              </Typography>
                              <GetOffPercentage
                                variant="typography14"
                                new_value={orderCart?.result?.SOL_VALUE}
                                old_value={orderCart?.result?.SOL_OLD_VALUE}
                              />
                            </Stack>
                          )}
                      </Box>
                    </Box>
                  </Stack>

                  <Divider />
                </DialogTitle>
                <DialogContent
                  dividers={true}
                  sx={{
                    px: {
                      lg: 2,
                      md: 2,
                      sm: 0.2,
                      xs: 0.2,
                      xxs: 0.2,
                    },
                  }}
                >
                  <Box
                    component="form"
                    noValidate
                    onSubmit={formik.handleSubmit}
                  >
                    <SelectDialogForm
                      handleOpen={handleOpen}
                      handleClose={handleClose}
                      formik={formik}
                      infoDialog={infoDialog}
                      handleSetItemData={handleSetItemData}
                      isProductViewDetailRedirect={isProductViewDetailRedirect}
                    />
                  </Box>
                  {slug == "folding-doors" && (
                    <Box mt={1}>
                      <Typography
                        variant="typography14"
                        sx={(theme) => ({
                          fontFamily: theme.fontFaces.helveticaNeueLight,
                          color: theme.palette.error.lightError,
                          fontWeight: 400,
                        })}
                      >
                        {translate(
                          "door_lock_colors_can_be_customized_upon_request"
                        )}
                      </Typography>
                    </Box>
                  )}
                </DialogContent>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
      <ToastMessage
        open={showToast}
        icon="/assets/icon/auth/success.png"
        content={
          <>
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
              {translate("AddedtoYourCart")}
            </Typography>
          </>
        }
        handleClose={handleToastClose}
        isButtonShow={false}
        spacing={2}
      />
      <ProductInfoDialog
        data={data}
        open={productOpen}
        handleClose={handleProductOpenClose}
      />
    </>
  );
};

SelectDialog.propTypes = {
  handleOpenClose: PropTypes.func,
  open: PropTypes.bool,
};

export default SelectDialog;
