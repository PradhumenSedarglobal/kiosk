import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { FormControl } from "@/components/form";
import RadioCheckBoxDilog from "../tabination/radioCheckBoxDilog";
import { useDispatch, useSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import SubStepImport from "../SubStepImport";
import {
  setCustomizationFun,
  deleteCustomizationStep,
} from "@/redux/slices/customization";
import {
  controlType,
  valanceType,
  glassColor,
  addToCartFunScene,
} from "../../sceneCanvas3D";
import { useRouter } from "next/router";
import { useAuthContext } from "@/auth/useAuthContext";
import MainHeading from "@/app/components/MainHeading";
import SubHeading from "@/app/components/SubHeading";

const TrackOption = ({ data }) => {
  //let sm_length = (data.SUB_CHILD.length % 2) == 0 ? 6 : 6;

  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { locale } = useRouter();
  const [selected, setSelected] = useState();

  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { stepsArray, editStepData, productInfo } = customization_info;//useSelector((state) => state.customization);

  let step_name = data.SS_CODE_NAME ? data.SS_CODE_NAME : false;
  //let track_width = stepsArray.TRACK_OPTION && ['TO01', 'TO02', 'TO03'].indexOf(stepsArray['TRACK_OPTION']['SPS_CODE']) >= 0 ? stepsArray['TRACK_OPTION']['SPS_MIN_WIDTH'] : false;
  //let track_height = stepsArray.TRACK_OPTION && ['TO01', 'TO02', 'TO03'].indexOf(stepsArray['TRACK_OPTION']['SPS_CODE']) >= 0 ? stepsArray['TRACK_OPTION']['SPS_MAX_HEIGHT'] : false;

  const optionFun = (val) => {
    controlType(val.SPS_CODE);
    setSelected(val.SPS_CODE);

    let new_data = Object.assign({}, { ...val }, {});
    delete new_data["SUB_CHILD"];
    //  console.log(val, 'optionFun', new_data);
    dispatch(setCustomizationFun(new_data));
    if (["TO01", "TO02", "TO04"].indexOf(val.SPS_CODE) >= 0) {
      valanceType("VAL02");
      dispatch(deleteCustomizationStep(["MOTOR_POSITION"]));
      dispatch(deleteCustomizationStep(["TYPE_OF_MOTOR"]));
      dispatch(deleteCustomizationStep(["TYPE_OF_REMOTE"]));
    } else {
      valanceType("VAL01");
      if (
        val.SUB_CHILD.length > 0 &&
        val.SUB_CHILD[0].SS_DATA_SOURCE == "MATL" &&
        val.SUB_CHILD[0].SUB_CHILD &&
        val.SUB_CHILD[0].SUB_CHILD[0]
      ) {
        glassColor(val.SUB_CHILD[0].SUB_CHILD[0]);
      }
    }

    /*  setTimeout(
        function () {
          addToCartFunScene(
            { ...cookies, ...customization_info, locale: locale },
            dispatch
          );
        }.bind(this),
        200
      );*/
  };

  useEffect(() => {
    let editcheck = true;
    data.SUB_CHILD.map((elem) => {
      if (
        editStepData.info_result &&
        editStepData.info_result[step_name] &&
        editStepData.info_result[step_name]["SPS_CODE"] == elem.SPS_CODE
      ) {
        setTimeout(optionFun(elem), 1500);
        editcheck = false;
      } else if (editcheck && elem.SPS_VALUE_DEFAULT == "Y") {
        elem.SPS_VALUE_DEFAULT == "Y" ? setTimeout(optionFun(elem), 1500) : "";
      }
    });
  }, []);



  useEffect(() => {
    if (stepsArray && step_name && stepsArray[step_name]) {
      console.log(stepsArray, 'addToCartFunScene11', customization_info);
      setTimeout(
        function () {
          addToCartFunScene({ ...cookies, ...customization_info, locale: locale }, dispatch);
        }
          .bind(this),
        200
      );
    }
  }, [stepsArray[step_name]])



  if (data.SUB_CHILD == undefined) {
    return false;
  }

  return (
    <div className="ControlType">
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
      <SubHeading  title={data?.SPS_DESC} />

      <div className="mountingoptions">
        <Box px={3} sm={12}>
          <FormControl fullWidth>
            <Grid container justifyContent="space-between">
              {data.SUB_CHILD.map((elem, index) => {
                return (
                  <Grid item lg={6} md={6} sm={12} xs={12} xxs={12} key={index}>
                    <FormControlLabel
                      sx={{
                        width: "100%!important",
                        marginRight: "0px!important",
                        marginLeft: "0px",
                      }}
                      key={index}
                      control={
                        <Radio
                          name={
                            data && data.SS_CODE_NAME
                              ? data.SS_CODE_NAME
                              : step_name
                          }
                          checked={
                            stepsArray[step_name] &&
                              stepsArray[step_name]["SPS_CODE"] == elem.SPS_CODE
                              ? true
                              : false
                          }
                          onChange={() => {
                            optionFun(elem);
                          }}
                        />
                      }
                      label={<RadioCheckBoxDilog elem={elem} />}
                    />
                    {elem.SPS_CODE == "TO04" &&
                      stepsArray["TRACK_OPTION"] &&
                      stepsArray["TRACK_OPTION"]["SPS_CODE"] == "TO04" ? (
                      <Typography
                        px={2}
                        component="p"
                        variant="typography12"
                        color="error"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueMedium
                        }
                      >
                        {translate("track_option_mgs", {
                          desc: translate("track"),
                        })}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {elem.SPS_CODE == "NO_ROD" &&
                      stepsArray["TRACK_OPTION"] &&
                      stepsArray["TRACK_OPTION"]["SPS_CODE"] == "NO_ROD" ? (
                      <Typography
                        component="p"
                        variant="typography12"
                        color="error"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueMedium
                        }
                      >
                        {translate("track_option_mgs", {
                          desc: translate("rod"),
                        })}
                      </Typography>
                    ) : (
                      ""
                    )}

                    {selected == elem.SPS_CODE &&
                      ["TO01", "TO02", "TO03"].indexOf(elem.SPS_CODE) >= 0 &&
                      elem.SPS_MIN_WIDTH > productInfo.SPI_MIN_WIDTH ? (
                      <Typography
                        component="p"
                        variant="typography12"
                        color="error"
                        fontFamily={(theme) =>
                          theme.fontFaces.helveticaNeueMedium
                        }
                      >
                        {translate("min_width_validation", {
                          min: elem.SPS_MIN_WIDTH,
                          unit: translate("cm"),
                        })}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </FormControl>
          <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
            {data?.SUB_CHILD.map((elem, index) => {
              if (
                elem?.SUB_CHILD &&
                elem?.SUB_CHILD[0] &&
                stepsArray &&
                stepsArray[step_name] &&
                elem?.SUB_CHILD[0]["SPS_SPS_SYS_ID"] ==
                stepsArray[step_name]["SPS_SYS_ID"]
              ) {
                return <SubStepImport key={index} data={elem} formik={""} />;
              }
            })}
          </Grid>
        </Box>
      </div>
    </div>
  );
};
export default TrackOption;
