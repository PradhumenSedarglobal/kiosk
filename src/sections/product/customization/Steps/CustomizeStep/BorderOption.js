import React from "react";
import SelectCardImage from "../tabination/selectCardImage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SubStepImport from "../SubStepImport";
import { useSelector } from "@/redux/store";

import { borderSection } from '../../sceneCanvas3D';
import SubHeading from "@/app/components/SubHeading";

const BorderOption = ({ data, formik, elem }) => {

  const { stepsArray } = useSelector((state) => state.customization);

  let step_name = data.SS_CODE_NAME ? data.SS_CODE_NAME : false;




  return (
    <Box>
      <Box py={3}>


         <SubHeading  title={data && data?.SPS_DESC} />
      </Box>
      <Box py={2}>
        <Grid container spacing={1}>
          {data &&
            data?.SUB_CHILD.map((elem, index) => {
              return (
                <Grid item lg={6} md={6} sm={4} xs={6} xxs={6} key={index}>
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
            })}


          <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
            {data?.SUB_CHILD.map((elem, index) => {
              if (elem?.SUB_CHILD && elem?.SUB_CHILD[0] && stepsArray && stepsArray[step_name] && elem?.SUB_CHILD[0]['SPS_SPS_SYS_ID'] == stepsArray[step_name]['SPS_SYS_ID']) {
                return (
                  <SubStepImport key={index} data={elem} formik={formik} />
                );
              }
            })}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BorderOption;