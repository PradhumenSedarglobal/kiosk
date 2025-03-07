import { m } from "framer-motion";
import { useEffect, useState } from "react";
// @mui
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
//
import NextLazyLoadImage from "../image/NextLazyLoadImage";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 9998,
  width: "100%",
  height: "100%",
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: alpha(theme.palette.common.black, 0.7),
}));

// ----------------------------------------------------------------------

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <StyledRoot>
      <m.div
        animate={{
          scale: [1, 0.9, 0.9, 1, 1],
          opacity: [1, 1, 1, 1, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeatDelay: 1,
          repeat: Infinity,
        }}
      >
        <NextLazyLoadImage
          src="/favicon.ico"
          alt="Loading Logo"
          width={28}
          height={28}
          sx={{
            width: "50px!important",
            height: "100%!important",
            objectFit: "cover!important",
          }}
          sizes="(min-width: 0px) and (max-width: 1920px) 100vh"
          objectFit="contain"
          upLgWidth={28}
          downLgWidth={28}
          downMdWidth={28}
          downSmWidth={28}
          downXsWidth={28}
        />
      </m.div>

      <Box
        component={m.div}
        animate={{
          scale: [1.6, 1, 1, 1.6, 1.6],
          rotate: [270, 0, 0, 270, 270],
          opacity: [1, 1, 1, 1, 1],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
        sx={{
          width: 100,
          height: 100,
          position: "absolute",
          border: (theme) =>
            `solid 3px ${alpha(theme.palette.primary.dark, 0.40)}`,
        }}
      />

      <Box
        component={m.div}
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 1, 1, 1, 1],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{
          ease: "linear",
          duration: 3.2,
          repeat: Infinity,
        }}
        sx={{
          width: 120,
          height: 120,
          position: "absolute",
          border: (theme) =>
            `solid 8px ${alpha(theme.palette.primary.dark, 0.45)}`,
        }}
      />
    </StyledRoot>
  );
}
