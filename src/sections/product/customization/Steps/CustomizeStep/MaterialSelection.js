import { NextFillImage } from "@/components/image";
import { useDispatch, useSelector } from "@/redux/store";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import SubStepImport from "../SubStepImport";
import { Swiper, SwiperSlide } from "swiper/react";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

import {
  getMaterialCustomization,
  loadingfalse,
  setCustomizationFun,
} from "@/redux/slices/customization";
import { find } from "lodash";
import {
  addLights,
  addToCartFunScene,
  updateTextureImg,
} from "../../sceneCanvas3D";
import NextLazyLoadImage from "@/components/image/NextLazyLoadImage";
import { useAuthContext } from "@/auth/useAuthContext";
import MaterialSwiper from "./MaterialSelectionSwiper";
import MainHeading from "@/app/components/MainHeading";
import SubHeading from "@/app/components/SubHeading";
import { setStepIndex } from "@/redux/slices/tourSlice";
const qs = require("qs");

let img_path = "/assets/images/";
const item_img_path = process.env.NEXT_PUBLIC_ITEM_IMG_WEBP_PATH + "laptop/";
const perPage = 15;

const MaterialSelection = ({ data, formik, elem,setTabChange }) => {
  const locale = 'uae-en';
  const { query } = useRouter();
  const { slug } = query;
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const listInnerRef = useRef(null);
  const sliderRef = useRef(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [selectDefault,setSelectDefault] = useState(false);
  const selectedRef = useRef(null);

  const selectedCategory = useSelector((state) => state.customization.SelectedCategory);
  const selectedModalData = useSelector((state) => state.customization.SelectedModal);


  const customization_info = useSelector((state) => state.customization);

  console.log("customization1111",customization_info);

  const { state } = useAuthContext();
  const { cookies } = state;

 
  const {
    productInfo,
    stepsArray,
    editStepData,
    materialCustomization,
    filterOption,
    materialList,
  } = customization_info;


  

  
  

  let m_width = productInfo.m_width ? productInfo.m_width : 0;
  let m_height = productInfo.m_height ? productInfo.m_height : 0;

  let edit_item_id =
    editStepData.info_result && editStepData.info_result.MATERIAL_SELECTION
      ? editStepData.info_result.MATERIAL_SELECTION.ITEM_ID
      : "";
  let material_item_id = slug && slug.length ? slug[3] : edit_item_id;
  let SPI_PR_ITEM_CODE = productInfo.SPI_PR_ITEM_CODE
    ? productInfo.SPI_PR_ITEM_CODE
    : 0;
  const tourState = useSelector((state) => state.tour);


  // useEffect(()=>{
  //   selectedRef.current.click();
  // },[]);


  const updateTextureFun = async (val) => {

  
    if (productInfo.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN === "Y") {
      if (val.SII_WIDTH <= stepsArray.MEASUREMENT?.m_width) {
        setAlertMessage(
          "The entered width should not be greater than the selected material's maximum width."
        );
    
        // ✅ Automatically remove the alert after 5 seconds
        setTimeout(() => {
          setAlertMessage(null);
          setTabChange(1); // Moves to the first page
        }, 4000);
      }
    }

    if (productInfo.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN === "Y") {
      if (val.SII_HEIGHT <= stepsArray.MEASUREMENT?.m_height) {
        setAlertMessage(
          "The entered height should not be greater than the selected material's maximum height."
        );
    
        // ✅ Automatically remove the alert after 5 seconds
        setTimeout(() => {
          setAlertMessage(null);
          setTabChange(1); // Moves to the first page
        }, 4000);
      }
    }
    

    
     


    console.log("this function invok",val);
    console.log("productInfooooooo",productInfo);
    console.log("stepsArrayyyyyyy",stepsArray);

    let material_data = {
      ...data,
      ITEM_CODE: val.SII_CODE,
      material_info: val,
    };

    await updateTextureImg(val);
    val.light_info && val.light_info.length > 0
      ? addLights(val.light_info, val.SIO_LIGHT_INTENSITY)
      : "";

    material_data["SUB_CHILD"] = "";

    dispatch(loadingfalse(false));

    dispatch(setCustomizationFun(material_data));
  };

  const getMaterialListFun = () => {
    let post_data = {
      locale: locale,
      visitorId: cookies.visitorId,
      userId: cookies.USER_ID,
      param: filterOption,
      limit: perPage,
      page: page,
      material_item_id: stepsArray.MATERIAL_SELECTION ? stepsArray.MATERIAL_SELECTION.ITEM_CODE:material_item_id,
      m_width: m_width,
      m_height: m_height,
      content: "customization",
    };
    dispatch(
      getMaterialCustomization({
        paramsId: SPI_PR_ITEM_CODE,
        params: post_data,
      })
    );
  };
  const handleScroll = () => {
    if (listInnerRef && listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      let winHeight = Math.round(scrollTop + clientHeight);


      if (winHeight === scrollHeight) {
        if (page <= totalPages) {
          setPage(page + 1);
          getMaterialListFun();
        }
      }
    }
  };
 
  useEffect(()=>{
     console.log("this called you can check");
     if(materialList.length > 0){
      let elem =
      materialList[0]["items"] &&
        materialList[0]["items"][0] &&
        materialList[0]["items"][0]["texture_info"]
        ? materialList[0]["items"][0]["texture_info"]
        : {};

      updateTextureFun(elem);
     }
  
  },[productInfo?.code === "0" || productInfo?.code === 0])

  useEffect(() => {
    console.log('called');
    getMaterialListFun();
  }, [selectedModalData]);

  useEffect(() => {
    if (
      materialCustomization &&
      materialCustomization.result &&
      materialCustomization.result.length > 0
    ) {
      if (materialCustomization.page_count != totalPages) {
        setPage(1);
      }
      setTotalPages(materialCustomization.page_count);
    }
    if (materialCustomization && materialCustomization.selected_item) {
      setTimeout(
        function () {
          updateTextureImg(materialCustomization.selected_item);
          updateTextureFun(materialCustomization.selected_item);
        }.bind(this),
        1000
      );
    } else if (page == 0) {
    }
  }, [materialCustomization]);

  useEffect(() => {
    setTimeout(
      function () {
    console.log("testing");
        addToCartFunScene(
          { ...cookies, ...customization_info, locale: locale },
          dispatch
        );
      }.bind(this),
      100
    );
  }, [stepsArray["MATERIAL_SELECTION"]]);


  const sliderSetting = {
    initialSlide: 0,
    observer: true,
    observeParents: true,
    loopAdditionalSlides: 1,
  };
  return (
    <>
    
       <SubHeading  title={data?.SPS_DESC} />
      {/* <Box>
        <Typography
          sx={(theme) => ({
            fontFamily: theme.fontFaces.helveticaNeueBold,
            fontSize: theme.typography.typography15,
            color: theme.palette.common.black,
          })}
        >
          {data && data?.SPS_DESC}
        </Typography>
      </Box> */}

      {alertMessage && (
        <Alert icon={<ErrorIcon fontSize="inherit" />} severity="warning">
          {alertMessage}
        </Alert>
      )}


      <Box px={3} py={2}>
        <Grid
          container
          spacing={1}
          onScroll={() => handleScroll()}
          ref={listInnerRef}
          className="scroller_fun"
          style={{ 'overflow-y': 'scroll', 'height': '400px' }}
        >
          {materialList &&
            materialList.map((item_info, index) => {
              console.log("materialListdata",item_info);
              console.log("productInfo?.code",productInfo?.code);
              let elem =
                item_info["items"] &&
                  item_info["items"][0] &&
                  item_info["items"][0]["texture_info"]
                  ? item_info["items"][0]["texture_info"]
                  : {};
              let checked = item_info?.items
                ? find(item_info?.items, {
                  SII_CODE: productInfo?.code,
                })
                : false;
              return (
                <Grid item lg={4} md={4} sm={4} xs={6} xxs={6} key={index}>
                  <Box
                    ref={selectedRef}
                    className="selectMaterial"
                    sx={(theme) => ({
                      // p: 0.5,
                      borderRadius: '10px',
                      border:
                        checked && `3px solid ${theme.palette.primary.main}`,
                    })}
                    position="relative"
                  >
                    <a
                      className="matrial_class"
                      onClick={(e) => {
                        updateTextureFun(elem);
                        dispatch(setStepIndex(tourState.stepIndex + 1))
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <NextFillImage
                        src={
                          elem.SII_THUMBNAIL_IMAGES
                            ? item_img_path + elem.SII_THUMBNAIL_IMAGES
                            : img_path + "noimage.jpg"
                        }
                        alt={elem?.IMAGE_PATH}
                        sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                        objectFit="contain"
                        sx={{
                          width: "auto!important",
                          height: "auto!important",
                          objectFit: "contain",
                          backgroundSize: "contain",
                          "&.MuiCard-root": {
                            borderRadius: "8px 8px 0px 0px",
                            boxShadow: "none",
                            position: "relative!important",
                            width: "100%!important",
                            height: "100%!important",
                          },
                        }}
                      />

                      {checked && (
                        <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                          <CheckCircleIcon
                            sx={{
                              color: (theme) => theme.palette.primary.main,
                              bgcolor: "common.white",
                              borderRadius: "50%",
                            }}
                          />
                        </Box>
                      )}
                    </a>
                    <Box
                      sx={{
                        boxSizing: "border-box",
                        mt: 2,
                        mb: { md: 2, sm: 0, xs: 0, xxs: 0 },
                        "& .splide": {
                          padding: "0em!important",
                          // px:"10px"
                        },
                      }}
                    >
                      <MaterialSwiper item_info={item_info} updateTextureFun={updateTextureFun} productInfo={productInfo} item_img_path={item_img_path} elem={elem} />
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          <Grid   item lg={12} md={12} sm={12} xs={12} xxs={12}>
            {data?.SUB_CHILD.map((elem, index) => {
              if (elem?.SUB_CHILD && elem?.SUB_CHILD[0]) {
                return (
                  <SubStepImport key={index} data={elem} formik={formik} />
                );
              }
            })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MaterialSelection;