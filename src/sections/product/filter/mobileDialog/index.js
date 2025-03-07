import Iconify from "@/components/iconify";
import useProduct from "@/provider/product/useProduct";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import MobileFilterTab from "./filter";

const MobileFilter = ({
  handlePush,
  handleSingleAccordianReset,
  productFilter,
  productFilterDropdown,
  handleReset,
}) => {
  const [open, setOpen] = React.useState(false);
  const { t: translate } = useTranslation();
  const { productState } = useProduct();
  const { checkedFilterData } = productState;
  const [value, setValue] = React.useState(
    String(productFilter?.MOBILE_DATA?.defaultValue)
  );

  React.useEffect(() => {
    setValue(String(productFilter?.MOBILE_DATA?.defaultValue));
  }, []);

  const handleChangeTab = (event, newValue) => {
    setValue(String(newValue));
  };

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let childItem =
    productFilter?.MOBILE_DATA?.FILTERS?.[0]?.TAGS &&
      productFilter?.MOBILE_DATA?.FILTERS?.[0]?.TAGS?.length > 0
      ? productFilter?.MOBILE_DATA?.FILTERS?.[0]?.TAGS?.[0]
      : {
        MAX_HEIGHT: "100",
        MAX_WIDTH: "100",
        MIN_HEIGHT: "20",
        MIN_WIDTH: "20",
        SPI_HEIGHT_STANDARD: "60",
        SPI_WIDTH_STANDARD: "70",
      };
  const [widthFilter, setWidthFilter] = useState(
    Number(childItem?.SPI_WIDTH_STANDARD)
  );
  const [heightFilter, setHeightFilter] = useState(
    Number(childItem?.SPI_HEIGHT_STANDARD)
  );
  const handleApplySize = () => {
    const data = { min: widthFilter, max: heightFilter };
    handlePush(true, "size", data, false);
  };

  const handleWidthSliderChange = (e, newValue) => {
    if (childItem?.MIN_WIDTH <= newValue) {
      setWidthFilter(newValue);
    }
  };

  const handleHeightSliderChange = (e, newValue) => {
    if (childItem?.MIN_HEIGHT <= newValue) {
      setHeightFilter(newValue);
    }
  };

  return (
    <Box
      component="div"
      sx={{ width: { md: "180px", sm: "100%", xs: "100%", xxs: "100%" } }}
    >
      <Button
        fullWidth
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        startIcon={<Iconify icon="tabler:filter" width="18px" />}
        sx={(theme) => ({
          fontWeight: 500,
          borderRadius: "0px",
          borderColor: "divider",
          fontFamily: theme.fontFaces.helveticaNeue,
          ...theme.typography.typography22,
          color: "common.black",
        })}
        size="large"
      >
        {translate("Filter")}
      </Button>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleClose}
        sx={{
          width: "100%!important",
          "& .MuiDrawer-paper": {
            width: "100%",
          },
        }}
      >
        <AppBar position="relative" color="inherit">
          <Stack
            direction="row"
            alignItems="center"
            p={2}
            pt={3}
            pb={3}
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={3}>
              <Box
                sx={{
                  display: {
                    lg: "none",
                    md: "none",
                    sm: "block",
                    xs: "block",
                    xxs: "block",
                  },
                }}
                onClick={handleClose}
              >
                <ArrowBackIcon
                  sx={(theme) => ({
                    ...(theme.direction == "rtl" && {
                      transform: "rotate(180deg)",
                    }),
                  })}
                />
              </Box>
              <Typography
                component="div"
                sx={(theme) => ({
                  ...theme.typography.typography22,
                  fontFamily: theme.fontFaces.helveticaNeue,
                  color: theme.palette.common.black,
                })}
              >
                {translate("Filter")}
              </Typography>
            </Stack>
            <Typography
              variant="typography20"
              fontFamily={(theme) => theme.fontFaces.helveticaNeue}
              color={(theme) => theme.palette.primary.main}
              onClick={() => {
                handleReset();
                handleClose();
              }}
              mr={2}
              fontWeight={500}
            >
              {translate("ClearAll")}
            </Typography>
          </Stack>
        </AppBar>
        <Box sx={{ height: "100%", mb: 10 }} component="div">
          <MobileFilterTab
            productFilter={productFilter}
            handlePush={handlePush}
            value={value}
            handleChangeTab={handleChangeTab}
            checkedFilterData={checkedFilterData}
            handleClose={handleClose}
            handleSingleAccordianReset={handleSingleAccordianReset}
            productFilterDropdown={productFilterDropdown}
            handleWidthSliderChange={handleWidthSliderChange}
            handleHeightSliderChange={handleHeightSliderChange}
            widthFilter={widthFilter}
            heightFilter={heightFilter}
          />
        </Box>
        <AppBar
          position="fixed"
          color="inherit"
          sx={{ height: "max-content", top: "unset", bottom: 0 }}
        >
          <Stack
            direction="row"
            spacing={2}
            p={2}
            justifyContent="space-between"
          >
            <Button
              onClick={handleClose}
              sx={(theme) => ({
                borderRadius: "0px",
                py: 1.4,
                fontFamily: theme.fontFaces.helveticaNeue,
                fontSize: "16px",
                fontWeight: 300,
              })}
              color="dark"
              variant="outlined"
              fullWidth
            >
              {translate("Close")}
            </Button>
            <Button
              onClick={() => {
                handleApplySize();
                handleClose();
              }}
              sx={(theme) => ({
                borderRadius: "0px",
                py: 1.4,
                fontFamily: theme.fontFaces.helveticaNeue,
                fontSize: "16px",
                fontWeight: 300,
              })}
              fullWidth
              color="primary"
              variant="contained"
            >
              {translate("Apply")}
            </Button>
          </Stack>
        </AppBar>
      </Drawer>
    </Box>
  );
};

export default MobileFilter;
