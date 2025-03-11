import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import FormGroup from "@mui/material/FormGroup";
import {
  setFilterOptionValuesFun,
  getMaterialCustomization,
} from "@/redux/slices/customization";
import { useTranslation } from "next-i18next";
import { FormControl, TextBox } from "@/components/form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@/redux/store";
import { Formik, Field, Form } from "formik";
import { useAuthContext } from "@/auth/useAuthContext";
const qs = require("qs");
const perPage = 15;
const radio_filter = ["Sort By", "متوفر"];

const FilterOption = ({ data }) => {
  const { query, locale } = useRouter();
  const { slug } = query;
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();

  const filterKey = Object.keys(data?.SUB_CHILD);
  const [filterValues, setFilterValues] = useState({});
  const [filterValuesApi, setFilterValuesApi] = useState({});

  const [page, setPage] = useState(1);
  const [itemCode, setItemCode] = useState();

  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { productInfo, editStepData, stepsArray } = customization_info;

  let edit_item_id =
    editStepData.info_result && editStepData.info_result.MATERIAL_SELECTION
      ? editStepData.info_result.MATERIAL_SELECTION.ITEM_ID
      : "";
  let material_item_id = slug && slug.length ? slug[3] : edit_item_id;

  let m_width = productInfo.m_width ? productInfo.m_width : 0;
  let m_height = productInfo.m_height ? productInfo.m_height : 0;
  let SPI_PR_ITEM_CODE = productInfo.SPI_PR_ITEM_CODE
    ? productInfo.SPI_PR_ITEM_CODE
    : 0;

  //let sfi_light_filtering_app_yn = stepsArray.MATERIAL_SELECTION && stepsArray.MATERIAL_SELECTION.material_info ? stepsArray.MATERIAL_SELECTION.material_info.SFI_LIGHT_FILTERING_APP_YN : false;
  // let sfi_blackout_lining_app_yn = stepsArray.MATERIAL_SELECTION && stepsArray.MATERIAL_SELECTION.material_info ? stepsArray.MATERIAL_SELECTION.material_info.SFI_BLACKOUT_LINING_APP_YN : false;

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;

    let filter_name =
      value[0] && value[0]["FILTER_NAME"]
        ? value[0]["FILTER_NAME"]
        : value.FILTER_NAME
        ? value.FILTER_NAME
        : name;

    let filter_array_api = [];
    if (value.length > 0) {
      value.length > 0 &&
        value.map((filter_val) => {
          if (filter_val && filter_val.DESCRIPTION) {
            filter_array_api.push(filter_val.DESCRIPTION_EN);
          }
        });
    } else {
      filter_array_api = value.DESCRIPTION_EN;
    }

    let filter_data = { ...filterValues, [name]: value };
    let filter_data_api = {
      ...filterValuesApi,
      [filter_name]: filter_array_api,
    };

    setFilterValues(filter_data);
    setFilterValuesApi(filter_data_api);

    materialFilter(filter_data_api);

    dispatch(setFilterOptionValuesFun(filter_data_api));
  };

  const materialFilter = (filter_data) => {
    let post_data = {
      param: filter_data,
      limit: perPage,
      page: page,
      material_item_id: stepsArray.MATERIAL_SELECTION
        ? stepsArray.MATERIAL_SELECTION.ITEM_CODE
        : material_item_id,
      m_width: m_width,
      m_height: m_height,
      search_item_code: "",
      content: "customization",
    };

    dispatch(
      getMaterialCustomization({
        paramsId: SPI_PR_ITEM_CODE,
        params: post_data,
      })
    );
  };

  const searchFun = () => {
    if (itemCode && itemCode.length > 2) {
      let item_code = itemCode.replace(/\s/g, "");
      let post_data = {
        locale: locale,
        visitorId: cookies.visitorId,
        userId: cookies.USER_ID,
        search_item_code: item_code,
        material_item_id: material_item_id,
        content: "customization",
      };
      dispatch(
        getMaterialCustomization({
          paramsId: SPI_PR_ITEM_CODE,
          params: post_data,
        })
      );
    }
  };

  return (
    <Box sx={{
      display:"none"
    }}>
      <Box mb={1}>
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

      <Grid container spacing={1}>
        {filterKey?.map((filters, index) => {
          return (
            <Grid item md={4} sm={6} xs={6} xxs={6} key={index}>
              <FormControl fullWidth>
                <InputLabel id={`select-label-${index}`} sx={{color:'common.black' , fontFamily:(theme)=>theme.fontFaces.helveticaNeue}}>{filters}</InputLabel>
                <Select
                  labelId={`demo-multiple-checkbox-label-${index}`}
                  id={`demo-multiple-checkbox-${index}`}
                  multiple={
                    data?.SUB_CHILD[filters] &&
                    data?.SUB_CHILD[filters][0] &&
                    radio_filter.indexOf(
                      data?.SUB_CHILD[filters][0]["FILTER_NAME"]
                    ) >= 0
                      ? false
                      : true
                  }
                  name={filters}
                  value={filterValues[filterKey[index]] || []}
                  onChange={(event) => handleChange(event)}
                  input={
                    <OutlinedInput
                      sx={{
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
                      }}
                      label={filters}
                    />
                  }
                  renderValue={(selected) => {
                    let select_val =
                      selected.length > 0 &&
                      selected.map((val) => val.DESCRIPTION);
                    return Array.isArray(select_val)
                      ? select_val.join(", ")
                      : selected.DESCRIPTION;
                  }}
                >
                  {data?.SUB_CHILD[filters]?.map((checkItem, subIndex) => {
                    let selected_val =
                      filterValues &&
                      filterValues[filters] &&
                      filterValues[filters].length > 0 &&
                      filterValues[filters].map(
                        (check_val) => check_val.DESCRIPTION
                      );
                    return (
                      <MenuItem
                        key={filters + "-" + subIndex}
                        value={checkItem}
                      >
                        {radio_filter.indexOf(checkItem.FILTER_NAME) >= 0 ? (
                          <Radio
                            checked={
                              filterValues[filters] &&
                              checkItem.DESCRIPTION &&
                              filterValues[filters]["DESCRIPTION"] ==
                                checkItem.DESCRIPTION
                                ? true
                                : false
                            }
                          />
                        ) : (
                          <Checkbox
                            checked={
                              selected_val &&
                              selected_val?.includes(checkItem?.DESCRIPTION)
                            }
                          />
                        )}
                        <ListItemText primary={checkItem?.DESCRIPTION} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          );
        })}
      </Grid>
      <Box mb={2}>
        <Formik initialValues={{ item_code: "" }} onSubmit={searchFun}>
          <Form>
            <Grid container>
              <Grid item lg={8} md={8} sm={8} xs={8}>
                <TextBox
                  fullWidth
                  type="text"
                  size="small"
                  label="Item Code"
                  variant="standard"
                  name="item_code"
                  value={itemCode}
                  onChange={(e) => {
                    setItemCode(e.target.value);
                  }}
                  //   helperText={formik.touched.item_code && formik.errors.item_code}
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
                />
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={4}>
                <Button
                  size="medium"
                  fullWidth
                  color="warning"
                  variant="contained"
                  sx={{ borderRadius: "0px", mt: 1.1  ,fontFamily:(theme) => theme.fontFaces.helveticaNeue}}
                  type="submit"
                  className="submit_btn search_button"
                >
                  {translate("Search")}
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default FilterOption;
