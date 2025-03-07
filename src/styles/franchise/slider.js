import styled from "@emotion/styled";
import Slider from "react-slick";

export const FranchiseCustomSlider = styled(Slider)(({ theme }) => ({
  "& .slick-dots li button::before": {
    color: theme.palette.common.white,
  },
  "& .slick-dots li.slick-active button::before": {
    color: theme.palette.common.white,
  },
}));
