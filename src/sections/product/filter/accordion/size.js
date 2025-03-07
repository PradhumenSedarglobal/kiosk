import { MUICheckBox } from "@/components/form";
import useProduct from "@/provider/product/useProduct";
import { CustomSlider } from "@/styles/product";
import {
  getMatchedKeyOrItemKey,
  getValueIgnoreCase,
} from "@/utils/matchCaseSensitive";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";

const SizeFilter = ({
  item = "",
  handlePush,
  handleSingleAccordianReset = () => { },
}) => {
  const { query } = useRouter();
  const { min, max, slug } = query;
  const category = (slug && slug[0]) || undefined;
  const { t: translate } = useTranslation();
  const { productState } = useProduct();
  const { checkedFilterData } = productState;
  const itemKey = "size" || "";
  const queryParamsKey = getMatchedKeyOrItemKey(query, itemKey);
  let childItem =
    item?.TAGS && item?.TAGS?.length > 0
      ? item?.TAGS[0]
      : {
        MAX_HEIGHT: "100",
        MAX_WIDTH: "100",
        MIN_HEIGHT: "20",
        MIN_WIDTH: "20",
        SPI_HEIGHT_STANDARD: "60",
        SPI_WIDTH_STANDARD: "70",
      };

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [widthFilter, setWidthFilter] = useState(
    Number(childItem?.SPI_WIDTH_STANDARD || 0)
  );

  const [heightFilter, setHeightFilter] = useState(
    Number(childItem?.SPI_HEIGHT_STANDARD || 0)
  );

  React.useEffect(() => {
    if (childItem) {
      setWidthFilter(Number(childItem?.SPI_WIDTH_STANDARD));
      setHeightFilter(Number(childItem?.SPI_HEIGHT_STANDARD));
    }
  }, [childItem]);

  const handleUpdateSize = () => {
    if (min) {
      setWidthFilter(min);
    }

    if (max) {
      setHeightFilter(max);
    }
  };

  const handleWidthSliderChange = (e, newValue) => {
    // if (childItem?.MIN_WIDTH <= newValue) {
    setWidthFilter(newValue);
    // }
  };

  const handleHeightSliderChange = (e, newValue) => {
    // if (childItem?.MIN_HEIGHT <= newValue) {
    setHeightFilter(newValue);
    // }
  };

  React.useEffect(() => {
    if (min || max) {
      handleUpdateSize();
    }
  }, [min, max]);

  const handleApplySize = () => {
    const data = { min: widthFilter, max: heightFilter };
    handlePush(true, "size", data, false);
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      sx={{
        "&.MuiAccordion-root": {
          "&.Mui-expanded": {
            margin: "0px 0",
          },
          boxShadow: "none",
          ":before": {
            height: "0px!important",
            overflow: "hidden",
          },
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          expanded !== "panel1" ? (
            <Add fontSize="small" color="common.black" />
          ) : (
            <Remove fontSize="small" color="common.black" />
          )
        }
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={(theme) => ({
          "& .MuiAccordionSummary-content": {
            ":after": {
              content: "''",
              height: "1px",
              position: "absolute",
              bottom: 0,
              left: "50%",
              background: theme.palette.divider,
              width: "94%",
              textAlign: "center",
              transform: "translate(-50%, -50%)",
            },
          },
        })}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{ width: "100%" }}
          justifyContent="space-between"
          mr={1}
        >
          <Typography
            component="p"
            mb={0}
            variant="typography15"
            fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
            color="common.black"
          >
            {item?.DESCRIPTION}
          </Typography>
          {item?.SIZE_FILTER_BY == "CHECKBOX" &&
            checkedFilterData?.size?.length && (
              <Typography
                color="primary"
                onClick={() => handleSingleAccordianReset("size")}
                fontFamily={(theme) => theme.fontFaces.helveticaNeueBold}
                variant="typography14"
                component="p"
              >
                {translate("Clear")}
              </Typography>
            )}
        </Stack>
      </AccordionSummary>
      {item?.SIZE_FILTER_BY != "CHECKBOX" ? (
        <AccordionDetails sx={{ mt: 2 }}>
          <Grid container gap={2} justifyContent="center">
            <Grid item md={5.5} sm={5.5} xs={12} xxs={12}>
              <Stack>
                <Typography
                  component="p"
                  variant="typography14"
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
            <Grid item md={5.5} sm={5.5} xs={12} xxs={12}>
              <Stack>
                <Typography
                  component="p"
                  variant="typography14"
                  fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                >
                  {translate(
                    category == "wallpaper" ? "wall_Height" : "Height"
                  )}
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
          <Box mt={2}>
            <Button
              fullWidth
              variant="contained"
              sx={(theme) => ({
                "&.MuiButton-root": {
                  borderRadius: "0px",
                  color: `${theme.palette.common.black}!important`,
                  ...theme.typography.body2,
                  fontFamily: theme.fontFaces.helveticaNeueMedium,
                  letterSpacing: "0.54px!important",
                  background: theme.palette.primary.light,
                  ":hover": {
                    background: `${theme.palette.primary.light}!important`,
                  },
                },
              })}
              onClick={handleApplySize}
            >
              {translate("Apply")}
            </Button>
          </Box>
        </AccordionDetails>
      ) : (
        <AccordionDetails>
          {item?.TAGS &&
            item?.TAGS?.map((parentItem, parentIndex) => {
              return (
                parentItem &&
                parentItem?.SPI_WIDTH_STANDARD?.length > 0 &&
                parentItem?.SPI_WIDTH_STANDARD.map((childItem, childIndex) => {
                  const getCheckedValue = getValueIgnoreCase(
                    checkedFilterData,
                    queryParamsKey
                  );
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
                          variant="typography14"
                          fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                          fontWeight={500}
                          color="common.black"
                          sx={{ width: "100%" }}
                        >
                          {`${childItem} * ${parentItem?.SPI_HEIGHT_STANDARD[parentIndex]
                            } ${translate("cm")}`}
                        </Typography>
                      }
                      checked={
                        getCheckedValue && getCheckedValue?.length > 0
                          ? getCheckedValue.includes(
                            `${childItem},${parentItem?.SPI_HEIGHT_STANDARD[parentIndex]}`
                          )
                          : false
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          handlePush(
                            e.target.checked,
                            queryParamsKey,
                            `${childItem},${parentItem?.SPI_HEIGHT_STANDARD[parentIndex]}`,
                            true
                          );
                        } else {
                          handlePush(
                            e.target.checked,
                            queryParamsKey,
                            `${childItem},${parentItem?.SPI_HEIGHT_STANDARD[parentIndex]}`,
                            true
                          );
                        }
                      }}
                    />
                  );
                })
              );
            })}
        </AccordionDetails>
      )}
    </Accordion>
  );
};

SizeFilter.propTypes = {
  item: PropTypes.object,
  handlePush: PropTypes.func,
};

export default SizeFilter;
