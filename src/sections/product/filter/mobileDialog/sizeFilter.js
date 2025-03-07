import { MUICheckBox } from "@/components/form";
import useProduct from "@/provider/product/useProduct";
import { CustomSlider } from "@/styles/product";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";

const SizeFilter = ({
  item = "",
  handlePush = () => { },
  isCheckBox,
  handleWidthSliderChange,
  handleHeightSliderChange,
  widthFilter,
  heightFilter,
}) => {
  const { query } = useRouter();
  const { slug } = query;
  const category = (slug && slug[0]) || undefined;
  const { t: translate } = useTranslation();
  const { productState } = useProduct();
  const { checkedFilterData } = productState;
  const childItem = React.useMemo(() => {
    return item
      ? item
      : {
        MAX_HEIGHT: "100",
        MAX_WIDTH: "100",
        MIN_HEIGHT: "20",
        MIN_WIDTH: "20",
        SPI_HEIGHT_STANDARD: "60",
        SPI_WIDTH_STANDARD: "70",
      };
  }, [item]);

  return (
    <Box p={2.5}>
      {!isCheckBox ? (
        <Grid container spacing={2} alignItems="center">
          <Grid item lg={6} md={6} sm={6} xs={6} xxs={12}>
            <Stack
              spacing={2}
              sx={{ mb: { lg: 0, md: 0, sm: 0, xs: 0, xxs: 6 } }}
            >
              <Typography
                component="p"
                variant="typography17"
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              >
                {translate(category == "wallpaper" ? "wall_Width" : "Width")}
              </Typography>
              <Box sx={{ position: "relative", mt: 1 }}>
                <Box
                  component="div"
                  sx={{
                    "&:before": {
                      content: '"||||||||||||||||||||||||||"',
                      position: "absolute",
                      top: "0",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      width: "100%",
                      color: "#b2b2b2",
                      letterSpacing: "9px",
                      fontSize: "13px",
                    },
                  }}
                />
                <CustomSlider
                  aria-label="Always visible"
                  defaultValue={childItem?.SPI_WIDTH_STANDARD}
                  step={5}
                  valueLabelDisplay="on"
                  value={widthFilter}
                  onChange={handleWidthSliderChange}
                  max={Number(childItem?.MAX_WIDTH)}
                  min={Number(childItem?.MIN_WIDTH)}
                  marks={false}
                  valueLabelFormat={(e) => `${e} ${translate("cm")}`}
                />
              </Box>
            </Stack>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6} xxs={12}>
            <Stack spacing={2}>
              <Typography
                component="p"
                variant="typography17"
                fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              >
                {translate(category == "wallpaper" ? "wall_Height" : "Height")}
              </Typography>
              <Box sx={{ position: "relative", mt: 1 }}>
                <Box
                  component="div"
                  sx={{
                    "&:before": {
                      content: '"||||||||||||||||||||||||||"',
                      position: "absolute",
                      top: "0",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      width: "100%",
                      color: "#b2b2b2",
                      letterSpacing: "9px",
                      fontSize: "13px",
                    },
                  }}
                />
                <CustomSlider
                  aria-label="Always visible"
                  defaultValue={childItem?.SPI_HEIGHT_STANDARD}
                  step={5}
                  valueLabelDisplay="on"
                  value={heightFilter}
                  onChange={handleHeightSliderChange}
                  max={Number(childItem?.MAX_HEIGHT)}
                  min={Number(childItem?.MIN_HEIGHT)}
                  marks={false}
                  valueLabelFormat={(e) => `${e}  ${translate("cm")}`}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        item &&
        item?.SPI_WIDTH_STANDARD?.length > 0 &&
        item?.SPI_WIDTH_STANDARD.map((childItem, childIndex) => {
          return (
            <MUICheckBox
              size="small"
              fullWidth
              key={`SUB-AVAILABILITY-${"size"}-${childIndex}`}
              name="color"
              label={
                <Typography
                  component="span"
                  mb={0}
                  variant="typography20"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                  fontWeight={500}
                  color="common.black"
                  sx={{ width: "100%" }}
                >
                  {`${childItem} * ${item?.SPI_HEIGHT_STANDARD[childIndex]
                    } ${translate("cm")}`}
                </Typography>
              }
              checked={
                checkedFilterData && checkedFilterData["size"]
                  ? checkedFilterData["size"].includes(
                    `${childItem},${item?.SPI_HEIGHT_STANDARD[childIndex]}`
                  )
                  : false
              }
              onChange={(e) => {
                if (e.target.checked) {
                  handlePush(
                    e.target.checked,
                    "size",
                    `${childItem},${item?.SPI_HEIGHT_STANDARD[childIndex]}`,
                    true
                  );
                } else {
                  handlePush(
                    e.target.checked,
                    "size",
                    `${childItem},${item?.SPI_HEIGHT_STANDARD[childIndex]}`,
                    true
                  );
                }
              }}
            />
          );
        })
      )}
    </Box>
  );
};
SizeFilter.propTypes = {
  item: PropTypes.string,
  handlePush: PropTypes.func,
};

export default SizeFilter;
