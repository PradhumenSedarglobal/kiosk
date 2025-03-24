import { NextFillImage } from "@/components/image";
import { setCustomizationFun } from "@/redux/slices/customization";
import { useDispatch, useSelector } from "@/redux/store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { addLights, addToCartFunScene, valanceColorFun } from '../../sceneCanvas3D';
import SubStepImport from "../SubStepImport";
import InfoDilogueButton from "../tabination/infoDilogueButton";
import { useAuthContext } from "@/auth/useAuthContext";
import MainHeading from "@/app/components/MainHeading";
import SubHeading from "@/app/components/SubHeading";

let img_path = "/assets/images/";
const item_img_path = process.env.NEXT_PUBLIC_ITEM_IMG_WEBP_PATH + "laptop/";


const ValanceColor = ({ data = {} }) => {
  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const [openInfo, setOpenInfo] = useState(false);
  const { locale } = useRouter();

  //const { t: translate } = useTranslation();
  const dispatch = useDispatch();

  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { editStepData, stepsArray } = customization_info;

  let step_name = data.SS_CODE_NAME ? data.SS_CODE_NAME : 'GLASS_COLOR';


  const optionFun = (val) => {

    let new_data = Object.assign({ ...data }, { material_info: val });
    delete new_data['SUB_CHILD'];

    setSelected(val.SII_CODE);
    setStepArray(val);
    valanceColorFun(val);
    val.light_info.length > 0 ? addLights(val.light_info, val.SIO_LIGHT_INTENSITY) : '';

    dispatch(
      setCustomizationFun(new_data)
    );

    /*  setTimeout(function () {
        addToCartFunScene({ ...cookies, ...customization_info, locale: locale }, dispatch);
      }.bind(this), 500);*/



  }

  useEffect(() => {
    let editcheck = true;
    data.SUB_CHILD.map((elem, index) => {
      if (editStepData.info_result && editStepData.info_result[step_name] && editStepData.info_result[step_name]['SOI_ITEM_CODE'] == elem.SII_CODE) {
        setTimeout(optionFun(elem), 1500);
        editcheck = false;
      } else if (elem.SPS_UOM == data.SII_CODE && editcheck) {
        optionFun(elem);
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


  if (data.SUB_CHILD == undefined || data.SUB_CHILD.return_status == 333) {

    return false;
  }

  return (
    <>
      <SubHeading  title={data?.SPS_DESC} />
    <div className="SizeAndMount">
         
      {/* <div className="step-heading">
        <h5>{data.SPS_DESC}</h5>
      </div> */}
      <div className="ValanceColor">
        <Box>
          <Grid container spacing={1}>
            {data.SUB_CHILD.map((elem, index) => {
              //let active_cls = elem.SII_CODE == selected ? 'mountgrid active' : 'mountgrid';
              let checked = elem.SII_CODE == selected ? true : false;
              return (
                <Grid item xs={4} xxs={6} key={index}>
                  <Box
                    sx={(theme) => ({
                      p: 0.6,
                      border:
                        checked && `1px solid ${theme.palette.primary.main}`,
                    })}
                  >
                    <a
                      className="matrial_class"
                      onClick={() => {
                        optionFun(elem);
                      }}
                      style={{ cursor: "pointer" }}
                    >

                      <NextFillImage
                        src={
                          elem.SII_THUMBNAIL_IMAGES
                            ? item_img_path + elem.SII_THUMBNAIL_IMAGES
                            : img_path + "noimage.jpg"
                        }
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
                    </a>
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
                        {elem.SII_ITEM_ID}
                      </Typography>
                      <InfoDilogueButton
                        open={openInfo}
                        setOpen={setOpenInfo}
                        image={elem.SII_THUMBNAIL_IMAGES ? item_img_path + elem.SII_THUMBNAIL_IMAGES : img_path + 'noimage.jpg'}
                        headingText={elem.SII_DESC}
                        subHeadingText={elem.SII_ITEM_ID}
                      />
                    </Stack>

                  </Box>
                </Grid>
              )

            })
            }
          </Grid>
        </Box>
        <Box sm={12}>
          {data.SUB_CHILD.map((elem, index) => {
            if (elem.SUB_CHILD && elem.SUB_CHILD[0] && stepArray && elem.SUB_CHILD[0].SPS_SPS_SYS_ID == stepArray.SPS_SYS_ID) {
              return (
                <div key={index}>
                  <SubStepImport {...elem} />
                </div>
              )
            }
          })
          }
        </Box>
      </div>
    </div>
    </>
  )
}

ValanceColor.propTypes = { data: object };


export default ValanceColor;
