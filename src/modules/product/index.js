import { useAuthContext } from "@/auth/useAuthContext";
import useCartContext from "@/provider/cart/cartContext";
import useProduct from "@/provider/product/useProduct";
import {
  addFreeSample,
  addMoodBoard,
  getMoodBoardList,
  removeFreeSample,
  setProductSelectDialogDetail,
} from "@/redux/slices/product";
import { useDispatch, useSelector } from "@/redux/store";
import GoogleAnalytics from "@/utils/GoogleAnalytics";
import { apiClientV2DataService } from "@/utils/apiClientV2DataService";
import { ProductCommonList } from "@/utils/constant";
import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import GridSection from "./grid";

const ToastMessage = dynamic(() => import("@/components/dialog/toastMessage"), {
  loading: () => <></>,
  ssr: false,
});

const SelectDialog = dynamic(() => import("@/modules/dialog/selectDialog"), {
  loading: () => <></>,
  ssr: false,
});

const ContactDialog = dynamic(() => import("@/modules/dialog/contactDialog"), {
  loading: () => <></>,
  ssr: false,
});

const MoodBoardDialogBox = dynamic(() => import("@/modules/dialog/moodBoard"), {
  loading: () => <></>,
  ssr: false,
});

const ProductGridModule = ({
  gridView = 3,
  materialData,
  gridSm = 6,
  gridXs = 6,
  gridXxs = 6,
  type = "",
  pageCount,
  activePage,
  offerKey,
  offerData = [],
  isSwiperArrow = true,
  isCustomBreakpoints,
  breakpoints,
  isSimilarProduct,
  viewNumber,
}) => {
  const router = useRouter();
  const { query, locale } = router;
  const { slug } = query;
  const { state } = useAuthContext();
  const { cookies } = state;
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { moodBoard } = useSelector((state) => state.product);
  const { cartState } = useCartContext();
  const { cart } = cartState;
  const {
    countryName,
    langName,
    site,
    visitorId,
    USER_ID,
    CCYCODE,
    CCYDECIMALS,
    cniso,
    defaultCountry,
    modificationUser,
  } = cookies || {};
  let head_sys_id = modificationUser?.head_sys_id
    ? modificationUser?.head_sys_id
    : 0;
  const { getMyCartData } = useCartContext();
  const [showToast, setShowToast] = useState(false);
  const [showFreeSampleToast, setShowFreeSampleToast] = useState(false);
  const line_sys_id = slug && slug?.length > 3 ? slug[4] : 0;
  const [openWishList, setOpenWishlist] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openSelectDialog, setOpenSelectDialog] = useState(false);
  const [isStepLoading, setIsStepLoading] = React.useState(false);
  const {
    productState,
    handleSelectDialogDetail,
    handleSetSteps,
    handleAddFreeSampleData,
    handleRemoveFreeSampleData,
  } = useProduct();
  const { product_width, product_height, productSelectDialogDetail } =
    productState;
  const [selectMoodBoard, setSelectMoodBoard] = useState({
    value: null,
    option: null,
    error: "",
  });

  const handleShowToastClose = () => {
    setShowToast(false);
  };
  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleShowFreeSampleToastClose = () => {
    setShowFreeSampleToast(false);
  };
  const handleShowFreeSampleToastOpen = () => {
    setShowFreeSampleToast(true);
  };
  const handleOpenCloseContact = () => {
    setOpenContact(!openContact);
  };

  const handleAddFreeSample = async (productData, productFreeSamples = []) => {
    const data = {
      ...productData,
      item_label: "SAMPLE",
      page_name: "",
      code: productData?.defaultSelectItem?.SII_CODE,
      SPI_PR_ITEM_CODE: Number(
        productData?.defaultSelectItem?.SPI_PR_ITEM_CODE
      ),
      canvasImg: productData?.defaultSelectItem?.gallery[0]?.SLI_IMAGE_PATH,
      cart_status: "COMPLETED",
      m_width: 15,
      m_height: 15,
      count: 1,
      PRICE: 0,
      VALUE: 0,
    };
    if (
      !productFreeSamples.some(
        (item) => item?.SII_CODE == productData?.defaultSelectItem?.SII_CODE
      )
    ) {
      if (Number(cart?.countFreeSample) >= 10) {
        handleShowFreeSampleToastOpen();
      } else {
        try {
          const response = await dispatch(addFreeSample(data));
          if (response) {
            handleAddFreeSampleData({
              SII_CODE: productData?.defaultSelectItem?.SII_CODE,
              SAMPLE_SYS_ID: response?.data?.result?.SOL_SYS_ID,
            });
            enqueueSnackbar(`${translate("FreeSampleAddedSuccessfully")}`, {
              variant: "success",
            });
            getMyCartData({
              params: { soh_sys_id: head_sys_id || 0 },
            });
          } else {
            enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
              variant: "error",
            });
          }
        } catch (error) {
          console.log("error", error);
          enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
            variant: "error",
          });
        }
      }
    } else {
      try {
        const response = await dispatch(
          removeFreeSample({
            SAMPLE_SYS_ID: productFreeSamples?.find(
              (item) =>
                item?.SII_CODE == productData?.defaultSelectItem?.SII_CODE
            )
              ? productFreeSamples?.find(
                  (item) =>
                    item?.SII_CODE == productData?.defaultSelectItem?.SII_CODE
                )?.SAMPLE_SYS_ID
              : productData?.defaultSelectItem?.SAMPLE_SYS_ID
              ? productData?.defaultSelectItem?.SAMPLE_SYS_ID.split("|")[0]
              : productData?.defaultSelectItem?.SAMPLE_SYS_ID,
          })
        );
        if (response) {
          handleRemoveFreeSampleData({
            SII_CODE: productData?.defaultSelectItem?.SII_CODE,
            SAMPLE_SYS_ID: response?.data?.result?.SOL_SYS_ID,
          });
          getMyCartData({
            params: { soh_sys_id: head_sys_id || 0 },
          });

          enqueueSnackbar(`${translate("FreeSampleRemovedSuccessfully")}`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
            variant: "error",
          });
        }
      } catch (error) {
        console.log("error", error);
        enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
          variant: "error",
        });
      }
    }
  };

  const handleOpenSelectDialog = async (data) => {
    if (type == "free_sample") {
      handleAddFreeSample(data);
    } else {
      setIsStepLoading(true);
      setOpenSelectDialog(!openSelectDialog);
      let width = ProductCommonList({
        data:
          data && data?.SPI_WIDTH_STANDARD
            ? data?.SPI_WIDTH_STANDARD?.split(",")
            : [],
        measuring_unit: "cm",
        SPI_RESTRICT_TO_MATERIAL_COMMON_YN: "N",
        SII_COMMON: data?.defaultSelectItem?.SII_WIDTH,
        keyName: "width",
        translate,
      });

      let height = ProductCommonList({
        data:
          data && data?.SPI_HEIGHT_STANDARD
            ? data?.SPI_HEIGHT_STANDARD?.split(",")
            : [],
        measuring_unit: "cm",
        SPI_RESTRICT_TO_MATERIAL_COMMON_YN: "N",
        SII_COMMON: data?.defaultSelectItem?.SII_LENGTH,
        keyName: "height",
        translate,
      });

      handleSelectDialogDetail({
        productSelectDialogDetail: data,
        product_width: width,
        product_height: height,
      });

      await apiClientV2DataService
        .post({
          path: `v2/steps`,
          data: {
            product: data?.SPI_PR_ITEM_CODE,
            sys_id: line_sys_id,
          },
          locale,
        })
        .then((response) => {
          if (response.status === 200) {
            handleSetSteps(response?.data);
            setIsStepLoading(false);
          }
        })
        .catch((error) => {
          console.log("V2-PRODUCT-LIST ERROR", error);
        });
    }
  };

  const handleOpenWishlistDialog = (data) => {
    setOpenWishlist(!openWishList);
    if (data) {
      dispatch(setProductSelectDialogDetail(data));
      dispatch(getMoodBoardList());
    }
  };

  const handleCloseSelectDialog = () => {
    setOpenSelectDialog(!openSelectDialog);
  };

  const handleAddMoodBoard = async () => {
    if (selectMoodBoard?.value && selectMoodBoard.option) {
      const data = {
        mood: selectMoodBoard,
        ...productSelectDialogDetail?.defaultSelectItem,
        ...productSelectDialogDetail,
        item_label: "ADD_TO_MOOD",
        cart_status: "COMPLETED",
        page_name: "",
        canvasImg:
          productSelectDialogDetail?.defaultSelectItem?.gallery[0]
            ?.SLI_IMAGE_PATH,
        code: productSelectDialogDetail?.defaultSelectItem?.SII_CODE,
        SPI_PR_ITEM_CODE: productSelectDialogDetail?.SPI_PR_ITEM_CODE,
        lang: langName,
        country: countryName,
        site: site,
        visitorId: visitorId,
        currency: CCYCODE,
        ccy_decimal: CCYDECIMALS,
        cn_iso: cniso,
        detect_country: defaultCountry,
        m_width: 15,
        m_height: 15,
        count: 1,
        active_item_id: "",
        active_item_img: "",
        userId: USER_ID,
      };
      try {
        const response = await dispatch(addMoodBoard(data));
        if (response) {
          handleShowToast();
          setOpenWishlist(!openWishList);
          getMyCartData({
            params: { soh_sys_id: head_sys_id || 0 },
          });
        }
      } catch (error) {
        enqueueSnackbar(`${translate("SomethingWentWrong")}`, {
          variant: "success",
        });
      }
    } else {
      setSelectMoodBoard({
        value: "",
        option: "",
        error: translate("PleaseSelectMoodBoard"),
      });
    }
  };


  React.useEffect(() => {
    if (materialData && materialData.length > 0) {
      GoogleAnalytics && GoogleAnalytics && GoogleAnalytics.viewItemList(materialData);
    }
  }, [materialData]);

  const handleSetItemData = (item) => {
    handleSelectDialogDetail({
      productSelectDialogDetail: {
        ...productSelectDialogDetail,
        defaultSelectItem: item,
      },
      product_width: product_width,
      product_height: product_height,
    });
  };
  return (
    <Box component="div">
      <GridSection
        materialData={materialData}
        gridView={gridView}
        handleOpenCloseContact={handleOpenCloseContact}
        handleOpenSelectDialog={handleOpenSelectDialog}
        handleOpenWishlistDialog={handleOpenWishlistDialog}
        handleSetItemData={handleSetItemData}
        handleAddFreeSample={handleAddFreeSample}
        gridSm={gridSm}
        gridXs={gridXs}
        gridXxs={gridXxs}
        type={type}
        pageCount={pageCount}
        activePage={activePage}
        offerKey={offerKey}
        offerData={offerData}
        isSwiperArrow={isSwiperArrow}
        breakpoints={breakpoints}
        isCustomBreakpoints={isCustomBreakpoints}
        isSimilarProduct={isSimilarProduct}
        viewNumber={viewNumber}
      />
      {openContact && (
        <ContactDialog
          open={openContact}
          handleOpenClose={handleOpenCloseContact}
        />
      )}
      {openSelectDialog && (
        <SelectDialog
          data={productSelectDialogDetail}
          open={openSelectDialog}
          handleOpenClose={handleCloseSelectDialog}
          handleSetItemData={handleSetItemData}
          isStepLoading={isStepLoading}
        />
      )}
      {openWishList && (
        <MoodBoardDialogBox
          handleAddMoodBoard={handleAddMoodBoard}
          handleOpenWishlistDialog={handleOpenWishlistDialog}
          moodBoard={moodBoard}
          openWishList={openWishList}
          selectMoodBoard={selectMoodBoard}
          setSelectMoodBoard={setSelectMoodBoard}
        />
      )}

      {showToast && (
        <ToastMessage
          open={showToast}
          title={`${translate("mood_board")} ${translate("is_added")}`}
          handleClose={handleShowToastClose}
          icon="/assets/icon/auth/success.png"
        />
      )}

      {showFreeSampleToast && (
        <ToastMessage
          open={showFreeSampleToast}
          title={`${translate("maximum_limit_for_free_sample")}`}
          handleClose={handleShowFreeSampleToastClose}
          icon="/assets/icon/warning/warning.png"
          titleSx={{ textAlign: "center" }}
        />
      )}
    </Box>
  );
};

export default ProductGridModule;
