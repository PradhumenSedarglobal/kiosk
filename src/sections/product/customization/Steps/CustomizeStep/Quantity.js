import { SelectBox } from "@/components/form";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { addToCartFunScene } from "../../sceneCanvas3D";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@/redux/store";
import { useTranslation } from "next-i18next";
import { setCustomizationFun } from "@/redux/slices/customization";
import { useAuthContext } from "@/auth/useAuthContext";
import MainHeading from "@/app/components/MainHeading";
import SubHeading from "@/app/components/SubHeading";

const Quantity = ({ data, formik }) => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const { query, locale } = useRouter();
  const [selected, setSelected] = useState(1);

  const customization_info = useSelector((state) => state.customization);
  const { state } = useAuthContext();
  const { cookies } = state;
  const { stepsArray, editStepData } = customization_info;

  let qut_options = Array.from(Array(100), (e, i) => {
    let val = i + 1;
    return { label: val, value: val };
  });

  const quantityFn = (qty) => {
    let qunt_data = { ...data, QTY: qty };
    dispatch(setCustomizationFun(qunt_data));
    setSelected(qty);
  };

  useEffect(() => {
    if (
      editStepData.info_result &&
      editStepData.info_result.QUANTITY &&
      editStepData.info_result.QUANTITY.SOI_PCS > 0
    ) {
      quantityFn(editStepData.info_result.QUANTITY.SOI_PCS);
    } else if (
      editStepData.line_result &&
      editStepData.line_result.SOL_QTY &&
      editStepData.line_result.SOL_QTY > 0
    ) {
      quantityFn(editStepData.line_result.SOL_QTY);
    } else {
      quantityFn(1);
    }
  }, []);
  useEffect(() => {
    setTimeout(
      function () {
        addToCartFunScene(
          { ...cookies, ...customization_info, locale: locale },
          dispatch
        );
      }.bind(this),
      500
    );
  }, [selected]);

  return (
    <>
      <SubHeading  title={data?.SPS_DESC} />
     
      <Stack
        direction="row"
        pt={2}
        justifyContent="space-between"
        alignItems="center"
        spacing={2} // Reduced spacing to make it look more compact and clean
        px={3}
      >
        <Box sx={{ width: "100%" }}>
          <SelectBox
            fullWidth
            size="large"
            label=""
            name="qtys"
            value={stepsArray.QUANTITY?.QTY || 1} // Default value fallback
            onChange={(e) => quantityFn(e.target.value)}
            options={qut_options}
            setLabel="label"
            setValue="value"
            formSx={(theme) => ({
              marginBottom: "8px", // Spacing between elements for better appearance
              backgroundColor: theme.palette.background.paper, // Slightly lighter background for better contrast
              "& .MuiSelect-select": {
                color: theme.palette.text.primary, // Updated color to match Material-UI style
                fontSize: theme.typography.body1.fontSize, // Ensured readability with a clean font size
                paddingRight: "32px", // Space for the dropdown indicator
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main, // Accent color for the border
                borderRadius: "8px", // Slightly rounded corners for a modern feel
                borderWidth: 2, // Thicker border for prominence
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.dark, // Darker border on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main, // Focused state with primary color
              },
              "& .MuiSvgIcon-root": {
                color: theme.palette.primary.main, // Icon color matches the border accent
              },
            })}
          />
        </Box>
      </Stack>
    </>
  );
};

export default Quantity;
