import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import { FormControl } from "@/components/form";
import RadioCheckBoxDilog from "../tabination/radioCheckBoxDilog";
import { useDispatch, useSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import { setCustomizationFun } from "@/redux/slices/customization";
import { manualControl } from '../../sceneCanvas3D';
import SubStepImport from '../SubStepImport';
import SelectCardImage from "../tabination/selectCardImage";

const OperatingSide = ({ data }) => {


  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { customization, stepsArray, editStepData } = useSelector((state) => state.customization);
  let obj_info = customization && customization['CHILD'] && customization['CHILD'][0] ? customization['CHILD'][0] : [];

  let step_name = data.SS_CODE_NAME ? data.SS_CODE_NAME : false;
  let stepArray = [];

  const optionFun = (val) => {
    manualControl(val.SPS_CODE, obj_info);
    dispatch(
      setCustomizationFun(val)
    )
  }

  useEffect(() => {
    let editcheck = true;
    data.SUB_CHILD.map((elem) => {
      if (editStepData.info_result && editStepData.info_result[step_name] && editStepData.info_result[step_name]['SPS_CODE'] == elem.SPS_CODE) {
        setTimeout(optionFun(elem), 1500)
        editcheck = false;
      } else if (elem.SPS_VALUE_DEFAULT == 'Y' && editcheck) {
        elem.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(optionFun(elem), 1500) : '';
      }
    })
  }, []);
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
      <FormControl fullWidth>
        <Box py={2}>
          <Grid container justifyContent="space-between" spacing={1}>

            {data?.SUB_CHILD?.map((elem, index) => {
              switch (data.SPS_INPUT_TYPE) {
                case '1':
                  return (
                    <Grid item lg={6} md={6} sm={6} xs={6} xxs={6} key={index}>
                      <SelectCardImage
                        elem={elem}
                        item={data}
                        cardImage={elem?.SPS_IMAGE_PATH}
                        title={elem?.SPS_DESC}
                        infoData={elem?.SPS_MORE}
                      />
                    </Grid>
                  );
                case '2':
                  return (
                    <Grid item lg={6} md={6} sm={6} xs={12} xxs={12} key={index}>
                      <FormControlLabel
                        sx={{
                          width: "100%!important",
                          marginRight: "0px!important",
                          marginLeft: "0px",
                        }}
                        key={index}
                        control={
                          <Radio
                            checked={
                              stepsArray[step_name] && stepsArray[step_name]['SPS_CODE'] == elem.SPS_CODE ? true : false
                            }
                            onChange={() => { optionFun(elem) }}
                          />
                        }
                        label={<RadioCheckBoxDilog elem={elem} /> }
                      />
                    </Grid>
                  )
                default:
                  return (
                    <Grid item lg={6} md={6} sm={6} xs={12} xxs={12} key={index}>
                      <FormControlLabel
                        sx={{
                          width: "100%!important",
                          marginRight: "0px!important",
                          marginLeft: "0px",
                        }}
                        key={index}
                        control={
                          <Radio
                            checked={
                              stepsArray[step_name] && stepsArray[step_name]['SPS_CODE'] == elem.SPS_CODE ? true : false
                            }
                            onChange={() => { optionFun(elem) }}
                          />
                        }
                        label={<RadioCheckBoxDilog elem={elem} />}
                      />
                    </Grid>
                  )
              }
            })
            }
          </Grid>
        </Box>
        <Grid sm={12}>
          {data.SUB_CHILD.map((data, index) => {
            if (data.SUB_CHILD && data.SUB_CHILD[0] && stepArray && data.SUB_CHILD[0].SPS_SPS_SYS_ID == stepArray.SPS_SYS_ID) {
              return (
                <div key={index}>
                  <SubStepImport {...data} />
                </div>
              )
            }
          })
          }
        </Grid>

      </FormControl>
    </Box>
  );
};

export default OperatingSide;
