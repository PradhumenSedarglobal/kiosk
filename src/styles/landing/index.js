import { styled } from "@mui/material/styles";
import { Swiper } from "swiper/react";

export const CustomLandingFullPageScroll = styled(Swiper)(({ theme }) => ({
  "&.swiper": {
    width: "100%",
    height: "100dvh",
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));
