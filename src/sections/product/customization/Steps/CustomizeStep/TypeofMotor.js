import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import { FormControl } from "@/components/form";
import RadioCheckBoxDilog from "../tabination/radioCheckBoxDilog";
import SubStepImport from "../SubStepImport";
import { useDispatch, useSelector } from "@/redux/store";
import { addToCartFunScene } from "../../sceneCanvas3D";
import { setCustomizationFun } from "@/redux/slices/customization";
import { useAuthContext } from "@/auth/useAuthContext";
import { useRouter } from "next/router";

const TypeOfMotor = ({ data }) => {

  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;
  const dispatch = useDispatch();
  const { stepsArray, editStepData } = customization_info;
  const { locale } = useRouter();

  let step_name = data.SS_CODE_NAME ? data.SS_CODE_NAME : 'TYPE_OF_MOTOR';


  const optionFun = (val) => {
    dispatch(
      setCustomizationFun(val)
    )
    /*  setTimeout(
        function () {
          addToCartFunScene({ ...cookies, ...customization_info, locale: locale }, dispatch);
        }
          .bind(this),
        100
      );*/
  }

  useEffect(() => {
    let editcheck = true;
    data.SUB_CHILD.map((elem) => {
      if (editStepData.info_result && editStepData.info_result[step_name] && editStepData.info_result[step_name]['SPS_CODE'] == elem.SPS_CODE) {
        setTimeout(optionFun(data), 1500)
        editcheck = false;
      } else if (elem.SPS_VALUE_DEFAULT == 'Y' && editcheck) {
        elem.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(optionFun(elem), 1500) : '';
      }
    })
  }, []);

  useEffect(() => {
    if (stepsArray && step_name && stepsArray[step_name]) {
      setTimeout(
        function () {
          addToCartFunScene({ ...cookies, ...customization_info, locale: locale }, dispatch);
        }
          .bind(this),
        200
      );
    }
  }, [stepsArray[step_name]])

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
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name={data && data.SS_CODE_NAME ? data.SS_CODE_NAME : step_name}
        >
          <Grid container>
            {data?.SUB_CHILD?.map((radioCheck, index) => (
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
                        stepsArray[step_name] && stepsArray[step_name]['SPS_CODE'] == radioCheck.SPS_CODE ? true : false
                      }
                      onChange={() => { optionFun(radioCheck) }}
                    />
                  }
                  label={<RadioCheckBoxDilog elem={radioCheck} />}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>

      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
          {data?.SUB_CHILD.map((elem, index) => {
            if (elem?.SUB_CHILD && elem?.SUB_CHILD[0]) {
              return <SubStepImport key={index} data={elem} formik={''} />;
            }
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TypeOfMotor;
