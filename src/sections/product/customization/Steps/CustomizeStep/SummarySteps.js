import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "@/redux/store";
import MainHeading from "@/app/components/MainHeading";


const SummarySteps = ({ data, setTabChange }) => {
  const { t: translate } = useTranslation();

  const { customization, stepsArray } = useSelector((state) => state.customization);
  let steps_data = Object.keys(stepsArray);
  let all_step_list = customization['CHILD'] && customization['CHILD'][1] ? customization['CHILD'][1] : [];


  let is_found = false;
  const editFun = (step_name) => {
    is_found = true;

    //alert(1);

    all_step_list.filter((curElem, i) => {
      curElem.CHILD_STEP.filter((childElem) => {
        if (childElem.SS_CODE_NAME == step_name) {
          setTabChange(i + 1)
          // customizeDispatch({ type: 'PRESENT-STEP', value: i });
          is_found = false;
        } else if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0 && is_found) {
          filteFun(childElem.SUB_CHILD, step_name, i)
        }
      })
    });
  }

  const filteFun = (data, step_name, index) => {

    if (is_found) {
      data.filter((childElem) => {
        if (childElem.SS_CODE_NAME == step_name) {
          //customizeDispatch({ type: 'PRESENT-STEP', value: index });

          setTabChange(index + 1)
          is_found = false;
        } else if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0) {
          filteFun(childElem.SUB_CHILD, step_name, index);
        }
      });
    }
  }
  return (
    <Box
      sx={{
        borderBottom: (theme) => `1px dashed ${theme.palette.grey[2800]}`,
        padding: "0px 0px 10px 0px",
        margin: "0px 0px 10px 0px",
      }}
    >
      {/* <Box pt={2} pb={2}>
        <Typography
          sx={(theme) => ({
            fontFamily: theme.fontFaces.helveticaNeueBold,
            fontSize: theme.typography.typography15,
            color: theme.palette.primary.main,
          })}
        >
          {data && data?.SPS_DESC}
        </Typography>
      </Box> */}

      <MainHeading sx={{ mb: 2 }} title={data?.SPS_DESC} />

      {steps_data.map((step_name, index) => {
        if (step_name == 'Color') {
          return false;
        } else if (step_name == 'MATERIAL_SELECTION' || step_name == 'TYPE_OF_REMOTE') {
          return (
            <Grid container key={index} py={1} spacing={2}>
              <Grid item md={6} sm={6} xs={6} xxs={6}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontSize: theme.typography.typography14,
                    color: theme.palette.common.black,
                  })}
                >
                  {translate(stepsArray[step_name].SS_CODE_NAME)}
                </Typography>
              </Grid>
              <Grid item md={6} sm={6} xs={6} xxs={6}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    fontSize: theme.typography.typography14,
                    color: theme.palette.common.black,
                  })}
                >
                  {stepsArray[step_name]['material_info']['SII_ITEM_ID']}
                  <Typography
                    component="span"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeue,
                      fontSize: theme.typography.typography12,
                      color: theme.palette.common.black,
                      textDecoration: "underline",
                      opacity: 0.6,
                      padding: '5px'
                    })}
                  >
                    <span onClick={() => editFun(step_name)} className="edit" style={{ cursor: "pointer" }}> {translate('Edit')} </span>
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          )
        } else if (step_name == 'MEASUREMENT') {
          return (

            <Grid container key={index} py={1} spacing={2}>
              <Grid item md={6} sm={6} xs={6} xxs={6}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontSize: theme.typography.typography14,
                    color: theme.palette.common.black,
                  })}
                >
                  {translate(stepsArray[step_name].SS_CODE_NAME)}
                </Typography>
              </Grid>
              <Grid item md={6} sm={6} xs={6} xxs={6}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    fontSize: theme.typography.typography14,
                    color: theme.palette.common.black,
                  })}
                >
                  {translate('summary_measurement', { width: stepsArray[step_name].m_width, height: stepsArray[step_name].m_height })}
                  <Typography
                    component="span"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeue,
                      fontSize: theme.typography.typography12,
                      color: theme.palette.common.black,
                      textDecoration: "underline",
                      opacity: 0.6,
                      padding: '5px'
                    })}
                  >
                    <span onClick={() => editFun(step_name)} className="edit" style={{ cursor: "pointer" }}> {translate('Edit')} </span>
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          )
        } else if (step_name == 'QUANTITY') {
          return (

            <Grid container key={index} py={1} spacing={2}>
              <Grid item md={6} sm={6} xs={6} xxs={6}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontSize: theme.typography.typography14,
                    color: theme.palette.common.black,
                  })}
                >
                  {translate(stepsArray[step_name].SS_CODE_NAME)}
                </Typography>
              </Grid>
              <Grid item md={6} sm={6} xs={6} xxs={6}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    fontSize: theme.typography.typography14,
                    color: theme.palette.common.black,
                  })}
                >
                  {stepsArray[step_name].QTY} {translate('Qty')}
                  <Typography
                    component="span"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeue,
                      fontSize: theme.typography.typography12,
                      color: theme.palette.common.black,
                      textDecoration: "underline",
                      opacity: 0.6,
                      padding: '5px'
                    })}
                  >
                    <span onClick={() => editFun(step_name)} className="edit" style={{ cursor: "pointer" }}> {translate('Edit')} </span>
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          )
        } else if (step_name == 'LENGTH_OF_WIRE') {
          return (

            <Grid container key={index} py={1} spacing={2}>
              <Grid item md={6} sm={6} xs={6} xxs={6}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontSize: theme.typography.typography14,
                    color: theme.palette.common.black,
                  })}
                >
                  {translate(stepsArray[step_name].SS_CODE_NAME)}
                </Typography>
              </Grid>
              <Grid item md={6} sm={6} xs={6} xxs={6}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    fontSize: theme.typography.typography14,
                    color: theme.palette.common.black,
                  })}
                >
                  {stepsArray[step_name]['length_of_wire']} {translate('LMT')}
                  <Typography
                    component="span"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeue,
                      fontSize: theme.typography.typography12,
                      color: theme.palette.common.black,
                      textDecoration: "underline",
                      opacity: 0.6,
                      padding: '5px'
                    })}
                  >
                    <span onClick={() => editFun(step_name)} className="edit" style={{ cursor: "pointer" }}> {translate('Edit')} </span>
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          )
        } else if (step_name == 'ITEM_LABEL') {
          return (

            <Grid container key={index} py={1} spacing={2}>
              <Grid item md={6} sm={6} xs={6} xxs={6}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontSize: theme.typography.typography14,
                    color: theme.palette.common.black,
                  })}
                >
                  {translate(stepsArray[step_name].SS_CODE_NAME)}
                </Typography>
              </Grid>
              <Grid item md={6} sm={6} xs={6} xxs={6}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    fontSize: theme.typography.typography14,
                    color: theme.palette.common.black,
                  })}
                >
                  {stepsArray[step_name].SPS_DESC}
                  <Typography
                    component="span"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeue,
                      fontSize: theme.typography.typography12,
                      color: theme.palette.common.black,
                      textDecoration: "underline",
                      opacity: 0.6,
                      padding: '5px'
                    })}
                  >
                    <span onClick={() => editFun(step_name)} className="edit" style={{ cursor: "pointer" }}> {translate('Edit')} </span>
                  </Typography>
                </Typography>
              </Grid>
              {stepsArray[step_name].REMARKS ? <>

                <Grid item md={6} sm={6} xs={6} xxs={6} spacing={2}>
                  <Typography
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeueMedium,
                      fontSize: theme.typography.typography14,
                      color: theme.palette.common.black,
                    })}
                  >
                    {translate(stepsArray[step_name].SS_CODE_NAME)}({translate('Remark')})
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6} xxs={6}>
                  <Typography
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeueLight,
                      fontSize: theme.typography.typography14,
                      color: theme.palette.common.black,
                    })}
                  >
                    {stepsArray[step_name].REMARKS ? stepsArray[step_name].REMARKS : '---'}
                    <Typography
                      component="span"
                      sx={(theme) => ({
                        fontFamily: theme.fontFaces.helveticaNeue,
                        fontSize: theme.typography.typography12,
                        color: theme.palette.common.black,
                        textDecoration: "underline",
                        opacity: 0.6,
                        padding: '5px'
                      })}
                    >
                      <span onClick={() => editFun(step_name)} className="edit" style={{ cursor: "pointer" }}> {translate('Edit')} </span>
                    </Typography>
                  </Typography>
                </Grid>
              </>
                : null}
            </Grid>

          )
        } else {
          return (

            <Grid container key={index} py={1} spacing={2}>
              <Grid item md={6} sm={6} xs={6} xxs={6}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueMedium,
                    fontSize: theme.typography.typography14,
                    color: theme.palette.common.black,
                  })}
                >
                  {translate(stepsArray[step_name].SS_CODE_NAME)}
                </Typography>
              </Grid>
              <Grid item md={6} sm={6} xs={6} xxs={6}>
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.fontFaces.helveticaNeueLight,
                    fontSize: theme.typography.typography14,
                    color: theme.palette.common.black,
                  })}
                >
                  {stepsArray[step_name].SPS_DESC}
                  <Typography
                    component="span"
                    sx={(theme) => ({
                      fontFamily: theme.fontFaces.helveticaNeue,
                      fontSize: theme.typography.typography12,
                      color: theme.palette.common.black,
                      textDecoration: "underline",
                      opacity: 0.6,
                      padding: '5px'
                    })}
                  >
                    <span onClick={() => editFun(step_name)} className="edit" style={{ cursor: "pointer" }}> {translate('Edit')} </span>
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          )
        }
      })}
    </Box>
  );
};

export default SummarySteps;
