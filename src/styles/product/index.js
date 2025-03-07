import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import Slider from "@mui/material/Slider";
import { alpha, styled } from "@mui/material/styles";
import { Swiper } from "swiper/react";

export const HoverCard = styled(Card)(({ theme }) => ({
  "&.MuiCard-root": {
    borderRadius: "0px",
    height: "100%",
    position: "relative",
    "& .hoverButton": {
      display: "none",
    },
    ":hover .hoverButton": {
      transition: theme.transitions.create(["display", "all"], {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.complex,
      }),
      display: "block",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      ":hover .hoverButton": {
        display: "none",
      },
    },
  },
}));

export const CustomSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.light,
  height: "0.15rem!important",
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.primary.light,
    zIndex: 1,
    boxShadow: `0 3px 1px  ${alpha(
      theme.palette.common.black,
      0.1
    )},0 4px 8px ${alpha(theme.palette.common.black, 0.3)},0 0 0 1px ${alpha(
      theme.palette.common.black,
      0.02
    )}`,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: `0 3px 1px  ${alpha(
        theme.palette.common.black,
        0.1
      )},0 4px 8px ${alpha(theme.palette.common.black, 0.3)},0 0 0 1px ${alpha(
        theme.palette.common.black,
        0.02
      )}`,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: `0 3px 1px  ${alpha(
          theme.palette.common.black,
          0.1
        )},0 4px 8px ${alpha(
          theme.palette.common.black,
          0.3
        )},0 0 0 1px ${alpha(theme.palette.common.black, 0.02)}`,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: "unset",
    bottom: "-55px",
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    fontFamily: theme.fontFaces.helveticaNeueMedium,
    fontWeight: 500,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: theme.palette.primary.light,
    zIndex: 5,
  },
  "& .MuiSlider-mark": {
    backgroundColor: theme.palette.grey[2700],
    height: 15,
    width: 1,
    top: "8px",
    zIndex: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

export const ProductMaterialDetailThumbSlider = styled(Box)(({ theme }) => ({
  "&.ProductMaterialDetailThumbSlider": {
    position: "relative",
    textAlign: "center",
    "& .swiper-pagination-bullet": {
      backgroundColor: theme.palette.common.white,
    },
    "& #thumbs": {
      padding: "15px 0",
      cursor: "pointer",

      "& .swiper-wrapper": {
        img: {
          maxHeight: "90px",
        },
      },
      maxHeight: "102px",
      [theme.breakpoints.down("md")]: {
        maxHeight: "inherit",
        padding: "1rem 0",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "1rem 0",
        "& .left": {
          display: "none",
        },
      },

      "& .left": {
        position: "relative",
        width: "100%",
        textAlign: "left",
      },
    },
    "& .zoom-slider": {
      position: "relative",
      "& .expand-product": {
        position: "absolute",
        top: "4%",
        right: "4%",
        zIndex: 1,
        cursor: "pointer",
      },
      "& .share-product": {
        position: "absolute",
        bottom: "4%",
        right: "4%",
        zIndex: 1,
        cursor: "pointer",
      },
      img: {
        maxHeight: "calc(100vh - 0px)",
        [theme.breakpoints.down("sm")]: {
          maxHeight: "calc(85vh - 80px)",
        },
      },
    },
  },
}));

export const FilterClickOpenMenu = styled(Menu)(({ theme }) => ({}));
