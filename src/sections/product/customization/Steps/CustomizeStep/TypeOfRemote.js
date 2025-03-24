import React, { useEffect, useState } from "react";
import SelectCardImage from "../tabination/selectCardImage";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { NextFillImage } from "@/components/image";
import SubStepImport from "../SubStepImport";
import { useDispatch, useSelector } from "@/redux/store";
import { setCustomizationFun } from "@/redux/slices/customization";
import { addToCartFunScene } from "../../sceneCanvas3D";
import InfoDilogueButton from "../tabination/infoDilogueButton";
import { useRouter } from "next/router";
import { useAuthContext } from "@/auth/useAuthContext";
import MainHeading from "@/app/components/MainHeading";
import SubHeading from "@/app/components/SubHeading";

let img_path = "/assets/images/";
const item_img_path = process.env.NEXT_PUBLIC_ITEM_IMG_WEBP_PATH + "laptop/";

const TypeOfRemote = ({ data }) => {

  const dispatch = useDispatch();
  const { locale } = useRouter();

  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { stepsArray, editStepData } = customization_info;

  const [openInfo, setOpenInfo] = useState(false);

  const remoteFun = (val) => {
    let new_data = Object.assign({ ...data }, { material_info: val });
    delete new_data['SUB_CHILD'];


    dispatch(
      setCustomizationFun(new_data)
    )

    /* setTimeout(
       function () {
         addToCartFunScene({ ...cookies, ...customization_info, locale: locale }, dispatch);
       }
         .bind(this),
       200
     );*/
  }

  useEffect(() => {
    let editcheck = true;
    data.SUB_CHILD && data.SUB_CHILD.length && data.SUB_CHILD.map((elem, index) => {
      if (editStepData.info_result && editStepData.info_result.TYPE_OF_REMOTE && editStepData.info_result.TYPE_OF_REMOTE.SOI_ITEM_CODE == elem.SII_CODE) {
        setTimeout(remoteFun(elem), 500);
        editcheck = false;
      } else if (data.SPS_UOM == elem.SII_CODE && editcheck) {
        remoteFun(elem);
      }
    })
  }, []);

  useEffect(() => {
    if (stepsArray && stepsArray.TYPE_OF_REMOTE) {
      setTimeout(
        function () {
          addToCartFunScene({ ...cookies, ...customization_info, locale: locale }, dispatch);
        }
          .bind(this),
        100
      );
    }
  }, [stepsArray?.TYPE_OF_REMOTE])

  return (
    <>
      <SubHeading  title={data?.SPS_DESC} />
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
      <Box py={2}>
        <Grid container spacing={1}>
          {data &&
            data?.SUB_CHILD.map((elem, index) => {
              return (
                <Grid item xs={6} xxs={6} key={index}>
                  <Card
                    variant="outlined"
                    sx={{ borderRadius: "5px !important", cursor: "pointer" }}
                    onClick={(e) => { remoteFun(elem) }}
                    key={index}
                  >

                    <Box px={1} py={2}>
                      <Box sx={{ position: "relative" }}>
                        <NextFillImage
                          src={elem.SII_THUMBNAIL_IMAGES ? item_img_path + elem.SII_THUMBNAIL_IMAGES : img_path + 'noimage.jpg'}
                          alt={elem?.IMAGE_PATH}
                          sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                          objectFit="contain"
                          sx={{
                            width: "auto!important",
                            height: "auto!important",
                            objectFit: "contain",
                            backgroundSize: "contain",
                            "&.MuiCard-root": {
                              borderRadius: 0,
                              boxShadow: "none",
                              position: "relative!important",
                              width: "100%!important",
                              height: "100%!important",
                            },

                          }}

                        />
                        {data.SS_CODE_NAME && stepsArray[data.SS_CODE_NAME] && stepsArray[data.SS_CODE_NAME]['material_info'] && stepsArray[data.SS_CODE_NAME]['material_info']['SII_CODE'] == elem?.SII_CODE && (
                          <Box sx={{ position: "absolute", top: 0, right: 10 }}>
                            <NextFillImage
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
                              alt='Image'
                              sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                              objectFit="contain"
                            />
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
                          {elem.SII_DESC}
                        </Typography>
                        <InfoDilogueButton
                          open={openInfo}
                          setOpen={setOpenInfo}
                          image={elem.SII_THUMBNAIL_IMAGES ? item_img_path + elem.SII_THUMBNAIL_IMAGES : img_path + 'noimage.jpg'}
                          // headingText={elem.SII_DESC}
                          subHeadingText={elem.SII_DESC}
                        />
                      </Stack>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
            {data?.SUB_CHILD.map((elem, index) => {
              if (elem?.SUB_CHILD && elem?.SUB_CHILD[0]) {
                return (
                  <SubStepImport key={index} data={elem} formik={''} />
                );
              }
            })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TypeOfRemote;
