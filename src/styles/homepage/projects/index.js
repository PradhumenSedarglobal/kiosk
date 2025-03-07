import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const ProjectBoxBackground = styled("div")(({ theme }) => ({
  // padding: "4rem 10rem",
  // paddingBottom: "4rem",
  background: theme.palette.info.main,
  // backgroundImage: "url('" + `/assets/homepage/projects/bg-image.png` + "')",
  // backgroundPosition: "right 35%",
  // backgroundSize: "auto",
  // backgroundRepeat: "no-repeat",
  // margin: "0 auto",
  width: "100%",
  position: "relative",
  height: "100%",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    padding: "1rem 1rem",
    paddingBottom: "2rem",
  },
}));

export const ProjectTitle = styled(Typography)(({ theme }) => ({
  letterSpacing: 0.5,
  color: theme.palette.grey[1600],
  fontWeight: 200,
  textTransform: "uppercase",
  paddingLeft: "1.5rem!important",
  borderLeft: `2px solid ${theme.palette.warning.light}`,
  fontFamily: theme.fontFaces.helveticaNeueMedium,
}));

export const StartProjectTitle = styled(Typography)(({ theme }) => ({
  borderBottom: `2px solid ${theme.palette.warning.light}`,
  width: "max-content",
  cursor: "pointer",
  fontWeight: 500,
  paddingBottom: "6px",
  fontFamily: theme.fontFaces.helveticaNeueMedium,
}));
