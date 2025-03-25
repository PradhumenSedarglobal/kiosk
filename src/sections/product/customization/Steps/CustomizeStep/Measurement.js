import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextBox } from "@/components/form";
import { measurementText, addToCartFunScene } from "../../sceneCanvas3D";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import {
  setCustomizationFun,
  deleteCustomizationStep,
} from "@/redux/slices/customization";
import { useAuthContext } from "@/auth/useAuthContext";
import MainHeading from "@/app/components/MainHeading";
import SubHeading from "@/app/components/SubHeading";

const re = /^\d*\.?\d*$/;

const Measurement = ({ data }) => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { locale } = useRouter();
 


  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;

  console.log("customization_info111",customization_info);

  const { stepsArray, editStepData, productInfo } = customization_info;

  let [me_width, setMe_width] = useState(productInfo.SPI_MIN_WIDTH);
  let [me_height, setMe_height] = useState(productInfo.SPI_MIN_HEIGHT);
  const [isvalid, setIivalid] = useState({
    product_width: false,
    product_height: false,
  });

  useEffect(()=>{
    if(productInfo.SPI_MIN_WIDTH && productInfo.SPI_MIN_HEIGHT){
      setMe_width(productInfo.SPI_MIN_WIDTH);
      measurementFun("product_width", productInfo.SPI_MIN_WIDTH);
    }
  
  },[])


  const [matrialWidthChecker,setMaterialWidthChecker] = useState(false);

  let MIN_WIDTH = parseInt(productInfo.SPI_MIN_WIDTH);
  let MAX_WIDTH = parseInt(productInfo.SPI_MAX_WIDTH);
  let MIN_HEIGHT = parseInt(productInfo.SPI_MIN_HEIGHT);
  let MAX_HEIGHT = parseInt(productInfo.SPI_MAX_HEIGHT);


  console.log("stepsArraystepsArray",stepsArray);
  console.log("state.productInfo",productInfo);
  
  const fonts = useSelector((state) => state.font);

  let restrict_to_material_width_yn =
    productInfo.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN
      ? productInfo.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN
      : "N";
  if (
    restrict_to_material_width_yn == "Y" &&
    stepsArray &&
    stepsArray.MATERIAL_SELECTION &&
    stepsArray.MATERIAL_SELECTION.material_info.SII_WIDTH
  ) {
    MAX_WIDTH = parseInt(stepsArray.MATERIAL_SELECTION.material_info.SII_WIDTH);
  }

  let restrict_to_material_height_yn =
    productInfo.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN
      ? productInfo.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN
      : "N";
  if (
    restrict_to_material_height_yn == "Y" &&
    stepsArray &&
    stepsArray.MATERIAL_SELECTION &&
    stepsArray.MATERIAL_SELECTION.material_info.SII_LENGTH
  ) {
    MAX_HEIGHT = parseInt(
      stepsArray.MATERIAL_SELECTION.material_info.SII_LENGTH
    );
  } else if (
    stepsArray.CONTROL_TYPE &&
    stepsArray["CONTROL_TYPE"]["SPS_CODE"] == "CT02" &&
    parseInt(stepsArray.CONTROL_TYPE.SPS_MAX_HEIGHT) > 10 &&
    parseInt(productInfo.SPI_MAX_HEIGHT) >
      parseInt(stepsArray.CONTROL_TYPE.SPS_MAX_HEIGHT)
  ) {
    MAX_HEIGHT = parseInt(stepsArray.CONTROL_TYPE.SPS_MAX_HEIGHT);
  } else if (
    stepsArray.TRACK_OPTION &&
    ["TO01", "TO02", "TO03"].indexOf(stepsArray["TRACK_OPTION"]["SPS_CODE"]) >=
      0 &&
    parseInt(stepsArray.TRACK_OPTION.SPS_MAX_HEIGHT) > 10 &&
    parseInt(productInfo.SPI_MAX_HEIGHT) >
      parseInt(stepsArray.TRACK_OPTION.SPS_MAX_HEIGHT)
  ) {
    MAX_HEIGHT = parseInt(stepsArray["TRACK_OPTION"]["SPS_MAX_HEIGHT"]);
  }

  if (
    stepsArray.CONTROL_TYPE &&
    stepsArray["CONTROL_TYPE"]["SPS_CODE"] == "CT02" &&
    parseInt(stepsArray.CONTROL_TYPE.SPS_MIN_WIDTH) >
      parseInt(productInfo.SPI_MIN_WIDTH)
  ) {
    MIN_WIDTH = parseInt(stepsArray.CONTROL_TYPE.SPS_MIN_WIDTH);
  } else if (
    stepsArray.TRACK_OPTION &&
    ["TO01", "TO02", "TO03"].indexOf(stepsArray["TRACK_OPTION"]["SPS_CODE"]) >=
      0 &&
    parseInt(stepsArray["TRACK_OPTION"]["SPS_MIN_WIDTH"]) >
      parseInt(productInfo.SPI_MIN_WIDTH)
  ) {
    MIN_WIDTH = parseInt(stepsArray["TRACK_OPTION"]["SPS_MIN_WIDTH"]);
  }

  const measurementFun = (type, value) => {
    
    let m_width = me_width;
    let m_height = me_height;
    
    let val = value;

    if (val == NaN) {
      return false;
    }
    console.log('comming here')
    if (type == "product_width") {
      m_width = val;
      setMe_width(val);
      toggleValidation(type, val);
    } else if (type == "product_height") {
      m_height = val;
      setMe_height(val);
      toggleValidation(type, val);
    } else if (
      type != "product_width" &&
      type != "product_height" &&
      type > 0 &&
      val > 0
    ) {
      m_width = type;
      m_height = val;
      setMe_width(type);
      setMe_height(val);
      toggleValidation("product_height", val);
      toggleValidation("product_width", type);
    }

    let measurement_data = { ...data, m_width: m_width, m_height: m_height };

    if (m_height > 0 && m_width > 0 && !isNaN(m_width) && !isNaN(m_height)) {
      measurement_data["UOM_CODE"] = stepsArray.MATERIAL_SELECTION
        ? stepsArray.MATERIAL_SELECTION.material_info.SII_UOM_CODE
        : 0;
      measurement_data["ITEM_CODE"] = stepsArray.MATERIAL_SELECTION
        ? stepsArray.MATERIAL_SELECTION.material_info.SII_CODE
        : 0;

      if (
        m_width < MIN_WIDTH ||
        m_width > MAX_WIDTH ||
        m_height < MIN_HEIGHT ||
        (m_height > MAX_HEIGHT && stepsArray && stepsArray.MEASUREMENT)
      ) {
        //setIivalid({ product_width: true, product_height: true });
        dispatch(deleteCustomizationStep(["MEASUREMENT"]));
      } else {
        dispatch(setCustomizationFun(measurement_data));
        measurementText(m_width, m_height);
      }
    }
  };

  const toggleValidation = (name, value) => {
    console.log(name, value,'toggleValidation')
    if ((value < MIN_WIDTH || value > MAX_WIDTH) && name == "product_width") {
      setIivalid({ ...isvalid, [name]: true });
    } else if (
      (value < MIN_HEIGHT || value > MAX_HEIGHT) &&
      name == "product_height"
    ) {
      setIivalid({ ...isvalid, [name]: true });
    } else {
      setIivalid({ ...isvalid, [name]: false });
    }
  };

  useEffect(() => {
    if (
      editStepData.info_result &&
      editStepData.info_result.MEASUREMENT &&
      editStepData.info_result.MEASUREMENT.SOI_WIDTH > 0 &&
      editStepData.info_result.MEASUREMENT.SOI_HEIGHT > 0
    ) {
      setTimeout(
        function () {
          measurementFun(
            editStepData.info_result.MEASUREMENT.SOI_WIDTH,
            editStepData.info_result.MEASUREMENT.SOI_HEIGHT
          );
        }.bind(this),
        600
      );
    } else if (
      editStepData.line_result &&
      editStepData.line_result.SOL_WIDTH > 0 &&
      editStepData.line_result.SOL_HEIGHT > 0
    ) {
      setTimeout(
        function () {
          measurementFun(
            editStepData.line_result.SOL_WIDTH,
            editStepData.line_result.SOL_HEIGHT
          );
        }.bind(this),
        600
      );
    } else if (
      stepsArray["MEASUREMENT"] &&
      stepsArray["MEASUREMENT"]["m_width"] > 0 &&
      stepsArray["MEASUREMENT"]["m_height"] > 0
    ) {
      setTimeout(
        function () {
          measurementFun(
            stepsArray["MEASUREMENT"]["m_width"],
            stepsArray["MEASUREMENT"]["m_height"]
          );

         

        }.bind(this),
        600
      );
    }
  }, [MIN_WIDTH, MAX_HEIGHT]);

  useEffect(() => {
 
    if (isvalid.product_width == false && isvalid.product_height == false) {
     
      setTimeout(
        function () {
          addToCartFunScene(
            { ...cookies, ...customization_info, locale: locale },
            dispatch
          );
        }.bind(this),
        500
      );
    }
  }, [isvalid.product_width, isvalid.product_height, me_width, me_height]);




  useEffect(() => {
    if (productInfo.SPI_MAX_WIDTH <= stepsArray.MEASUREMENT?.m_width) {
      console.log("check width called");
      setMe_width(0);
      measurementFun("product_width", stepsArray.MEASUREMENT?.m_width);
    }
  }, [MAX_WIDTH < me_width]); 

  useEffect(() => {
    if (productInfo.SPI_MAX_HEIGHT <= stepsArray.MEASUREMENT?.m_height) {
      console.log("check width called");
      setMe_width(0);
      measurementFun("product_height", stepsArray.MEASUREMENT?.m_height);
    }
  }, [MAX_HEIGHT < me_height]); 
  
  

  

  return (
    <>
    <SubHeading  title={data?.SPS_DESC} />
    <Box sx={{ overflow: "hidden" }}>

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

      <Box  px={3} py={2} sx={{ overflow: "hidden"}}>
        {" "}
        {/* Hide overflow here */}

        <Typography
          sx={{
            "@media (min-width: 375px) and (max-width: 450px)": {
              display: "unset", 
            },
            display: "flex",
            marginBottom: "10px",
            fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
          }}
          dangerouslySetInnerHTML={{
            __html: translate("product_width", {
              min_width: MIN_WIDTH,
              max_width: MAX_WIDTH,
            }),
          }}
        />
        <TextBox
         
          fullWidth
          type="text"
          variant="outlined"
          size="large"
          name="product_width"
          value={me_width}
          onChange={(e) => {
            re.test(e.target.value)
              ? setMe_width(e.target.value)
              : setMe_width("");
            re.test(e.target.value) &&
              measurementFun("product_width", e.target.value);
          }}
          helperText={
            isvalid.product_width &&
            translate("product_width_validation", {
              min_width: MIN_WIDTH,
              max_width: MAX_WIDTH,
            })
          }
          formControlSx={{
            mb: 0,
            px: 0,
            backgroundColor: (theme) => theme.palette.common.white,
            borderRadius: "8px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "8px",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.common.black,
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.common.black,
            },
            "& .MuiOutlinedInput-input": {
              fontFamily: (theme) => theme.typography.typography14,
            },
            fontFamily: fonts.Helvetica_Neue_Regular.style.fontFamily,
          }}
          required
        />
      </Box>

      <Box  px={3} py={2} sx={{ overflow: "hidden" }}>
        {" "}
        {/* Hide overflow here */}
        <Typography
           sx={{
            "@media (min-width: 375px) and (max-width: 450px)": {
              display: "unset", 
            },
            display: "flex",
            marginBottom: "10px",
            fontFamily: fonts.Helvetica_Neue_Bold.style.fontFamily,
          }}
          dangerouslySetInnerHTML={{
            __html: translate("product_height", {
              min_height: MIN_HEIGHT,
              max_height: MAX_HEIGHT,
            }),
          }}
        />
        <TextBox
          fullWidth
          type="text"
          size="large"
          variant="outlined"
          name="product_height"
          value={me_height}
          onChange={(e) => {
            re.test(e.target.value)
              ? setMe_height(e.target.value)
              : setMe_height("");
            re.test(e.target.value) &&
              measurementFun("product_height", e.target.value);
          }}
          helperText={
            isvalid.product_height &&
            translate("product_height_validation", {
              min_height: MIN_HEIGHT,
              max_height: MAX_HEIGHT,
            })
          }
          formControlSx={{
            mb: 0,
            px: 0,
            borderRadius: "8px",
            backgroundColor: (theme) => theme.palette.common.white,
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "8px",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.common.black,
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.common.black,
            },
            "& .MuiOutlinedInput-input": {
              fontFamily: (theme) => theme.typography.typography14,
            },
          }}
          required
        />
      </Box>
    </Box>
    </>
  );
};

export default Measurement;
