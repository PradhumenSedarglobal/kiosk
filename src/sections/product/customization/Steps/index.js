var validation_steps_type = ["TECH", "MATL", "MEASUREMENT", "ROLL_CALCULATION"];

import Iconify from "@/components/iconify";
import { NextFillImage } from "@/components/image";
import { CustomLink } from "@/components/link";
import { useDispatch, useSelector } from "@/redux/store";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addToCartFunScene } from "../sceneCanvas3D";
import SuccessModal from "./Modal/SuccessModal";
import ValidationPopup from "./Modal/ValidationPopup";
import StepImport from "./StepImport";
import BottomBarTabination from "./tabination/bottomBarTabination";
import SideTab from "./tabination/sideTab";
import { useAuthContext } from "@/auth/useAuthContext";
import PopupModal from "@/app/components/PopupModal";
import { decrementStep } from "@/redux/slices/stepSlice";
import { setStepIndex } from "@/redux/slices/tourSlice";


const SceneCanvas3D = dynamic(() => import("../sceneCanvas3D"), {
  ssr: false,
});

const TabinationStepsSection = ({ formik, data, handleOpen, open,handleSubmit,formClose,setFormClose }) => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { locale, query } = useRouter();
  const { slug } = query;
  const { productInfo, stepsArray, priceArray, customization,ShowformModal,customerSysId } =
    customization_info;
  const [successPopup, setSuccessPopup] = useState(false);
  const [missingStep, setMissingStep] = useState({});
  const [missingPopup, setMissingPopup] = useState(false);
  const [showAddToCart,setAddToCartShow] = useState(false);

  const [errorValidation, setErrorValidation] = useState({});

  let m_width = productInfo.m_width ? parseInt(productInfo.m_width) : 0;
  let m_height = productInfo.m_height ? parseInt(productInfo.m_height) : 0;
  let restrict_to_material_width_yn = productInfo.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN ? productInfo.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN : 'N';
  let restrict_to_material_height_yn = productInfo.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN ? productInfo.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN : 'N';

  console.log("missingSteppppp",missingStep);
  console.log("errorValidation",errorValidation);
  console.log("missingPopup",missingPopup);

  const [tabChange, setTabChange] = useState("1");
  const onNextHandle = (type) => {
    stepValidation();

    let missing_step = Object.keys(missingStep);
    let error_validation = Object.keys(errorValidation);

    console.log("tabbbbbb",tabChange);
    if(tabChange === "1"){
      dispatch(setStepIndex(7));
    }else if(tabChange === 2){
      dispatch(setStepIndex(9));
    }
   


    let cart_status =
      type == "ADDTOCART" &&
      priceArray.SOL_VALUE > 0 &&
      missing_step.length == 0
        ? "COMPLETED"
        : "INCOMPLETE";
    if (tabChange != "6") {
      setTabChange((tabChange) => Number(tabChange) + 1);
      addToCartFunScene(
        { ...cookies, ...customization_info, locale: locale },
        dispatch
      );
    }

    if (type == "ADDTOCART" && missing_step.length > 0) {
      setMissingPopup(true);
    }

    setTimeout(
      function () {
        if (cart_status == "COMPLETED" && type == "ADDTOCART") {
          addToCartFunScene(
            { ...cookies, ...customization_info, locale: locale },
            dispatch,
            cart_status
          );
        }

        if (
          missing_step.length == 0 &&
          cart_status == "COMPLETED" &&
          type == "ADDTOCART" &&
          stepsArray["MATERIAL_SELECTION"] &&
          (stepsArray["MEASUREMENT"] || stepsArray["ROLL_CALCULATION"])
        ) {
          setSuccessPopup(true);
        }
      }.bind(this),
      500
    );
  };


  const onPreviousHandle = () => {
    console.log("tabChange",tabChange);
    if (tabChange != "1") {

      setTabChange((tabChange) => Number(tabChange) - 1);

      addToCartFunScene(
        { ...cookies, ...customization_info, locale: locale },
        dispatch
      );
    }else{
      console.log("tabChange",tabChange);
      setTabChange(0);
      dispatch(decrementStep(1));
    }
  };

  const stepValidation = () => {
    customization && customization['CHILD'] && customization['CHILD'][1].filter((curElem, i) => {
      curElem.CHILD_STEP.filter((childElem) => {
        if (validation_steps_type.indexOf(childElem.SS_DATA_SOURCE) >= 0 && childElem.SS_CODE_NAME && stepsArray[childElem.SS_CODE_NAME] == undefined) {
          let validation = [];
          let new_data = Object.assign({ ...childElem }, { parent_index: i + 1 });
          validation[childElem.SS_CODE_NAME] = new_data;
          setMissingStep({ ...missingStep, ...validation });
        } else if (missingStep && missingStep[childElem.SS_CODE_NAME]) {
          delete missingStep[childElem.SS_CODE_NAME];
          setMissingStep(missingStep);
        }
        if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0) {
          filteFun(childElem.SUB_CHILD, childElem, i);
        }
      })
    });

  }
  const filteFun = (child_data, parent, parent_index) => {
    console.log("missingSteppp",missingStep);
    child_data.filter((childElem) => {
      let parent_id = stepsArray[parent.SS_CODE_NAME]
        ? stepsArray[parent.SS_CODE_NAME].SPS_SYS_ID
        : 0;
      if (
        validation_steps_type.indexOf(childElem.SS_DATA_SOURCE) >= 0 &&
        childElem.SS_CODE_NAME &&
        stepsArray[childElem.SS_CODE_NAME] == undefined &&
        parent_id == childElem.SPS_SPS_SYS_ID
      ) {
        let validation = [];
        let new_data = Object.assign(
          { ...childElem },
          { parent_index: parent_index + 1 }
        );
        validation[childElem.SS_CODE_NAME] = new_data;
        setMissingStep({ ...missingStep, ...validation });
      } else if (missingStep && missingStep[childElem.SS_CODE_NAME]) {
        delete missingStep[childElem.SS_CODE_NAME];
        setMissingStep(missingStep);
      }
      if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0) {
        filteFun(childElem.SUB_CHILD, childElem, parent_index);
      }
    });
  };

  useEffect(() => {

    if (stepsArray['MATERIAL_SELECTION'] && stepsArray['MATERIAL_SELECTION']['material_info'] && parseInt(stepsArray['MATERIAL_SELECTION']['material_info']['SII_WIDTH']) < m_width && restrict_to_material_width_yn == 'Y') {
      setErrorValidation({ ...errorValidation, MATERIAL_SELECTION: { mgs: translate('alertMessageMaxWidth_mgs'), parent_index: 2 } });
      setMissingPopup(true);
    } else if (stepsArray['MATERIAL_SELECTION'] && stepsArray['MATERIAL_SELECTION']['material_info'] && parseInt(stepsArray['MATERIAL_SELECTION']['material_info']['SII_LENGTH']) < m_height && restrict_to_material_height_yn == 'Y') {
      setErrorValidation({ ...errorValidation, MATERIAL_SELECTION: { mgs: translate('alertMessageMaxHeight_mgs'), parent_index: 2 } });
      setMissingPopup(true);
      //setValidationModal(true);
    }else if (stepsArray['TYPE_OF_MOTOR'] && parseInt(stepsArray['TYPE_OF_MOTOR']['SPS_MIN_WIDTH']) > m_width) {
      setErrorValidation({ ...errorValidation, TYPE_OF_MOTOR: { mgs: translate('motor_width_validation'), parent_index: 3 } });
      setMissingPopup(true);
    }
    else if (stepsArray['TYPE_OF_MOTOR'] && parseInt(stepsArray['TYPE_OF_MOTOR']['SPS_MAX_HEIGHT']) < m_height) {
      setErrorValidation({ ...errorValidation, TYPE_OF_MOTOR: { mgs: translate('motor_height_validation'), parent_index: 3 } });
      setMissingPopup(true);
    } else {
      console.log(33333, 'ValidationPopup');
      setErrorValidation({})
      //  customize_state.error_step_validation.TYPE_OF_MOTOR ? delete customize_state.error_step_validation.TYPE_OF_MOTOR : '';
    }
  }, [m_width, stepsArray['MATERIAL_SELECTION'], stepsArray['TYPE_OF_MOTOR']]);

  // useEffect(() => {
  //   stepValidation();
   
  //   setTimeout(
  //     function () {
  //       addToCartFunScene(
  //         { ...cookies, ...customization_info, locale: locale },
  //         dispatch
  //       );
  //     }.bind(this),
  //     500
  //   );
  // }, [tabChange]);

  const actions = [
    {
      icon: (
        <CustomLink
          target="_blank"
          link="https://twitter.com/intent/tweet?text=Sedar"
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{ color: (theme) => theme.palette.common.black }}
            width={30}
            height={30}
            icon="circum:twitter"
          />
        </CustomLink>
      ),
      name: "twitter",
    },
    {
      icon: (
        <CustomLink
          target="_blank"
          link="https://web.whatsapp.com/send?text=Sedar"
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{ color: (theme) => theme.palette.common.black }}
            width={30}
            height={30}
            icon="prime:whatsapp"
          />
        </CustomLink>
      ),
      name: "whatsapp",
    },
    {
      icon: (
        <CustomLink
          target="_blank"
          link="https://www.facebook.com/sharer/sharer.php?u"
          lang={locale}
        >
          <Iconify
            pt={1}
            sx={{ color: (theme) => theme.palette.common.black }}
            width={30}
            height={30}
            icon="circum:facebook"
          />
        </CustomLink>
      ),
      name: "facebook",
    },
  ];


  const handleAddToCart = () => {


    if(!showAddToCart && Object.keys(errorValidation).length === 0){
      setAddToCartShow(true);
    } 
  }

  
  console.log("data1",data);


  return (
    <>

      {showAddToCart && <PopupModal setTabChange={setTabChange} setAddToCartShow={setAddToCartShow}  />}

     
        {tabChange != "preview" && (
          <Box
            sx={{
              userSelect: "none",
              paddingBottom: "1.5rem",
            }}
          >
            <Box
              className="bigipads"
              sx={{
                height: { lg: "calc(100vh - 170px)", overflow: "auto" },
              }}
            >
              {data &&
                data?.length > 0 &&
                data[1]?.map((elem, index) => {
                  return (
                    <Box
                      component="div"
                      key={`${index}-${elem?.SPS_ORDERING}`}
                      sx={{
                        display:
                          tabChange == elem?.SPS_ORDERING ? "block" : "none",
                      }}
                    >
                      <StepImport
                        tabChange={tabChange}
                        formik={formik}
                        data={elem}
                        key={index}
                        setTabChange={setTabChange}
                      />
                    </Box>
                  );
                })}
            </Box>
          </Box>
        )}


        {tabChange == "preview" && (
          <>
            <Box
              sx={{
                // height: `calc(100vh - 300px)`,
                position: "relative",
                display: {
                  md: "none",
                  sm: "block",
                  xs: "block",
                  xxs: "block",
                },
              }}
            >
              <SceneCanvas3D {...(data && data?.length > 0 ? data?.[0] : {})} />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  p: 0,
                  backgroundColor: "#00000091",
                  height: { sm: "65px", md: "110px", xs: "65px", xxs: "65px" },
                  marginBottom: "0px",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-end"
                  height="100%"
                  pb={2}
                  px={2}
                >
                  {/* <Stack direction="row" alignItems="center" spacing={0.2} height="auto">
                        <Iconify
                          icon="ic:baseline-arrow-back-ios-new"
                          color="white"
                        />
                        <Typography
                          sx={(theme) => ({
                            fontFamily: theme.fontFaces.helveticaNeue,
                            fontSize: theme.typography.typography16,
                            color: theme.palette.common.white,
                          })}
                        >
                          <CustomLink lang={locale} link={slug[0] + "/" + slug[1]}>
                            {translate("back_to_overview", {
                              cat_desc: productInfo.SC_DESC,
                            })}
                          </CustomLink>
                        </Typography>
                      </Stack> */}
                  <Box component="div" width="13%">
                    <NextFillImage
                      src="/assets/threesixty.png"
                      sx={{
                        width: "100%!important",
                        height: "100%!important",
                        objectFit: "contain",
                        backgroundSize: "contain",
                        "&.MuiCard-root": {
                          borderRadius: 0,
                          boxShadow: "none",
                          position: "relative!important",
                          width: "100%!important",
                          height: "100%!important",
                        },
                      }}
                      alt="Image"
                      sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                      objectFit="contain"
                    />
                  </Box>
                  <Box component="div" height="max-content">
                    <Stack
                      direction="row"
                      spacing={2}
                      height="max-content"
                      alignItems="flex-end"
                    >
                      {/* <Box component="div" height="max-content">
                            <NextFillImage
                              src="/assets/heratround.png"
                              sx={{
                                width: "100%!important",
                                height: "100%!important",
                                objectFit: "contain",
                                backgroundSize: "contain",
                                "&.MuiCard-root": {
                                  borderRadius: 0,
                                  boxShadow: "none",
                                  position: "relative!important",
                                  width: "40px!important",
                                  height: "37px!important",
                                },
                              }}
                              sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                              objectFit="contain"
                            />
                          </Box> */}
                      <SpeedDial
                        ariaLabel="SpeedDial controlled open example"
                        sx={{
                          "&.MuiSpeedDial-root": {
                            "& .MuiSpeedDial-fab": {
                              width: "35px",
                              height: "35px",
                              background: (theme) => theme.palette.common.white,
                            },
                          },
                        }}
                        icon={
                          <Iconify
                            icon="material-symbols:share"
                            width={15}
                            sx={{ color: "common.black" }}
                          />
                        }
                        color="inherit"
                        onClick={handleOpen}
                        open={open}
                      >
                        {actions.map((action) => (
                          <SpeedDialAction
                            color="inherit"
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={handleOpen}
                            sx={(theme) => ({
                              display: open ? "block" : "none",
                              transition: theme.transitions.create(
                                ["display"],
                                {
                                  easing: theme.transitions.easing.easeInOut,
                                  duration: theme.transitions.duration.shorter,
                                }
                              ),
                            })}
                          />
                        ))}
                      </SpeedDial>
                      {/* <Box component="a" href="tel:8005051905" height="max-content">
                            <NextFillImage
                              src="/assets/call.png"
                              sx={{
                                width: "100%!important",
                                height: "100%!important",
                                objectFit: "contain",
                                backgroundSize: "contain",
                                "&.MuiCard-root": {
                                  borderRadius: 0,
                                  boxShadow: "none",
                                  position: "relative!important",
                                  width: "40px!important",
                                  height: "37px!important",
                                },
                              }}
                              sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                              objectFit="contain"
                            />
                          </Box> */}
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Box>
            <Box
              p={1.5}
              display={{
                lg: "none",
                md: "none",
                sm: "none",
                xs: "block",
                xxs: "block",
              }}
            >
              <Typography
                component="h4"
                variant="typography17"
                fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                color="common.black"
              >
                {translate("Preview")}{" "}
              </Typography>
              <Typography
                component="p"
                variant="typography17"
                lineHeight={1.5}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueLight}
                color="common.black"
              >
                Preview your selection below. You can click on any option to
                review or make changes. Once you have completed & confirmed your
                information, add the item to your cart.
              </Typography>
            </Box>
          </>
        )}
    

      <BottomBarTabination
        setTabChange={setTabChange}
        tabChange={tabChange}
        onNextHandle={onNextHandle}
        onPreviousHandle={onPreviousHandle}
        priceArray={priceArray}
        stepsArray={stepsArray}
        productInfo={productInfo}
        handleAddToCart={handleAddToCart}
        handleSubmit={handleSubmit}
        formClose={formClose}
        setFormClose={setFormClose}
        customerSysId={customerSysId}
        customization_info={customization_info}
      />

       
      <SuccessModal successPopup={successPopup} />

      <ValidationPopup
        missingStep={missingStep}
        missingPopup={missingPopup}
        setTabChange={setTabChange}
        setMissingPopup={setMissingPopup}
      />
    </>
  );
};

export default TabinationStepsSection;
