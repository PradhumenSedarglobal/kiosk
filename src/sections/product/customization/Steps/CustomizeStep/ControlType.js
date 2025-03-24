import React, { useState, useEffect } from "react";
import SelectCardImage from "../tabination/selectCardImage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SubStepImport from "../SubStepImport";
import { useTranslation } from "next-i18next";
import { addToCartFunScene } from "../../sceneCanvas3D";
import { useAuthContext } from "@/auth/useAuthContext";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@/redux/store";
import MainHeading from "@/app/components/MainHeading";
import SubHeading from "@/app/components/SubHeading";

const ControlType = ({ data, formik, elem }) => {
  const { t: translate } = useTranslation();

  const dispatch = useDispatch();

  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { locale } = useRouter();
  const { stepsArray, productInfo } = customization_info;

  let motorized_width = stepsArray.CONTROL_TYPE && stepsArray['CONTROL_TYPE']['SPS_CODE'] == 'CT02' ? parseInt(stepsArray.CONTROL_TYPE.SPS_MIN_WIDTH) : false;
  //let motorized_height = stepsArray.CONTROL_TYPE && stepsArray['CONTROL_TYPE']['SPS_CODE'] == 'CT02' ? stepsArray.CONTROL_TYPE.SPS_MAX_HEIGHT : false;
  let min_width = stepsArray.MEASUREMENT ? parseInt(stepsArray['MEASUREMENT']['m_width']) : parseInt(productInfo.SPI_MIN_WIDTH);

  useEffect(() => {
    if (stepsArray && stepsArray.CONTROL_TYPE) {
      setTimeout(
        function () {
          addToCartFunScene({ ...cookies, ...customization_info, locale: locale }, dispatch);
        }
          .bind(this),
        200
      );
    }
  }, [stepsArray?.CONTROL_TYPE])


  return (
    <>
      <SubHeading  title={data?.SPS_DESC} />
    <Box>
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
      <Box  px={3} py={2}>
        <Grid container spacing={1}>
          {data &&
            data?.SUB_CHILD.map((elem, index) => {
              return (
                <Grid item lg={6} md={6} sm={6} xs={6} xxs={6} key={index}>
                  <SelectCardImage
                    formik={formik}
                    elem={elem}
                    item={data}
                    cardImage={elem?.SPS_IMAGE_PATH}
                    title={elem?.SPS_DESC}
                    infoData={elem?.SPS_MORE}
                  />
                  {elem.SPS_CODE == 'CT02' && motorized_width && motorized_width > min_width ?


                    <Typography
                      component="p"
                      variant="typography14"
                      color="error"
                      fontFamily={(theme) =>
                        theme.fontFaces.helveticaNeueMedium
                      }
                    >
                      {translate("min_width_validation", {
                        min: motorized_width,
                        unit: translate('cm'),
                      })}
                    </Typography>
                    : ''}
                </Grid>
              );
            })}
          <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
            {data?.SUB_CHILD.map((elem, index) => {
              if (elem?.SUB_CHILD && elem?.SUB_CHILD[0] && stepsArray && stepsArray['CONTROL_TYPE'] && elem?.SUB_CHILD[0]['SPS_SPS_SYS_ID'] == stepsArray['CONTROL_TYPE']['SPS_SYS_ID']) {
                return (
                  <SubStepImport key={index} data={elem} formik={formik} />
                );
              }
            })}
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>
  );
};

export default ControlType;
