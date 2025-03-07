import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextBox } from "@/components/form";
import { measurementText, addToCartFunScene } from "../../sceneCanvas3D";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import { setCustomizationFun, deleteCustomizationStep } from "@/redux/slices/customization";
import { useAuthContext } from "@/auth/useAuthContext";

const re = /^\d*\.?\d*$/;

const RollCalculationTool = ({ data }) => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { query,locale } = useRouter();

  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;

  const { stepsArray, editStepData, productInfo, priceArray } = customization_info;


  let [me_width, setMe_width] = useState();
  let [me_height, setMe_height] = useState();
  const [isvalid, setIivalid] = useState({ product_width: false, product_height: false });


  let MIN_WIDTH = parseInt(productInfo.SPI_MIN_WIDTH);
  let MAX_WIDTH = parseInt(productInfo.SPI_MAX_WIDTH);
  let MIN_HEIGHT = parseInt(productInfo.SPI_MIN_HEIGHT);
  let MAX_HEIGHT = parseInt(productInfo.SPI_MAX_HEIGHT);

  let restrict_to_material_width_yn = productInfo.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN ? productInfo.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN : 'N';
  if (restrict_to_material_width_yn == 'Y' && stepsArray && stepsArray.MATERIAL_SELECTION && stepsArray.MATERIAL_SELECTION.material_info.SII_WIDTH) {
    MAX_WIDTH = parseInt(stepsArray.MATERIAL_SELECTION.material_info.SII_WIDTH);
  }

  let restrict_to_material_height_yn = productInfo.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN ? productInfo.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN : 'N';
  if (restrict_to_material_height_yn == 'Y' && stepsArray && stepsArray.MATERIAL_SELECTION && stepsArray.MATERIAL_SELECTION.material_info.SII_LENGTH) {
    MAX_HEIGHT = parseInt(stepsArray.MATERIAL_SELECTION.material_info.SII_LENGTH);
  }


  const rollCalculationfun = (type, value) => {
    let m_width = me_width;
    let m_height = me_height;
    //let val = parseInt(value);
    let val = value;

    if (val == NaN) {
      return false;
    }

    if (type == 'product_width') {
      m_width = val;
      setMe_width(val);
      toggleValidation(type, val);
    } else if (type == 'product_height') {
      m_height = val;
      setMe_height(val);
      toggleValidation(type, val);
    } else if (type != 'product_width' && type != 'product_height' && type > 0 && val > 0) {
      m_width = type;
      m_height = val;
      setMe_width(type);
      setMe_height(val);

    }

    let measurement_data = { ...data, m_width: m_width, m_height: m_height }

    if (m_height > 0 && m_width > 0 && !isNaN(m_width) && !isNaN(m_height)) {
      measurement_data['UOM_CODE'] = stepsArray.MATERIAL_SELECTION ? stepsArray.MATERIAL_SELECTION.material_info.SII_UOM_CODE : 0;
      measurement_data['ITEM_CODE'] = stepsArray.MATERIAL_SELECTION ? stepsArray.MATERIAL_SELECTION.material_info.SII_CODE : 0;

      if (m_width < MIN_WIDTH || m_width > MAX_WIDTH || m_height < MIN_HEIGHT || m_height > MAX_HEIGHT && stepsArray && stepsArray.ROLL_CALCULATION) {
        dispatch(deleteCustomizationStep(['ROLL_CALCULATION']))
      } else {
        dispatch(setCustomizationFun(measurement_data));
        measurementText(m_width, m_height);
      }
    }
  }

  const toggleValidation = (name, value) => {

    if ((value < MIN_WIDTH || value > MAX_WIDTH) && name == 'product_width') {
      setIivalid({ ...isvalid, [name]: true });
    } else if ((value < MIN_HEIGHT || value > MAX_HEIGHT) && name == 'product_height') {
      setIivalid({ ...isvalid, [name]: true });
    } else {
      setIivalid({ ...isvalid, [name]: false });
    }
  };


  useEffect(() => {

    if (editStepData.info_result && editStepData.info_result.ROLL_CALCULATION && editStepData.info_result.ROLL_CALCULATION.SOI_WIDTH > 0 && editStepData.info_result.ROLL_CALCULATION.SOI_HEIGHT > 0) {
      setTimeout(function () {
        rollCalculationfun(editStepData.info_result.ROLL_CALCULATION.SOI_WIDTH, editStepData.info_result.ROLL_CALCULATION.SOI_HEIGHT);
      }.bind(this), 500);
    } else if (editStepData.line_result && editStepData.line_result.SOL_WIDTH > 0 && editStepData.line_result.SOL_HEIGHT > 0) {
      setTimeout(function () {
        rollCalculationfun(editStepData.line_result.SOL_WIDTH, editStepData.line_result.SOL_HEIGHT);
      }.bind(this), 500);
    }

  }, []);

  useEffect(() => {
    if (isvalid.product_width == false && isvalid.product_height == false && me_width && me_height) {
      setTimeout(function () {
        addToCartFunScene({ ...cookies, ...customization_info,locale:locale }, dispatch);
      }.bind(this), 500);
    }
  }, [isvalid.product_width, isvalid.product_height, me_width, me_height]);

  useEffect(() => {
    if (priceArray && parseInt(priceArray.ROLL_CALC) > 0 && parseInt(priceArray.ROLL_CALC) > parseInt(priceArray.SOL_QTY) && stepsArray.QUANTITY) {
      let qunt_data = { ...stepsArray.QUANTITY, QTY: priceArray.ROLL_CALC };
      dispatch(
        setCustomizationFun(qunt_data)
      );
    }

  }, [priceArray.ROLL_CALC]);

  return (
    <Box>
      <Box>
        <Typography
          sx={(theme) => ({
            fontFamily: theme.fontFaces.helveticaNeueBold,
            fontSize: theme.typography.typography15,
            color: theme.palette.common.black,
          })}
        >
          {data && data?.SPS_DESC}
        </Typography>
      </Box>
      <Box py={2}>

        <Typography
          dangerouslySetInnerHTML={{
            __html: translate('width_with_val', { min: MIN_WIDTH, max: MAX_WIDTH })
          }}
        />
        <TextBox
          fullWidth
          type="text"
          variant="outlined"
          size="small"
          name="product_width"
          value={me_width}
          onChange={(e) => { re.test(e.target.value) ? setMe_width(e.target.value) : setMe_width(''); re.test(e.target.value) && rollCalculationfun('product_width', e.target.value); }}
          helperText={
            isvalid.product_width && translate('product_width_validation', { min_width: MIN_WIDTH, max_width: MAX_WIDTH })
          }
          formControlSx={{
            mb: 0,
            px: 0,
            borderRadius: 0,
            backgroundColor: (theme) => theme.palette.common.white,
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: 0,
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
      <Box py={2}>
        <Typography
          dangerouslySetInnerHTML={{
            __html: translate('height_with_val', { min: MIN_HEIGHT, max: MAX_HEIGHT })
          }}
        />

        <TextBox
          fullWidth
          type="text"
          size="small"
          variant="outlined"
          name="product_height"
          value={me_height}
          onChange={(e) => { re.test(e.target.value) ? setMe_height(e.target.value) : setMe_height(''); re.test(e.target.value) && rollCalculationfun('product_height', e.target.value) }}
          helperText={
            isvalid.product_height && translate('product_height_validation', { min_height: MIN_HEIGHT, max_height: MAX_HEIGHT })
          }
          formControlSx={{
            mb: 0,
            px: 0,
            borderRadius: 0,
            backgroundColor: (theme) => theme.palette.common.white,
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: 0,
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
      <Box>
        {priceArray && priceArray.ROLL_CALC > 0 ?
          <Typography
            className="recommended_mgs"
            dangerouslySetInnerHTML={{
              __html: translate('recommended_mgs', { roll: priceArray.ROLL_CALC })
            }}
          />
          : ""
        }
      </Box>
    </Box>
  );
};

export default RollCalculationTool;
