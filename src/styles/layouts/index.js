import Image from "@/components/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import { alpha, styled } from "@mui/material/styles";
import { Swiper } from "swiper/react";

export const TopBar = styled(Toolbar)(({ theme }) => ({
  "&.MuiToolbar-root": {
    minHeight: "38px",
    justifyContent: "end",
    backgroundColor: theme.palette.dark.main,
    color: theme.palette.common.white,
    gap: theme?.direction == "rtl" ? "30px" : "18px",
    paddingRight: 0,
  },
}));

export const CombineTypography = styled(Typography)(({ theme }) => ({
  display: "flex",
  flexWrap: "nowrap",
  alignItems: "center",
  gap: "10px",
  fontFamily: theme.fontFaces.helveticaNeue,
  whiteSpace: "nowrap",
}));

export const MUIAppbar = styled(AppBar)(({ theme }) => ({
  width: "100%",
}));

export const AboutTag = styled(Stack)(({ theme }) => ({
  position: "absolute",
  top: "30%",
  left: 0,
  backgroundColor: alpha(theme.palette.common.white, 0.75),
  paddingTop: "20px",
  paddingBottom: "20px",
  paddingRight: "30px",
  paddingLeft: "30px",
  borderRadius: "0.375rem",
  borderTopLeftRadius: "0px",
  borderBottomLeftRadius: "0px",
  zIndex: 1000,
}));

export const BgImageBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.pink.main,
  height: "calc(100dvh - 125px)",
  backgroundImage: "url(/assets/homepage/background.avif)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "100% 0",
  color: theme.palette.common.white,
  display: "grid",
  [theme.breakpoints.down("md")]: {
    height: "258px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "370px",
  },
  [theme.breakpoints.down("xs")]: {
    height: "370px",
  },
}));

export const MobileBgImageBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.pink.main,
  height: "calc(100dvh - 125px)",
  backgroundImage: "url(/assets/homepage/background_2.avif)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "100% 0",
  color: theme.palette.common.white,
  display: "grid",
  transform: "scaleX(-1)",
  [theme.breakpoints.down("md")]: {
    height: "258px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "370px",
  },
  [theme.breakpoints.down("xs")]: {
    height: "370px",
  },
}));

export const SpaceArtImage = styled(Image)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  padding: "0px",
  margin: "auto",
  display: "block",
  width: "183px",
  height: "146px",
  objectFit: "contain",
  right: 0,
}));

export const CenterContentBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "end",
  justifyContent: "center",
  paddingRight: "6rem!important",
  paddingLeft: "6rem!important",
  [theme.breakpoints.down("md")]: {
    paddingRight: "0.5rem!important",
    paddingLeft: "0.5rem!important",
    alignItems: "center",
  },
}));

export const CustomPopover = styled(Box, {
  shouldForwardProp: (props) => props !== "anchorEl",
})(({ theme, anchorEl }) => {
  return {
    display: "none",
    position: "relative",
    width: "100%",
    padding: "1.8rem",
    borderRadius: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    boxShadow: "0 100vh 0 100vh rgba(0,0,0,.5), 0 5px 5px rgba(0,0,0,.5)",
    background: theme.palette.grey[1500],
    width: "100%",
    transition: theme.transitions.create(["display", "all"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.short,
    }),
    ":before": {
      content: "''",
      backgroundColor: theme.palette.grey[1500],
      fontWeight: 700,
      width: "240px",
      height: "100%",
      left: "-132px",
      position: "absolute",
      top: 0,
      bottom: 0,
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(/assets/header/menu/menu.avif)`,
      transform: theme?.direction === "rtl" ? "rotate(180deg)" : "none",
      zIndex: 1,
    },
    ...(anchorEl && {
      display: "block",
    }),
  };
});
export const MenuLinkTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginLeft: "30px",
  cursor: "pointer",
  ":before": {
    content: "''",
    position: "absolute",
    width: "20px",
    borderBottom: `3px solid ${theme.palette.warning.light}`,
    top: "55%",
    right: "auto",
    marginLeft: "-20px",
    transform: "translate(-50%, -50%)",
  },
}));

export const TopbarSwiper = styled(Swiper)(({ theme }) => ({
  "&.swiper-initialized": {
    "& .swiper-wrapper": {
      height: "38px",
      margin: 0,
      "& .swiper-slide": {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
          justifyContent: "center",
        },
      },
    },
  },
}));

const CustomListButton = styled(ListItemButton)(({ theme }) => ({
  "&.MuiListItemButton-root": {
    paddingLeft: 0,
    paddingRight: 0,
    ":hover": {
      background: theme.palette.common.black,
    },
  },
}));
export default CustomListButton;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0.63, 1.9),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
  background: theme.palette.common.white,
}));

export const FacebookButton = styled(Box)(({ theme }) => ({
  "& .fb_btn": {
    color: `${theme.palette.common.white}!important`,
    ...theme.typography.typography12,
    fontFamily: `${theme.fontFaces.helveticaNeueMedium}!important`,
    borderRadius: "3px",
    fontWeight: 500,
    background: theme.palette.google.main,
    boxShadow: `${alpha(theme.palette.common.black, 0.5)} 0px 1px 2px`,
  },
}));

export const GoogleButton = styled(Box)(({ theme }) => ({
  "& .google_btn": {
    color: `${theme.palette.grey["google"]}!important`,
    ...theme.typography.typography12,
    FontFace: `${theme.typography.typography12}!important`,
    fontFamily: `${theme.fontFaces.helveticaNeueMedium}!important`,
    fontWeight: 500,
    borderRadius: "3px",
    background: `${theme.palette.grey[200]}!important`,
    boxShadow: `${alpha(theme.palette.common.black, 0.5)} 0px 1px 2px`,
  },
}));

export const CustomAuthDialog = styled(Dialog, {
  shouldForwardProp: (props) => props !== "maxWidth",
})(({ theme, maxWidth }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  "&.MuiButton-root": {
    ...(maxWidth == "xs" && {
      maxWidth: "524px!important",
    }),
  },
}));

export const CustomCategoryStack = styled(Stack)(({ theme }) => ({
  "&.MuiStack-root": {
    "& a": {
      "&:nth-of-type(n + 12)": {
        display: "none",
      },
    },
    [theme.breakpoints.down("xl")]: {
      "& a": {
        "&:nth-of-type(n + 9)": {
          display: "none",
        },
      },
    },
    [theme.breakpoints.down("lg")]: {
      "& a": {
        "&:nth-of-type(n + 6)": {
          display: "none",
        },
      },
    },
    [theme.breakpoints.down("md")]: {
      "& a": {
        "&:nth-of-type(n + 6)": {
          display: "none",
        },
      },
    },
  },
}));

export const CustomCategoryPaper = styled(Paper)(({ theme }) => ({
  "&.MuiPaper-root": {
    "& a": {
      display: "none",
      "&:nth-of-type(n + 9)": {
        display: "block",
      },
    },
    [theme.breakpoints.down("xl")]: {
      "& a": {
        display: "none",
        "&:nth-of-type(n + 9)": {
          display: "block",
        },
      },
    },
    [theme.breakpoints.down("lg")]: {
      "& a": {
        display: "none",
        "&:nth-of-type(n + 6)": {
          display: "block",
        },
      },
    },
    [theme.breakpoints.down("md")]: {
      "& a": {
        display: "none",
        "&:nth-of-type(n + 5)": {
          display: "block",
        },
      },
    },
  },
}));
