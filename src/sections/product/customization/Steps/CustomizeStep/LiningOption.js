import React from "react";
import SelectCardImage from "../tabination/selectCardImage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SubStepImport from "../SubStepImport";
import { useSelector } from "@/redux/store";

const LiningOption = ({ data, formik }) => {

  const { stepsArray } = useSelector((state) => state.customization);

  let sfi_light_filtering_app_yn = stepsArray.MATERIAL_SELECTION && stepsArray.MATERIAL_SELECTION.material_info ? stepsArray.MATERIAL_SELECTION.material_info.SFI_LIGHT_FILTERING_APP_YN : false;
  let sfi_blackout_lining_app_yn = stepsArray.MATERIAL_SELECTION && stepsArray.MATERIAL_SELECTION.material_info ? stepsArray.MATERIAL_SELECTION.material_info.SFI_BLACKOUT_LINING_APP_YN : false;

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
        <Grid container spacing={1}>
          {data &&
            data?.SUB_CHILD.map((elem, index) => {
              if (elem.SPS_CODE == 'LO01' && sfi_blackout_lining_app_yn == 'N') {
                return (
                  <Grid item lg={data?.SUB_CHILD?.length ? 4 : 6} md={data?.SUB_CHILD?.length ? 4 : 6} sm={6} xs={6} xxs={6} key={index}>
                    <SelectCardImage
                      formik={formik}
                      elem={elem}
                      item={data}
                      cardImage={elem?.SPS_IMAGE_PATH}
                      title={elem?.SPS_DESC}
                      infoData={elem?.SPS_MORE}
                      disabled={true}
                    />

                  </Grid>

                );
              } else if (elem.SPS_CODE == 'LO02' && sfi_light_filtering_app_yn == 'N') {
                return (
                  <Grid item lg={data?.SUB_CHILD?.length ? 4 : 6} md={data?.SUB_CHILD?.length ? 4 : 6} sm={6} xs={6} xxs={6} key={index}>
                    <SelectCardImage
                      formik={formik}
                      elem={elem}
                      item={data}
                      cardImage={elem?.SPS_IMAGE_PATH}
                      title={elem?.SPS_DESC}
                      infoData={elem?.SPS_MORE}
                      disabled={true}
                    />
                  </Grid>
                );

              } else {
                return (
                  <Grid item lg={data?.SUB_CHILD?.length ? 4 : 6} md={data?.SUB_CHILD?.length ? 4 : 6} sm={6} xs={6} xxs={6} key={index}>
                    <SelectCardImage
                      formik={formik}
                      elem={elem}
                      item={data}
                      cardImage={elem?.SPS_IMAGE_PATH}
                      title={elem?.SPS_DESC}
                      infoData={elem?.SPS_MORE}
                    />
                  </Grid>
                );
              }
            })}
          <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
            {data?.SUB_CHILD.map((elem, index) => {
              if (elem?.SUB_CHILD && elem?.SUB_CHILD[0]) {
                return (
                  <SubStepImport key={index} data={elem} formik={formik} />
                );
              }
            })}
          </Grid>
        </Grid>
      </Box >
    </Box >
  );
};

export default LiningOption;
