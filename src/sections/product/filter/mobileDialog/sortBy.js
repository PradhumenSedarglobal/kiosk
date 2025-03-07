import { MUICheckBox } from "@/components/form";
import useProduct from "@/provider/product/useProduct";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import React from "react";

const MobileSortBy = ({ FILTERS, handlePush }) => {
  const [open, setOpen] = React.useState(false);
  const { t: translate } = useTranslation();
  const { productState } = useProduct();
  const { checkedFilterData } = productState;

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        startIcon={<SwapVertIcon />}
        sx={(theme) => ({
          fontWeight: 500,
          borderRadius: "0px",
          borderColor: "divider",
          fontFamily: theme.fontFaces.helveticaNeue,
          ...theme.typography.typography22,
          color: "common.black"
        })}
        size="large"
      >
        {translate("Sort")}
      </Button>
      <Drawer anchor="bottom" open={open} onClose={handleClose}>
        <Typography
          component="div"
          variant="filter1"
          mt={4}
          mb={3}
          ml={4}
          fontFamily={(theme) => theme.fontFaces.helveticaNeueMedium}
          fontWeight={500}
          color={(theme) => theme.palette.common.black}
        >
          {translate("SortBy")}
        </Typography>
        {FILTERS?.TAGS &&
          FILTERS?.TAGS?.length > 0 &&
          FILTERS?.TAGS.map((item, index) => {
            return (
              <Box key={index} onClick={handleClose} ml={4}>
                <MUICheckBox
                  size="small"
                  fullWidth
                  key={`SUB-AVAILABILITY-${item?.DESCRIPTION}-${index}`}
                  name="color"
                  label={
                    <Typography
                      component="span"
                      mb={0}
                      fontSize="18px"
                      lineHeight={"normal"}
                      fontFamily={(theme) => theme.fontFaces.helveticaNeue}
                      fontWeight={400}
                      color="common.black"
                      sx={{ width: "100%" }}
                    >
                      {item?.DESCRIPTION}
                    </Typography>
                  }
                  checked={
                    checkedFilterData && checkedFilterData[FILTERS?.DESCRIPTION_EN]
                      ? checkedFilterData[FILTERS?.DESCRIPTION_EN].includes(
                        item?.DESCRIPTION_EN
                      )
                      : false
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      handlePush(
                        e.target.checked,
                        FILTERS?.DESCRIPTION_EN,
                        item?.DESCRIPTION_EN,
                        false
                      );
                    } else {
                      handlePush(
                        e.target.checked,
                        FILTERS?.DESCRIPTION_EN,
                        item?.DESCRIPTION_EN,
                        false
                      );
                    }
                  }}
                />
              </Box>
            );
          })}
      </Drawer>
    </Box>
  );
};

export default MobileSortBy;
