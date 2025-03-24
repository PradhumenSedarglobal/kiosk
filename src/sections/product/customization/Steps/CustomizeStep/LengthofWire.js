import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { SelectBox } from "@/components/form";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "@/redux/store";
import SubStepImport from "../SubStepImport";
import { setCustomizationFun, deleteCustomizationStep } from "@/redux/slices/customization";
import MainHeading from "@/app/components/MainHeading";
import SubHeading from "@/app/components/SubHeading";

const LengthOfWire = ({ data, formik }) => {
  const { t: translate } = useTranslation();

  let wire_length = 0

  let len = Array.from(Array(10), (e, i) => {
    wire_length = wire_length + 0.5;
    let val = wire_length.toFixed(1);
    return { label: val + ' ' + translate('LMT'), value: val }
  })

  const dispatch = useDispatch();

  const { stepsArray, editStepData } = useSelector((state) => state.customization);

  let step_name = data.SS_CODE_NAME ? data.SS_CODE_NAME : 'LENGTH_OF_WIRE';


  const lengthFun = (qty) => {
    let qunt_data = { ...data, length_of_wire: qty }
    dispatch(
      setCustomizationFun(qunt_data)
    );


  }

  useEffect(() => {
    if (editStepData.info_result && editStepData.info_result[step_name] && editStepData.info_result[step_name]['SOI_PCS'] > 0) {
      lengthFun(editStepData.info_result[step_name]['SOI_PCS']);
    } else {
      lengthFun(2.5);
    }
  }, []);
  return (
    <>
       <SubHeading  title={data?.SPS_DESC} />
      <Box  px={3}>
        {/* <Typography
          sx={(theme) => ({
            fontFamily: theme.fontFaces.helveticaNeueBold,
            fontSize: theme.typography.typography15,
            color: theme.palette.common.black,
          })}
        >
          {data && data?.SPS_DESC}
        </Typography> */}

        <Box
          sx={{
            borderBottom: (theme) => `1px ${theme.palette.grey[2800]}`,
            padding: "10px 0px",
          }}
        >
          <Stack
            direction="row"
            pt={1}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Box sx={{ width: "50%" }}>
              <Typography
                sx={(theme) => ({
                  fontFamily: theme.fontFaces.helveticaNeue,
                  fontSize: theme.typography.typography18,
                  color: theme.palette.common.black,
                })}
              >
                {data && data?.SPS_DESC}
              </Typography>
            </Box>
            <Box sx={{ width: "50%" }}>
              <SelectBox
                fullWidth
                size="small"
                label=""
                name="length_of_wire"
                value={stepsArray[step_name] && stepsArray[step_name]['length_of_wire'] ? stepsArray[step_name]['length_of_wire'] : 2.5}
                onChange={(e) => { lengthFun(e.target.value) }}
                options={len}
                setLabel="label"
                setValue="value"
                // color="primary"s

                formSx={(theme) => ({
                  marginBottom: "0px!important",

                  "& .MuiSelect-select": {
                    color: theme.palette.common.black,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.common.black,
                    borderRadius: "0px",
                    color: theme.palette.common.black,
                  },
                })}
              />
            </Box>
          </Stack>
        </Box>

        <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
          {data?.SUB_CHILD.map((elem, index) => {
            if (elem?.SUB_CHILD && elem?.SUB_CHILD[0] && stepsArray && stepsArray[step_name] && elem?.SUB_CHILD[0]['SPS_SPS_SYS_ID'] == stepsArray[step_name]['SPS_SYS_ID']) {
              return (
                <SubStepImport key={index} data={elem} formik={formik} />
              );
            }
          })}
        </Grid>
      </Box>
    </>
  );
};

export default LengthOfWire;
