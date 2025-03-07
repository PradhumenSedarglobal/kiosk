import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "@/redux/store";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { NextFillImage } from "@/components/image";
import SubStepImport from "../SubStepImport";
import { useTranslation } from "next-i18next";
import { setCustomizationFun } from "@/redux/slices/customization";
import InfoDilogueButton from "../tabination/infoDilogueButton";
import { glassColor, addLights, addToCartFunScene } from '../../sceneCanvas3D';
import { useRouter } from "next/router";
import { useAuthContext } from '@/auth/useAuthContext';
let track_type = ['WITHOUT_TRACK_TEXTURE', 'MOTORIZED_TRACK_TEXTURE', 'CORDLESS_TRACK_TEXTURE', 'CORDED_TRACK_TEXTURE'];
let img_path = "/assets/images/";
const item_img_path = process.env.NEXT_PUBLIC_ITEM_IMG_WEBP_PATH + "laptop/";


const GlassColor = ({ data }) => {

  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();
  const [openInfo, setOpenInfo] = useState(false);
  const { query, locale } = useRouter();

  const { t: translate } = useTranslation();
  const dispatch = useDispatch();

  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { productInfo, stepsArray, editStepData } = customization_info;

  let step_name = data.SS_CODE_NAME ? data.SS_CODE_NAME : 'GLASS_COLOR';

  const optionFun = (val) => {

    let new_data = Object.assign({ ...data }, { material_info: val });
    delete new_data['SUB_CHILD'];

    setSelected(val.SII_CODE);
    setStepArray(val);
    glassColor(val);
    val.light_info.length > 0 ? addLights(val.light_info, val.SIO_LIGHT_INTENSITY) : '';


    //material_data['SUB_CHILD']['light_info'] = '';
    dispatch(
      setCustomizationFun(new_data)
    );


    /* setTimeout(function () {
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


  if (data.SUB_CHILD == undefined || data.SUB_CHILD.return_status == 333 || track_type.indexOf(data.SS_CODE_NAME) >= 0) {

    return false;
  }


  return (
    <div className="SizeAndMount">
      <div className="step-heading">
        <h5>{data.SPS_DESC}</h5>
      </div>
      <div className="GlassColor">
        <Box py={2}>
          <Grid container spacing={1}>
            {data.SUB_CHILD.map((elem, index) => {
              let active_cls = elem.SII_CODE == selected ? 'mountgrid active' : 'mountgrid';
              return (
                <Grid item xs={6} xxs={6} key={index}>
                  <Card sx={{ margin: 'auto', textAlign: 'center', padding: '5px', cursor: 'pointer' }}>
                    <div className={active_cls} onClick={() => optionFun(elem)}>
                      <img src={elem.SII_THUMBNAIL_IMAGES ? elem.IMAGE_PATH + '../' + elem.SII_THUMBNAIL_IMAGES : img_path + 'noimage.jpg'} className="img-fluid" alt={data.image_alt_seo} role="button" style={{ maxHeight: '150px', margin: 'auto' }} width="auto" height="auto" />
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
                      {elem.SII_CODE == selected ?
                        <div className="selected-icon" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                          <img src={`/assets/images/Customization/Group23632.png`} className="img-fluid" alt={elem.image_alt_seo} width="auto" height="auto" />
                        </div>
                        :
                        ''}
                    </div>
                  </Card>
                </Grid>)
            })
            }
          </Grid>
        </Box>
      </div>
      <Card sm={12}>
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
      </Card>
    </div >
  )
}

export default GlassColor;
