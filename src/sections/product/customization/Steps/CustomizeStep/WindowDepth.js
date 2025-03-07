import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextBox } from "@/components/form";
import { useDispatch, useSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import { setCustomizationFun } from "@/redux/slices/customization";
const re = /^\d*\.?\d*$/;

const WindowDepth = ({ data }) => {

  const { t: translate } = useTranslation();

  const dispatch = useDispatch();
  let [depthVal, setDepthVal] = useState();
  let [error, setError] = useState(true);

  let min_width = data.SPS_MIN_WIDTH ? data.SPS_MIN_WIDTH : 8;

  const { editStepData } = useSelector((state) => state.customization);

  const optionFun = (val) => {
    if (min_width <= val) {
      setDepthVal(val);
      let new_data = { ...data, depth: val }
      dispatch(
        setCustomizationFun(new_data)
      );
      setError(false)
    } else {
      setError(true)
    }

  }


  useEffect(() => {

    if (editStepData.info_result && editStepData.info_result.WINDOW_DEPTH && editStepData.info_result.WINDOW_DEPTH.SOI_DEPTH > 0) {
      setTimeout(optionFun(editStepData.info_result.WINDOW_DEPTH.SOI_DEPTH), 1500)
    }
  }, []);

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
        <Typography
          sx={(theme) => ({
            mb: 0.6,
            fontFamily: theme.fontFaces.helveticaNeueMedium,
            fontSize: theme.typography.typography14,
            color: theme.palette.common.black,
          })}
        >
          Description Min Depth{" "}
          <Typography
            component="span"
            sx={(theme) => ({
              fontFamily: theme.fontFaces.helveticaNeueLight,
              fontSize: theme.typography.typography14,
              color: theme.palette.common.black,
            })}
          >
            ( Min: {data?.SPS_MIN_WIDTH} cm )
          </Typography>
        </Typography>
        <TextBox
          fullWidth
          type="text"
          size="small"
          variant="outlined"
          name="min_depth"
          value={depthVal}
          onChange={(e) => { re.test(e.target.value) ? setDepthVal(e.target.value) : setDepthVal(''); re.test(e.target.value) && optionFun(e.target.value); }}
          helperText={error && `Min Depth (${data?.SPS_MIN_WIDTH}) CM`}
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
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.common.black,
            },
            "& .MuiOutlinedInput-input": {
              fontFamily: (theme) => theme.typography.typography14,
            },
          }}
          required
        />
      </Box>
    </Box>
  );
};

export default WindowDepth;
