import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { NextFillImage } from "@/components/image";
import InfoDilogueButton from "./infoDilogueButton";
import { useDispatch, useSelector } from "@/redux/store";
import { setCustomizationFun, deleteCustomizationStep, errorValidationFun } from "@/redux/slices/customization";
import { mounting, controlType, rollType, bottomBar, valanceType, glassOption, panelOption } from '../../sceneCanvas3D';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SelectCardImage = ({
  cardImage,
  title,
  infoData,
  elem,
  item,
  disabled = false
}) => {
  const dispatch = useDispatch();
  const [openInfo, setOpenInfo] = useState(false);
  const { customization, stepsArray, editStepData } = useSelector((state) => state.customization);
  let info_result = editStepData.info_result;
  let obj_info = customization && customization['CHILD'] && customization['CHILD'][0] ? customization['CHILD'][0] : [];

  let sfi_light_filtering_app_yn = stepsArray.MATERIAL_SELECTION && stepsArray.MATERIAL_SELECTION.material_info ? stepsArray.MATERIAL_SELECTION.material_info.SFI_LIGHT_FILTERING_APP_YN : false;
  let sfi_blackout_lining_app_yn = stepsArray.MATERIAL_SELECTION && stepsArray.MATERIAL_SELECTION.material_info ? stepsArray.MATERIAL_SELECTION.material_info.SFI_BLACKOUT_LINING_APP_YN : false;

  const selectOptionFun = (data) => {
    let new_data = Object.assign({}, data, {});
    delete new_data['SUB_CHILD'];
    dispatch(
      setCustomizationFun(new_data)
    );

    console.log("ss code name",data.SS_CODE_NAME);
    switch (data.SS_CODE_NAME) {
      case 'MOUNTING_OPTION':
        if (data.SPS_CODE == 'MO02' && stepsArray['WINDOW_DEPTH']) {
          dispatch(deleteCustomizationStep(['WINDOW_DEPTH']))
        }
        mounting(data.SPS_CODE, obj_info);
        break;
      case 'CONTROL_TYPE':
        if (data.SPS_CODE == 'CT01' && stepsArray['MOTOR_POSITION']) {
          dispatch(deleteCustomizationStep(['MOTOR_POSITION', 'TYPE_OF_MOTOR', 'TYPE_OF_REMOTE', 'LENGTH_OF_WIRE']))
        } else if (data.SPS_CODE == 'CT02' && stepsArray['OPERATING_SIDE']) {
          dispatch(deleteCustomizationStep(['OPERATING_SIDE']))
        }
        controlType(data.SPS_CODE);
        break;
      case 'ROLL_TYPE':
        rollType(data.SPS_CODE);
        break;
      case 'VALANCE_OPTION':
        if (data.SPS_CODE == 'VAL02' && stepsArray['VALANCE_COLOR']) {
          dispatch(deleteCustomizationStep(['VALANCE_COLOR']))
        }
        valanceType(data.SPS_CODE);
        break;
      case 'BOTTOM_BAR':
        bottomBar(data.SPS_CODE);
        break;
      case 'PANEL_OPTION':
        panelOption(data.SPS_CODE);
        break;
      case 'GLASS_OPTION':
        glassOption(data.SPS_CODE);
        if (data.SPS_CODE == 'GL01' && stepsArray['GLASS_COLOR']) {
          dispatch(deleteCustomizationStep(['GLASS_COLOR']))
        }
        break;
      case 'MATERIAL_SURFACE':
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    let editcheck = true;
    if (info_result && item.SS_CODE_NAME && info_result[item.SS_CODE_NAME] && info_result[item.SS_CODE_NAME]['SOI_SPS_CODE'] == elem.SPS_CODE) {
      selectOptionFun(elem);
      editcheck = false;
    } else if (info_result[item.SS_CODE_NAME] == undefined && elem.SPS_VALUE_DEFAULT == 'Y' && editcheck) {
      selectOptionFun(elem);
    }
  }, [elem.SS_CODE_NAME, sfi_blackout_lining_app_yn, sfi_light_filtering_app_yn])


  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: "5px !important", cursor: "pointer" }}
      onClick={() => { disabled == false ? selectOptionFun(elem) : '' }}
      disabled
    >
      <Box px={1} py={2} disabled>
        <Box sx={{ position: "relative" }}>
          <NextFillImage
            src={cardImage}
            sx={{
              width: "100%!important",
              height: "100%!important",
              objectFit: "contain",
              backgroundSize: "contain",
              cursor: disabled ? "not-allowed" : '',
              opacity: disabled ? 0.2 : 1,
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
          {elem.SS_CODE_NAME && stepsArray && stepsArray[elem.SS_CODE_NAME] && stepsArray[elem.SS_CODE_NAME]['SPS_SYS_ID'] == elem?.SPS_SYS_ID && (
            <Box sx={{ position: "absolute", top: 0, right: -4 }}>
              {/* <NextFillImage
                src="/assets/defaultSelect.png"
                sx={{
                  width: "100%!important",
                  height: "100%!important",
                  objectFit: "contain",
                  backgroundSize: "contain",
                  "&.MuiCard-root": {
                    borderRadius: 0,
                    boxShadow: "none",
                    position: "relative!important",
                    width: "20px!important",
                    height: "100%!important",
                  },
                }}
                sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                objectFit="contain"
              /> */}
              <CheckCircleIcon sx={{color:(theme)=>theme.palette.primary.main}}/>
            </Box>
          )}
        </Box>

        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            sx={(theme) => ({
              textAlign: "center",
              fontFamily: theme.fontFaces.helveticaNeue,
              fontSize: theme.typography.typography13,
              color: theme.palette.common.black,
            })}
          >
            {title}
          </Typography>
          <InfoDilogueButton
            open={openInfo}
            setOpen={setOpenInfo}
            image={cardImage}
            headingText={title}
            subHeadingText={infoData}
            elem={elem}
          />
        </Stack>
      </Box>
    </Card>
  );
};

export default SelectCardImage;
