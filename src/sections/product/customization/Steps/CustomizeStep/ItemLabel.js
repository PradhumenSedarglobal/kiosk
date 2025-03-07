import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { SelectBox, TextBox } from "@/components/form";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "@/redux/store";
import { setCustomizationFun } from "@/redux/slices/customization";
import { NextFillImage } from "@/components/image";

const ItemLabel = ({ data, formik }) => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(1);
  const [remarkText, setRemarkText] = useState();

  const { editStepData, stepsArray } = useSelector((state) => state.customization);

  let step_name = data.SS_CODE_NAME ? data.SS_CODE_NAME : false;

  const itemLabelFun = (i) => {

    setSelected(i);
    dispatch(
      setCustomizationFun(data.SUB_CHILD[i])
    );
  }
  const remarkDesc = (val) => {
    setRemarkText(val);
    let clone_obj = Object.assign({}, stepsArray[step_name], { REMARKS: val });
    dispatch(
      setCustomizationFun(clone_obj)
    );
  }

  useEffect(() => {
    let editcheck = true;
    data.SUB_CHILD.map((data, index) => {
      if (editStepData.info_result && editStepData.info_result.ITEM_LABEL && editStepData.info_result.ITEM_LABEL.SPS_CODE == data.SPS_CODE) {
        setTimeout(itemLabelFun(index), 1500)
        editcheck = false;
      } else if (editcheck && data.SPS_VALUE_DEFAULT == 'Y') {
        data.SPS_VALUE_DEFAULT == 'Y' ? setTimeout(itemLabelFun(index), 1500) : '';
      }

    })
  }, []);

  return (
    <Box>
      <Box my={3}>
        <Typography
          sx={(theme) => ({
            fontFamily: theme.fontFaces.helveticaNeueBold,
            fontSize: theme.typography.typography15,
            color: theme.palette.common.black,
          })}
        >
          {data?.SPS_DESC}
        </Typography>
      </Box>
      <Box py={2}>
        <Grid container spacing={1}>
          {(() => {

            switch (data.SPS_INPUT_TYPE) {
              case '1':
                return (
                  <>
                    {data && data?.SUB_CHILD.map((elem, index) => {
                      return (
                        <Grid item lg={4} md={4} sm={4} xs={4} xxs={6} key={index}>
                          <Card
                            variant="outlined"
                            sx={{ borderRadius: "5px !important", cursor: "pointer", padding: "25px 0", height: '85px' }}
                            onClick={() => { itemLabelFun(index) }}
                          >
                            <Box sx={{ position: "relative" }}>
                              <NextFillImage
                                src={elem?.SPS_IMAGE_PATH}
                                sx={{
                                  width: "100%!important",
                                  height: "100%!important",
                                  objectFit: "contain",
                                  backgroundSize: "contain",
                                  "&.MuiCard-root": {
                                    borderRadius: 0,
                                    boxShadow: "none",
                                    position: "relative!important",
                                    width: "auto !important",
                                    height: "auto !important",
                                    margin: 'auto'
                                  },
                                }}
                                alt='Image'
                                sizes="(min-width: 0px) and (max-width: 1920px) 100vw"
                                objectFit="contain"
                              />

                              {elem.SS_CODE_NAME && stepsArray && stepsArray[elem.SS_CODE_NAME] && stepsArray[elem.SS_CODE_NAME]['SPS_SYS_ID'] == elem?.SPS_SYS_ID && (
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
                          </Card>
                          <Typography
                            sx={(theme) => ({
                              textAlign: "center",
                              fontFamily: theme.fontFaces.helveticaNeue,
                              fontSize: theme.typography.typography13,
                              color: theme.palette.common.black,
                              padding: "5px 0 8px 0"
                            })}
                          >
                            {elem?.SPS_DESC}
                          </Typography>

                        </Grid>
                      );
                    })}

                    <Grid item lg={12} md={12} sm={12} xs={12} xxs={12}>
                      <Box>
                        <Typography
                          sx={(theme) => ({
                            fontFamily: theme.fontFaces.helveticaNeueBold,
                            fontSize: theme.typography.typography15,
                            color: theme.palette.common.black,
                          })}
                        >
                          {translate("Description")}
                        </Typography>
                        <TextBox
                          fullWidth
                          size="small"
                          type="text"
                          variant="outlined"
                          name="remark_desc"
                          rows={5}
                          multiline={true}
                          value={remarkText}
                          onChange={(e) => { remarkDesc(e.target.val); setRemarkText(e.target.val) }}
                          helperText={
                            formik.touched.remark_desc && formik.errors.remark_desc
                          }
                          formControlSx={{

                            mb: 0,
                            px: 0,
                            borderRadius: 0,
                            backgroundColor: (theme) => theme.palette.common.white,
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderRadius: 0,
                            },
                            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: (theme) => theme.palette.common.black,
                            },
                            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: (theme) => theme.palette.common.black,
                            },
                            "& .MuiOutlinedInput-input": {
                              fontFamily: (theme) => theme.typography.typography14,
                            },
                          }}
                          required
                        />
                      </Box>
                    </Grid>
                  </>
                )
              default:
                return (
                  <Grid item xxs={12}>
                    <Box>
                      <Typography
                        sx={(theme) => ({
                          fontFamily: theme.fontFaces.helveticaNeueBold,
                          fontSize: theme.typography.typography15,
                          color: theme.palette.common.black,
                        })}
                      >
                        {translate("SelectRoom")}
                      </Typography>
                      <Box sx={{ width: "100%" }}>
                        <SelectBox
                          defaultValue={selected}
                          fullWidth
                          size="small"
                          label=""
                          name="select_room"
                          value={selected}
                          onChange={(e) => { itemLabelFun(e.target.value) }}
                          options={data?.SUB_CHILD}
                          setLabel={`SPS_DESC`}
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
                    </Box>
                    {
                      selected == "8" && (
                        <Box my={2}>
                          <Typography
                            sx={(theme) => ({
                              fontFamily: theme.fontFaces.helveticaNeueBold,
                              fontSize: theme.typography.typography15,
                              color: theme.palette.common.black,
                            })}
                          >
                            {translate("Description")}
                          </Typography>
                          <TextBox
                            fullWidth
                            size="small"
                            type="text"
                            variant="outlined"
                            name="remark_desc"
                            value={remarkText}
                            onChange={(e) => { remarkDesc(e.target.val); setRemarkText(e.target.val) }}
                            helperText={
                              formik.touched.remark_desc && formik.errors.remark_desc
                            }
                            formControlSx={{
                              mb: 0,
                              px: 0,
                              borderRadius: 0,
                              backgroundColor: (theme) => theme.palette.common.white,
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderRadius: 0,
                              },
                              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: (theme) => theme.palette.common.black,
                              },
                              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                              {
                                borderColor: (theme) => theme.palette.common.black,
                              },
                              "& .MuiOutlinedInput-input": {
                                fontFamily: (theme) => theme.typography.typography14,
                              },
                            }}
                            required
                          />
                        </Box>
                      )
                    }
                  </Grid>
                )
            }
          }
          )()}
        </Grid>
      </Box>
    </Box>
  );
};

export default ItemLabel;
