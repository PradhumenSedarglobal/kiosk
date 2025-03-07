import { MUICheckBox } from "@/components/form";
import useProduct from "@/provider/product/useProduct";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React from "react";
const SortBy = ({ FILTERS, handlePush }) => {
  const { productState } = useProduct();
  const { checkedFilterData } = productState;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        color="dark"
        endIcon={<ArrowDropDownIcon />}
        sx={(theme) => ({
          borderRadius: "0px",
          borderColor: "divider",
          fontFamily: theme.fontFaces.helveticaNeueMedium,
          ...theme.typography.typography14,
          "&:hover": {
            backgroundColor: theme.palette.common.white,
            border: "0.5px solid lightgrey",
          },
        })}
        size="large"
      >
        {FILTERS?.DESCRIPTION}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {FILTERS?.TAGS &&
          FILTERS?.TAGS?.length > 0 &&
          FILTERS?.TAGS.map((item, index) => {
            return (
              <MenuItem key={index} onClick={handleClose}>
                <MUICheckBox
                  size="small"
                  fullWidth
                  key={`SUB-AVAILABILITY-${item?.DESCRIPTION}-${index}`}
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
              </MenuItem>
            );
          })}
      </Menu>
    </Box>
  );
};

export default SortBy;
