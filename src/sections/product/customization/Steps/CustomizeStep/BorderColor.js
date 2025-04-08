import { useEffect, useRef, useState } from "react";
import SelectCardImage from "../tabination/selectCardImage";
import { NextFillImage } from "@/components/image";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SubStepImport from "../SubStepImport";
import { useAuthContext } from "@/auth/useAuthContext";
import InfoDilogueButton from "../tabination/infoDilogueButton";
import { getMaterialCustomization, setCustomizationFun } from "@/redux/slices/customization";

import { updateBorderTextureImg, addLights, addToCartFunScene } from '../../sceneCanvas3D';
import SubHeading from "@/app/components/SubHeading";
let img_path = "/assets/images/";
const item_img_path = process.env.NEXT_PUBLIC_ITEM_IMG_WEBP_PATH + "laptop/";

const perPage = 18;

const BorderColor = ({ data }) => {

  console.log(data, 'BorderColor');

  const { query, locale } = useRouter();
  const { slug } = query;
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const customization_info = useSelector((state) => state.customization);
  const [openInfo, setOpenInfo] = useState(false);
  const [selected, setSelected] = useState();
  const [stepArray, setStepArray] = useState();

  const { state } = useAuthContext();
  const { cookies } = state;
  const {
    productInfo,
    stepsArray,
    editStepData,
    materialCustomization,
    filterOption,
    materialList,
  } = customization_info;

  let SPI_PR_ITEM_CODE = productInfo.SPI_PR_ITEM_CODE ? productInfo.SPI_PR_ITEM_CODE : 0;

  let edit_item_id = editStepData.info_result && editStepData.info_result.MATERIAL_SELECTION ? editStepData.info_result.MATERIAL_SELECTION.ITEM_ID : "";
  let material_item_id = slug && slug.length ? slug[3] : edit_item_id;

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);

  let step_name = data.SS_CODE_NAME ? data.SS_CODE_NAME : 'BORDER_COLOR';


  const optionFun = (val) => {

    let new_data = Object.assign({ ...data }, { material_info: val });
    delete new_data['SUB_CHILD'];

    setSelected(val.SII_CODE);
    setStepArray(val);
    updateBorderTextureImg(val);
    val.light_info && val.light_info.length > 0 ? addLights(val.light_info, val.SIO_LIGHT_INTENSITY) : '';


    //material_data['SUB_CHILD']['light_info'] = '';
    dispatch(
      setCustomizationFun(new_data)
    );

    setTimeout(function () {
      addToCartFunScene({ ...cookies, ...customization_info, locale: locale }, dispatch);
    }.bind(this), 500);

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
    <div className="SizeAndMount">
      
      <SubHeading  title={data?.SPS_DESC} />
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

  // return (
  //   <Box>
  //     <Box>
  //       <Typography
  //         sx={(theme) => ({
  //           fontFamily: theme.fontFaces.helveticaNeueBold,
  //           fontSize: theme.typography.typography15,
  //           color: theme.palette.common.black,
  //         })}
  //       >
  //         {props && props.data && props.data?.SPS_DESC}
  //       </Typography>
  //     </Box>
  //     <Box py={2}>
  //       <Grid container spacing={1}>
  //         {props.data &&
  //           props.data?.SUB_CHILD.map((elem, index) => {
  //             return (
  //               <Grid item lg={4} md={4} sm={4} xs={6} xxs={6} key={index}>
  //                 <SelectCardImage
  //                   elem={elem}
  //                   item={props.data}
  //                   cardImage={elem?.SPS_IMAGE_PATH}
  //                   title={elem?.SPS_DESC}
  //                   infoData={elem?.SPS_MORE}
  //                 />
  //               </Grid>
  //             );
  //           })}
  //         <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
  //           {props.data?.SUB_CHILD.map((elem, index) => {
  //             if (elem?.SUB_CHILD && elem?.SUB_CHILD[0]) {
  //               return (
  //                 <SubStepImport key={index} data={elem} />
  //               );
  //             }
  //           })}
  //         </Grid>
  //       </Grid>
  //     </Box>
  //   </Box>
  // );

};

export default BorderColor;