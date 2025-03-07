import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const CustomWhatsappBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "asPath",
})(({ theme, asPath }) => ({
  // "&.whatsAppChat": {
  //   textAlign: "end",
  //   "&.left": {
  //     right: "20px",
  //     left: "auto",
  //   },
  // },
  // ...(asPath && {
  //   position: "fixed",
  //   bottom: "12rem",
  //   right: "20px",
  //   zIndex: 114,
  //   cursor: "pointer",
  //   padding: "3px 9px",
  //   // boxShadow: "0 1px 3px 1px #4847476b",

  //   [theme.breakpoints.down("md")]: {
  //     width: "50px",
  //     height: "50px",
  //   },
  //   "&.left": {
  //     right: "auto",
  //     left: "15px",

  //     [theme.breakpoints.down("sm")]: {
  //       right: "20px!important",
  //       left: "auto!important",
  //       bottom: "5rem",
  //       width: "51px",
  //       height: "161px",
  //     },
  //   },
  // }),
}));
